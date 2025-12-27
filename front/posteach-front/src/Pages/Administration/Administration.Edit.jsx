import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import PageTitle from '../../Components/PageTitle/PageTitle';

import userDefaulftImage from '../../Assets/user_default.png';

export default function AdministrationEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const url = `${import.meta.env.VITE_API_URL}/users/${id}`;
    const token = localStorage.getItem('userToken');

    const [initialValues, setInitialValues] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const allowedProfiles = [0, 1, 2];

    const schema = yup.object().shape({
        profile_id: yup.number()
            .typeError('Selecione um perfil válido')
            .required('O ID do perfil é obrigatório')
            .oneOf(allowedProfiles, 'Perfil selecionado é inválido.'),
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        password: yup.string()
            .nullable()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .notRequired(),
        username: yup.string().required('O nome de usuário é obrigatório'),
        userdescription: yup.string(),
        userimage: yup.string(),

    });

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setSubmitError('Token não encontrado, faça login novamente.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Usuário não encontrado: ${response.status} - ${errorBody}`);
                }

                const data = await response.json();

                // Garantir que profile_id seja um número para o formulário
                const profileIdNum = Number(data.profile_id);

                setInitialValues({
                    profile_id: allowedProfiles.includes(profileIdNum) ? profileIdNum : '',
                    email: data.email || '',
                    password: '',
                    username: data.username || '',
                    userdescription: data.userdescription || '',
                    userimage: userDefaulftImage,
                });
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
                setSubmitError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, token, url]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitError('');
        setSubmitSuccess('');

        try {
            // Garante que profile_id é um número
            const updatePayload = {
                username: values.username,
                email: values.email,
                profile_id: Number(values.profile_id),
                ...(values.password && { password: values.password }),
            };

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatePayload),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({ message: 'Resposta inválida do servidor.' }));
                throw new Error(errorBody.message || 'Falha ao atualizar o usuário.');
            }

            setSubmitSuccess('Usuário atualizado com sucesso!');
            setTimeout(() => {
                navigate('/administration');
            }, 1500);

        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Container className="text-center" style={{ paddingTop: '8rem' }}><Spinner animation="border" /></Container>;
    }

    if (!initialValues) {
        return <Container style={{ paddingTop: '6rem' }}><Alert variant="danger">{submitError || 'Não foi possível carregar os dados para edição.'}</Alert></Container>;
    }

    return (
        <Container style={{ paddingTop: '4rem', marginBottom: '5rem' }}>
            <PageTitle title={'Editando Usuário: ' + initialValues.username} />

            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
            >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formProfileId">
                            <Form.Label>Perfil do usuário</Form.Label>
                            <Form.Select
                                name="profile_id"
                                value={values.profile_id.toString()}
                                onChange={handleChange}
                                isInvalid={touched.profile_id && !!errors.profile_id}
                            >
                                <option value="" disabled>Selecione o Perfil</option>
                                <option value="0">0 - Full Admin</option>
                                <option value="1">1 - Professor</option>
                                <option value="2">2 - Aluno</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.profile_id}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Nova Senha (Opcional)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={touched.password && !!errors.password}
                                placeholder="Deixe em branco para manter a senha atual"
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Nome de Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUserDescription">
                            <Form.Label>Descrição do Usuário</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="userdescription"
                                value={values.userdescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUserImage">
                            <Form.Label>Imagem do Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                name="userimage"
                                value={values.userimage}
                                onChange={handleChange}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">{errors.userimage}</Form.Control.Feedback>
                        </Form.Group>

                        {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}
                        {submitError && <Alert variant="danger">{submitError}</Alert>}

                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
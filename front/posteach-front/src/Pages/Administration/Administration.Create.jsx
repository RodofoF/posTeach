import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import PageTitle from '../../Components/PageTitle/PageTitle';
import userDefaulftImage from '../../assets/user_default.png';

export default function AdministrationCreate() {

    const url = `${import.meta.env.VITE_API_URL}/users`;
    const token = localStorage.getItem('userToken');
    
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const allowedProfiles = [0, 1, 2];

    const schema = yup.object().shape({
        profile_id: yup.number()
            .typeError('Selecione um perfil válido')
            .required('O perfil é obrigatório')
            .oneOf(allowedProfiles, 'Perfil selecionado é inválido.'),
        username: yup.string().required('O nome de usuário é obrigatório'),
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        userdescription: yup.string(),
        userimage: yup.string(),
        password: yup.string()
            .required('A senha é obrigatória')
            .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitError('');
        setSubmitSuccess('');
        
        if (!token) {
            setSubmitError('Token de autenticação não encontrado. Faça login novamente.');
            setSubmitting(false);
            return;
        }

        const dataToSend = {
            ...values,
            profile_id: Number(values.profile_id)
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend), 
            });

            if (response.status === 201) {
                setSubmitSuccess('Usuário criado com sucesso!');
                resetForm();
                
                setTimeout(() => {
                    navigate('/administration');
                }, 1500); 

            } else {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { message: `Erro na requisição. Código: ${response.status}` };
                }
                
                const errorMessage = errorData.message || errorData.error || `Erro na requisição: ${response.status}`;
                throw new Error(errorMessage);
            }

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setSubmitError(error.message);
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <Container style={{ paddingTop: '4rem', marginBottom: '5rem'}}>
            <PageTitle title={'Criando Usuário: '} button={true} /> 
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    profile_id: '', 
                    username: '',
                    email: '',
                    userdescription: '',
                    userimage: userDefaulftImage,
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form className='mb-6' noValidate onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3" controlId="formProfileId">
                            <Form.Label>Perfil do Usuário</Form.Label>
                            <Form.Select 
                                name="profile_id" 
                                value={values.profile_id} 
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
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password" 
                                value={values.password} 
                                onChange={handleChange} 
                                isInvalid={touched.password && !!errors.password} 
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
                                isInvalid={touched.userdescription && !!errors.userdescription} 
                            />
                            <Form.Control.Feedback type="invalid">{errors.userdescription}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUserImage">
                            <Form.Label>URL da Imagem do Usuário</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="userimage" 
                                value={values.userimage} 
                                onChange={handleChange} 
                                isInvalid={touched.userimage && !!errors.userimage} 
                                disabled={true}
                            />
                            <Form.Control.Feedback type="invalid">{errors.userimage}</Form.Control.Feedback>
                        </Form.Group>


                        {submitError && <Alert variant="danger">{submitError}</Alert>}
                        {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

                        <Button type="submit" variant="success" disabled={isSubmitting}>
                            {isSubmitting ? 'Criando...' : 'Criar Usuário'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
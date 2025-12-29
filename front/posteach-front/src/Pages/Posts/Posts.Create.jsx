import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import PageTitle from '../../Components/PageTitle/PageTitle';
import userDefaulftImage from '../../Assets/user_default.png';
import { use } from 'react';

export default function PostsCreate() {

    const url = `${import.meta.env.VITE_API_URL}/posts`;
    const token = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const allowedProfiles = [0, 1, 2];

    const schema = yup.object().shape({
        user_id: yup.number(),
        title: yup.string().required('O título é obrigatório'),
        subtitle: yup.string().required('O subtítulo é obrigatório'),
        content: yup.string().required('O conteúdo é obrigatório'),
        postImage: yup.mixed().nullable(),
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
                    navigate(-1);
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
            <PageTitle title={'Criando Post: '} button={true} /> 
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    user_id: userInfo?.id || '',
                    title: '',
                    subtitle: '',
                    content: '',
                    postImage: null,
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form className='mb-6' noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="user_id">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                name="user_id"
                                value={values.user_id + ' - ' + userInfo?.username} 
                                onChange={handleChange}
                                disabled
                                isInvalid={!!errors.user_id && touched.user_id}
                            />
                            <Form.Control.Feedback type="invalid">{errors.user_id}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                isInvalid={!!errors.title && touched.title}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subtitle">
                            <Form.Label>Subtítulo</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="subtitle"
                                value={values.subtitle}
                                rows={3}
                                onChange={handleChange}
                                isInvalid={!!errors.subtitle && touched.subtitle}
                            />
                            <Form.Control.Feedback type="invalid">{errors.subtitle}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Conteúdo</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={values.content}
                                rows={16}
                                onChange={handleChange}
                                isInvalid={!!errors.content && touched.content}
                            />
                            <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postImage">
                            <Form.Label>Imagem do Post</Form.Label>
                            <Form.Control
                                type="file"
                                name="postImage"
                                onChange={handleChange}
                                isInvalid={!!errors.postImage && touched.postImage}
                            />
                            <Form.Control.Feedback type="invalid">{errors.postImage}</Form.Control.Feedback>
                        </Form.Group>
                        {submitError && <Alert variant="danger">{submitError}</Alert>}
                        {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

                        <Button type="submit" variant="success" disabled={isSubmitting}>
                            {isSubmitting ? 'Criando...' : 'Criar Post'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
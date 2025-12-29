import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import PageTitle from '../../Components/PageTitle/PageTitle';


export default function PostsEdit() {
    const { id } = useParams();

    const url = `${import.meta.env.VITE_API_URL}/posts/${id}`;
    const token = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({
        user_id: userInfo?.id || '',
        title: '',
        subtitle: '',
        content: '',
        postImage: null,
    });

    const schema = yup.object().shape({
        user_id: yup.number(),
        title: yup.string().required('O título é obrigatório'),
        subtitle: yup.string().required('O subtítulo é obrigatório'),
        content: yup.string().required('O conteúdo é obrigatório'),
        postImage: yup.mixed().nullable(),
    });

    useEffect(() => {
        const fetchPost = async () => {
            if (!token) {
                setSubmitError('Token não encontrado, faça login novamente.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Post não encontrado: ${response.status} - ${errorBody}`);
                }

                const data = await response.json();
                setInitialValues({
                    user_id: data.user_id,
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    content: data.content || '',
                    postImage: null,
                });
            } catch (error) {
                console.error('Erro ao carregar Post:', error);
                setSubmitError('Erro ao carregar Post: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [token, url]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitError('');
        setSubmitSuccess('');
        
        if (!token) {
            setSubmitError('Token de autenticação não encontrado. Faça login novamente.');
            setSubmitting(false);
            return;
        }

        const dataToSend = {
            ...values
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend), 
            });

            if (response.ok) {
                setSubmitSuccess('Post atualizado com sucesso!');
                
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
            console.error("Erro ao atualizar post:", error);
            setSubmitError(error.message);
        } finally {
            setSubmitting(false); 
        }
    };

    if (loading) {
        return (
            <Container style={{ paddingTop: '4rem', marginBottom: '5rem', textAlign: 'center' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container style={{ paddingTop: '4rem', marginBottom: '5rem'}}>
            <PageTitle title={'Editando Post'} button={true} /> 
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                            {isSubmitting ? 'Atualizando...' : 'Atualizar Post'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
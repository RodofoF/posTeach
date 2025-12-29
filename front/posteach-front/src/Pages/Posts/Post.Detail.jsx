import { Container, Alert, Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function PostDetail() {
    const {id} = useParams();
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const url = `${baseUrl}/posts/${id}`;
    const token = localStorage.getItem('userToken');
    const storagedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    // Full Admin (0) e Professor (1)
    const isAdmin = !!(userInfo && (userInfo.profile_id === 0 || userInfo.profile_id === 1));

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            try {
                if (!token) {
                    setError('Token não encontrado, faça login novamente');
                    setLoading(false);
                    return;
                }
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Erro na requisição: ${response.status} - ${errorBody || response.statusText}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Erro ao carregar Post:', error);
                setError('Erro ao carregar Post: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [token, url]);

    


    return (
        <Container style={{ paddingTop: '6rem' }}>
        <PageTitle title={post?.title || 'Detalhes do Post'} button={true} />
        {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Carregando...</span></Spinner>}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && !post && <Alert variant="info">Post não encontrado.</Alert>}
        {!loading && !error && post && (
            <div >
                <p style={{fontSize: '1rem', color: 'gray', textAlign: 'left', margin: '0', paddingBottom: '1rem'}}>{post.subtitle}</p>
                <p style={{ minHeight: '50vh' }}>{post.content}</p>
                <p style={{fontSize: '0.8rem', color: 'gray', textAlign: 'right', margin: '0'}}>Criado por: {post.user?.username}</p>
                <p style={{fontSize: '0.8rem', color: 'gray', textAlign: 'right', margin: '0'}}>Atualizado em: {new Date(post.updatedAt).toLocaleString('pt-BR')}</p>
            </div>

        )}
            
        </Container>
    )
}
import { Container, Alert, Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';
import { useEffect, useState } from 'react';


export default function Posts() {
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const url = `${baseUrl}/posts`;
    const token = localStorage.getItem('userToken');
    const storagedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    // Full Admin (0) e Professor (1)
    const isAdmin = !!(userInfo && (userInfo.profile_id === 0 || userInfo.profile_id === 1));

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPosts() {
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
                // Suporta resposta como array ou objeto com propriedade 'data'
                setPosts(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
            } catch (error) {
                console.error('Erro ao carregar Posts:', error);
                setError('Erro ao carregar Posts: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [token, url]);

    const filteredPosts = posts.filter(post => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (post.title && post.title.toLowerCase().includes(searchTermLower)) ||
            (post.content && post.content.toLowerCase().includes(searchTermLower))
        );
    });

    if (error) {
        return <Container style={{ paddingTop: '4rem' }}><Alert variant="danger">{error}</Alert></Container>
    }

    if (loading) {
        return <Container className="text-center" style={{ paddingTop: '8rem' }}><Spinner animation="border" /></Container>;
    }

    const hasPosts = posts.length > 0;
    const isSearchEmpty = searchTerm.length > 0 && filteredPosts.length === 0;
    const isListEmpty = !hasPosts && !loading && !error;



    return (
        <Container style={{ paddingTop: '6rem' }}>
            <PageTitle title={`Posts`} button={true} />
            <Row className="mb-4 align-items-center">
                    <Col xs={12} md={9} lg={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Buscar posts por título ou conteúdo..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={3} lg={2} className="text-md-end mt-2 mt-md-0">
                        <p className="mb-0">
                            Total de Posts: 
                            <span className="ms-2 fw-bold">{posts.length}</span>
                        </p>
                    </Col>
                </Row>
                {isSearchEmpty && (
                    <div className="alert alert-info text-center mt-4" role="alert">
                        <h4>Sem resultados para "{searchTerm}"</h4>
                        <p className="mb-0">Tente buscar por outro termo ou verifique a ortografia.</p>
                    </div>
                )}
    
                {isListEmpty && (
                    <div className="alert alert-warning text-center mt-4" role="alert">
                        Nenhuma postagem encontrada.
                    </div>
                )}

            <Row xs={1} md={2} className="g-4" style={{ marginTop: '2rem' }}>
                {filteredPosts.map(post => (
                    <Col key={post.id}>
                        <CardComponent title={post.title} text={post.content} img={null} link={`/posts/detail/${post.id}`} updatedAt={new Date(post.updated_at).toLocaleDateString()} logInfo={true}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
import { useState, useEffect } from "react";
import { Container, Button, Table, Alert, Spinner, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";

export default function MyPosts() {

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
                if (!userInfo?.id) {
                    setError('Informações do usuário não encontradas. Faça login novamente.');
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
                const allPosts = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
                const userId = userInfo?.id;
                const onlyMine = userId ? allPosts.filter(p => p.user_id === userId) : [];
                setPosts(onlyMine);
                console.log('Posts carregados (apenas do usuário logado):', onlyMine);
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
            (post.content && post.content.toLowerCase().includes(searchTermLower)) ||
            (post.user && post.user.username && post.user.username.toLowerCase().includes(searchTermLower))
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

    const handleDelete = async (postId, postTitle) => {
        if (!isAdmin || !window.confirm(`Tem certeza que deseja excluir o post ${postTitle}? Esta ação é irreversível.`)) {
            return;
        }

        try {
            const response = await fetch(`${url}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir o usuário.');
            }

            setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            setError('Erro ao excluir usuário: ' + error.message);
        }
    };


    return (
        <Container className="d-flex flex-column min-vh-100" style={{paddingTop: '4rem'}}>
            <div className="flex-grow-1">
                <PageTitle title={'Meus Posts'} button={true}/>
                
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
                
                <div className="mb-4 d-flex justify-content-center">
                    {isAdmin && (
                        <Button 
                            variant='success' 
                            as={Link} 
                            to={'/posts/create'} 
                        >
                            Criar Novo Post
                        </Button>
                    )}
                </div>
                
                {isSearchEmpty && (
                    <div className="alert alert-info text-center mt-4" role="alert">
                        <h4>Sem resultados para "{searchTerm}"</h4>
                        <p className="mb-0">Tente buscar por outro termo ou verifique a ortografia.</p>
                    </div>
                )}

                {isListEmpty && (
                    <div className="alert alert-warning text-center mt-4" role="alert">
                        Nenhum usuário cadastrado. {isAdmin && 'Clique em "Criar Novo Usuário" para começar.'}
                    </div>
                )}
                
                {filteredPosts.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Subtitulo</th>
                                <th>Atualização</th>
                                {isAdmin && <th className="text-center">Ações</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(posts => (
                                <tr key={posts.id}>
                                    <td>{posts.title}</td>
                                    <td>{posts.subtitle}</td>
                                    <td>{new Date(posts.updatedAt).toLocaleString('pt-BR')}</td>
                                    {isAdmin && (
                                        <td className="text-center">
                                            <Button 
                                                as={Link} 
                                                to={`/posts/edit/${posts.id}`} 
                                                className="me-2" 
                                                variant='info' 
                                                size="sm"
                                            >
                                                Editar
                                            </Button>
                                            <Button 
                                                variant='danger' 
                                                size="sm" 
                                                onClick={() => handleDelete(posts.id, posts.title)}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </Container>
    );
}
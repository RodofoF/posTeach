import { useEffect, useState } from 'react';
import { Container, Alert, Row, Col, Form, Spinner, Pagination } from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx';
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';

// Página simples: busca posts, permite filtrar e mostra 4 cards por página.
export default function Posts() {
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const url = `${baseUrl}/posts`;
    const token = localStorage.getItem('userToken');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);

            if (!token) {
                setError('Token não encontrado. Faça login.');
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
                    const body = await response.text();
                    throw new Error(body || `Erro ${response.status}`);
                }

                const data = await response.json();
                const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
                setPosts(list);
            } catch (err) {
                setError(err.message || 'Erro ao carregar posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [token, url]);

    const filteredPosts = posts.filter((post) => {
        const t = searchTerm.toLowerCase();
        return (
            (post.title && post.title.toLowerCase().includes(t)) ||
            (post.content && post.content.toLowerCase().includes(t)) ||
            (post.user && post.user.username && post.user.username.toLowerCase().includes(t))
        );
    });

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const pageItems = filteredPosts.slice(startIndex, startIndex + pageSize);

    if (loading) {
        return <Container className="text-center" style={{ paddingTop: '8rem' }}><Spinner animation="border" /></Container>;
    }

    if (error) {
        return <Container style={{ paddingTop: '4rem' }}><Alert variant="danger">{error}</Alert></Container>;
    }

    return (
        <Container style={{ paddingTop: '6rem' }}>
            <PageTitle title="Posts" button={true} />

            <Row className="mb-4 align-items-center">
                <Col xs={12} md={9} lg={10}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar posts..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
                <Col xs={12} md={3} lg={2} className="text-md-end mt-2 mt-md-0">
                    <p className="mb-0">Total de Posts: <span className="ms-2 fw-bold">{posts.length}</span></p>
                </Col>
            </Row>

            {filteredPosts.length === 0 && (
                <Alert variant="info">Nenhuma postagem encontrada.</Alert>
            )}

            <Row xs={1} md={2} className="g-4" style={{ marginTop: '2rem', minHeight: '60vh' }}>
                {pageItems.map((post) => (
                    <Col key={post.id}>
                        <CardComponent
                            title={post.title}
                            text={post.subtitle}
                            img={null}
                            link={`/posts/detail/${post.id}`}
                            updatedAt={post.updatedAt}
                            user_id={post.user_id}
                            username={post.user?.username}
                            logInfo={true}
                        />
                    </Col>
                ))}
            </Row>

            {filteredPosts.length > pageSize && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            disabled={safePage === 1}
                            onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                        />
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                                <Pagination.Item
                                    key={page}
                                    active={page === safePage}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            );
                        })}
                        <Pagination.Next
                            disabled={safePage === totalPages}
                            onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                        />
                    </Pagination>
                </div>
            )}
        </Container>
    );
}

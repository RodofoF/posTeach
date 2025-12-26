import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, ListGroup } from "react-bootstrap";
import PageTitle from "../../Components/PageTitle/PageTitle"; 
import userImageDefault from '../../assets/user_default.png'

export default function AdmministrationDetail() {
    const { id } = useParams(); 
    
    const url = `${import.meta.env.VITE_API_URL}/users/${id}`;
    const token = localStorage.getItem('userToken');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getProfileName = (profileId) => {
        switch (profileId) {
            case 0:
                return 'Full Administrador';
            case 1:
                return 'Administrador';
            case 2:
                return 'Aluno';
            default:
                return 'Desconhecido';
        }
    };

    useEffect(() => {
        const fetchUserDetail = async () => {
            if (!token) {
                setError('Token não encontrado, faça login novamente.');
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
                
                setUser(data);
            } catch (err) {
                console.error("Erro ao carregar detalhes do usuário:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [id, token, url]);

    if (loading) {
        return <Container className="text-center" style={{ paddingTop: '8rem' }}><Spinner animation="border" /></Container>;
    }

    if (error) {
        return <Container style={{ paddingTop: '6rem' }}><Alert variant="danger">{error}</Alert></Container>;
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString('pt-BR');
        } catch {
            return dateString;
        }
    }

    const currentUser = user;

    return (
        <Container style={{ paddingTop: '8rem', marginBottom: '5rem', maxWidth: '800px' }}>
            <PageTitle button={true} title={currentUser?.username ? `Detalhes do Usuário: ${currentUser.username}` : 'Detalhes do Usuário'} />
            
            {currentUser && (
                <Row className="justify-content-center">
                    <Col md={8} className="mb-3">
                        <Card className="shadow-sm">
                            <Card.Header as="h5">Informações da Conta</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>ID:</strong> {currentUser.id}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Nome de Usuário:</strong> {currentUser.username}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>E-mail:</strong> {currentUser.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Nível de Acesso:</strong> {getProfileName(currentUser.profile_id)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Descrição:</strong> {currentUser.userdescription}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Card.Text><strong>Criado em:</strong> {formatDateTime(currentUser.createdAt)}</Card.Text>
                                <Card.Text><strong>Última Atualização:</strong> {formatDateTime(currentUser.updatedAt)}</Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="shadow-sm h-100 text-center d-flex align-items-center justify-content-center">
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                <Card.Img 
                                    variant="top" 
                                    src={userImageDefault} //Necessário ajustar imagens
                                    alt="User Profile" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} 
                                />
                                <h6 className="mt-3">{currentUser.username}</h6> 
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
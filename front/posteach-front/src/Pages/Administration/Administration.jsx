import { useState, useEffect } from "react";
import { Container, Button, Table, Alert, Spinner, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";

export default function Administration() {
    const profileMap = {
        0: 'Full Admin',
        1: 'Professor',
        2: 'Aluno',
    };
    const getProfileName = (profileId) => { 
        return profileMap[profileId] || 'Desconhecido';
    };
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const url = `${baseUrl}/users`;
    const token = localStorage.getItem('userToken');
    const storagedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    // Full Admin (0) e Professor (1)
    const isAdmin = !!(userInfo && (userInfo.profile_id === 0 || userInfo.profile_id === 1));

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchUsers() {
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
                setUsers(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
            } catch (error) {
                console.error('Erro ao carregar Usuários:', error);
                setError('Erro ao carregar Usuários: ' + error.message);
            } finally {
                setLoading(false); 
            }
        }
        fetchUsers();
    }, [token, url]); 

    const handleDelete = async (userId, userName) => {
        if (!isAdmin || !window.confirm(`Tem certeza que deseja excluir o usuário ${userName}? Esta ação é irreversível.`)) {
            return;
        }

        try {
            const response = await fetch(`${url}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir o usuário.');
            }

            setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            setError('Erro ao excluir usuário: ' + error.message);
        }
    };

    const filteredUsers = users.filter(user => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (user.username && user.username.toLowerCase().includes(searchTermLower)) || 
            (user.email && user.email.toLowerCase().includes(searchTermLower))
        );
    });

    if (error) {
        return <Container style={{ paddingTop: '4rem' }}><Alert variant="danger">{error}</Alert></Container>
    }
    
    if (loading) {
        return <Container className="text-center" style={{ paddingTop: '8rem' }}><Spinner animation="border" /></Container>;
    }

    const hasUsers = users.length > 0;
    const isSearchEmpty = searchTerm.length > 0 && filteredUsers.length === 0;
    const isListEmpty = !hasUsers && !loading && !error;


    return (
        <Container className="d-flex flex-column min-vh-100" style={{paddingTop: '4rem'}}>
            <div className="flex-grow-1">
                <PageTitle title={'Usuários'}/>
                
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={9} lg={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Buscar usuários por nome de usuário ou e-mail..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={3} lg={2} className="text-md-end mt-2 mt-md-0">
                        <p className="mb-0">
                            Total de Usuários: 
                            <span className="ms-2 fw-bold">{users.length}</span>
                        </p>
                    </Col>
                </Row>
                
                <div className="mb-4 d-flex justify-content-center">
                    {isAdmin && (
                        <Button 
                            variant='success' 
                            as={Link} 
                            to={'/user/create'} 
                        >
                            Criar Novo Usuário
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
                
                {filteredUsers.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>E-mail</th>
                                <th>Perfil</th>
                                {isAdmin && <th className="text-center">Ações</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{getProfileName(user.profile_id)}</td>
                                    {isAdmin && (
                                        <td className="text-center">
                                            <Button 
                                                as={Link} 
                                                to={`/user/edit/${user.id}`} 
                                                className="me-2" 
                                                variant='info' 
                                                size="sm"
                                            >
                                                Editar
                                            </Button>
                                            <Button 
                                                as={Link} 
                                                to={`/user/detail/${user.id}`} 
                                                className="me-2" 
                                                variant='primary' 
                                                size="sm"
                                            >
                                                Detalhes
                                            </Button>
                                            <Button 
                                                variant='danger' 
                                                size="sm" 
                                                onClick={() => handleDelete(user.id, user.username)}
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
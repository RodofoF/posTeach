import { Container } from "react-bootstrap";
import { GetApi } from "../../Hooks/GetApi/GetApi";
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
    const url = import.meta.env.VITE_API_URL + '/users' || 'http://localhost:3000/users';
    const token = localStorage.getItem('userToken');
    const storagedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    const isAdmin = userInfo && userInfo.profile < 2;

    const { data: users, loading, error } = GetApi(url, token);



    return (
        <Container style={{ paddingTop: '5rem' }}>
            <PageTitle title="Administração" button={true} />
            <h2>Administração de Usuários</h2>
            {loading ? (
                <p>Carregando usuários...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <>
                    <p>Total de usuários: {users?.length || 0}</p>
                    {/* Conteúdo adicional de administração pode ser adicionado aqui */}
                </>
            )}
        </Container>
    );
}
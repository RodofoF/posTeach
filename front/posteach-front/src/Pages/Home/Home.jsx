import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx' 

import IconeMulticasts from '../../assets/multicasts_icon.png';
import IconeCheckList from '../../assets/checklist_icon.png';
import IconeAntenas from '../../assets/antenas_icon.png';
import IconeAntenasDetails from '../../assets/antenas_detail_demo.jpg';
import IconeBackup from '../../assets/backup_demo.png';
import IconeFFMPEG from '../../assets/ffmpeg_icon.png';
import IconeRelatorios from '../../assets/relatorios_icon.png';


export default function Home() {
    return (<Container style={{ paddingTop: '6rem' }}>
        <PageTitle title="Página Inicial" />
        <Alert variant="info">
            <h4>Bem-vindo à página inicial do PostEach!</h4>
            <p>Explore os módulos disponíveis através do menu de navegação.</p>
        </Alert>
    </Container>
    );
}

    

    // const storedUserInfo = localStorage.getItem('userInfo');
    // const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    // const token = localStorage.getItem('userToken');

    // const navigate = useNavigate();

    // const [searchTerm, setSearchTerm] = useState('');

    // const cardBodyStyle = {
    //     minHeight: '150px',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    //     flexGrow: 1, 
    // };
    
    // const clickableCardStyle = {
    //     cursor: 'pointer',
    //     transition: 'transform 0.2s, box-shadow 0.2s',
    //     height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    // };
    
    // const handleMouseOver = (e) => {
    //     e.currentTarget.style.transform = 'translateY(-5px)';
    //     e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    // };

    // const handleMouseOut = (e) => {
    //     e.currentTarget.style.transform = 'translateY(0)';
    //     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    // };


    // const initialCards = [
    //     {
    //         id: 1,
    //         title: 'Multicasts',
    //         text: 'Acessar Multicasts',
    //         image: IconeMulticasts,
    //         link: '/multicast',
    //         buttonText: 'Acessar!',
    //         disabled: false,
    //     },
    //     {
    //         id: 2,
    //         title: 'Check List',
    //         text: 'Acesse abaixo e faça o check list diário!',
    //         image: IconeCheckList,
    //         link: '/check',
    //         buttonText: 'Acessar!',
    //         disabled: false, 
    //     },
    //     {
    //         id: 3,
    //         title: 'Mapa das Antenas',
    //         text: 'Tenha uma visão superior do pátio de antenas da Speedcast.',
    //         image: IconeAntenas,
    //         link: '/antenas/maps',
    //         buttonText: 'Acessar!',
    //         disabled: false,
    //     },
    //     {
    //         id: 4,
    //         title: 'Detalhe das Antenas',
    //         text: 'Verifique os detalhes de cada antena',
    //         image: IconeAntenasDetails,
    //         link: '/antenas',
    //         buttonText: 'Acessar!',
    //         disabled: false,
    //     },
    //     {
    //         id: 5,
    //         title: 'Backups',
    //         text: 'Realize backups de informaçõs do sistema',
    //         image: IconeBackup,
    //         link: '/backups',
    //         buttonText: 'Acessar!',
    //         disabled: false,
    //     },
    //     {
    //         id: 6,
    //         title: 'FFMPEG',
    //         text: 'Nosso servidor de Radios',
    //         image: IconeFFMPEG, 
    //         link: '/ffmpeg',
    //         buttonText: 'Acessar!',
    //         disabled: true,
    //     },
    //     {
    //         id: 7,
    //         title: 'Relatorios TVRO',
    //         text: 'Relatorios Mensal TVRO',
    //         image: IconeRelatorios, 
    //         link: '/relatorios',
    //         buttonText: 'Acessar!',
    //         disabled: true,      
    //     }
    // ];

    // const filteredCards = initialCards.filter((card) => {
    //     const searchTermLower = searchTerm.toLowerCase();
    //     return (
    //         card.title.toLowerCase().includes(searchTermLower) ||
    //         card.text.toLowerCase().includes(searchTermLower)
    //     );
    // });

    // if (!token || !userInfo) {
    //     return (
    //         <Container style={{ paddingTop: '6rem' }}>
    //             <Alert variant="danger">Sessão não encontrada. Redirecionando...</Alert>
    //             {setTimeout(() => { if(navigate) navigate('/login'); }, 1500)}
    //         </Container>
    //     );
    // }

    // return (
    //     <Container style={{ paddingTop: '6rem' }}>

    //         <div className="d-flex justify-content-center mb-5">
    //             <h1>Bem-vindo, {userInfo.username}!</h1>
    //         </div>

    //         <Form.Group className="mb-4">
    //             <Form.Control
    //                 type="text"
    //                 placeholder="Filtrar por nome do módulo..."
    //                 value={searchTerm}
    //                 onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //         </Form.Group>

    //         <Row className="justify-content-center">

    //             {filteredCards.length === 0 && searchTerm !== '' ? (
    //                 <Col xs={12} className="text-center mt-5">
    //                     <Alert variant="info">
    //                         <h4>Sem resultados para "{searchTerm}"</h4>
    //                         <p className="mb-0">Tente buscar por outro termo.</p>
    //                     </Alert>
    //                 </Col>
    //             ) : (
    //                 filteredCards.map((card) => (
    //                     <Col key={card.id} md={4} className="mb-4 d-flex">
                            
    //                         {card.disabled ? (
    //                             <Card 
    //                                 className="shadow-sm flex-fill" 
    //                                 style={{...clickableCardStyle, opacity: 0.6, pointerEvents: 'none', cursor: 'default'}}
    //                             >
    //                                 <Card.Img
    //                                     variant="top"
    //                                     src={card.image}
    //                                     alt={`Ícone de ${card.title}`}
    //                                     style={{ height: '150px', objectFit: 'cover' }}
    //                                 />
    //                                 <Card.Body className="text-center" style={cardBodyStyle}>
    //                                     <div>
    //                                         <Card.Title>{card.title}</Card.Title>
    //                                         <Card.Text>
    //                                             {card.text}
    //                                         </Card.Text>
    //                                     </div>
    //                                     <div className="d-grid gap-2 mt-3">
    //                                         <Button variant="outline-secondary" disabled={true}>
    //                                             {card.buttonText}
    //                                         </Button>
    //                                     </div>
    //                                 </Card.Body>
    //                             </Card>
    //                         ) : (
    //                             <Link 
    //                                 to={card.link} 
    //                                 className="text-decoration-none d-flex flex-fill" 
    //                             >
    //                                 <Card 
    //                                     className="shadow-sm flex-fill"
    //                                     style={clickableCardStyle}
    //                                     onMouseOver={handleMouseOver}
    //                                     onMouseOut={handleMouseOut}
    //                                 >
    //                                     <Card.Img
    //                                         variant="top"
    //                                         src={card.image}
    //                                         alt={`Ícone de ${card.title}`}
    //                                         style={{ height: '150px', objectFit: 'cover' }}
    //                                     />
    //                                     <Card.Body className="text-center" style={cardBodyStyle}>
    //                                         <div>
    //                                             <Card.Title>{card.title}</Card.Title>
    //                                             <Card.Text>
    //                                                 {card.text}
    //                                             </Card.Text>
    //                                         </div>
    //                                         <div className="d-grid gap-2 mt-3">
    //                                             <Button
    //                                                 variant="outline-secondary"
    //                                                 as={Link} 
    //                                                 to={card.link} 
    //                                                 disabled={card.disabled}
    //                                             >
    //                                                 {card.buttonText}
    //                                             </Button>
    //                                         </div>
    //                                     </Card.Body>
    //                                 </Card>
    //                             </Link>
    //                         )}
    //                     </Col>
    //                 ))
    //             )}
    //         </Row>

    //     </Container>
    // );
// }
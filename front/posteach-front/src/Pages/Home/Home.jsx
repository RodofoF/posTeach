import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'

import info_read_post from '../../assets/info_read_post.png';


export default function Home() {
    const storagedUserInfo = localStorage.getItem('userInfo');
    const username = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    const token = localStorage.getItem('userToken');

    return (<Container style={{ paddingTop: '6rem' }}>
        <PageTitle title={`Bem vindo, ${username.username}!`} />

        <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card>
                        <Card.Img 
                            variant="top" 
                            src={info_read_post} 
                            style={{ 
                                maxWidth: '380px', 
                                maxHeight: '160px',
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain'
                            }} 
                        />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
        </Row>
    </Container>
    );
}

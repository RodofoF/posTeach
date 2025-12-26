import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'

import info_read_post from '../../assets/info_read_post.png';
import old_man_worried from '../../assets/old_man_worried.png';
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';


export default function Home() {
    const storagedUserInfo = localStorage.getItem('userInfo');
    const username = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    const token = localStorage.getItem('userToken');

    const initialCards = [
        {
            id: 1,
            title: 'Card 1',
            text: 'Este é o texto do Card 1.',
            img: info_read_post,
            link: '/posts/'
        },
        {
            id: 2,
            title: 'Card 2',
            text: 'Este é o texto do Card 2.',
            img: old_man_worried,
            link: '#'
        }
    ]

    return (
        <Container style={{ paddingTop: '6rem' }}>
            <PageTitle title={`Bem vindo, ${username.username}!`} />
            <Row xs={1} md={2} className="g-4" style={{ marginTop: '2rem' }}>
                {initialCards.map(card => (
                    <Col key={card.id}>
                        <CardComponent title={card.title} text={card.text} img={card.img} link={card.link} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

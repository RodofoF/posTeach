import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'

import info_read_post from '../../assets/info_read_post.png';
import config_img from '../../assets/config.png';
import teachers from '../../assets/teachers.png';
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';


export default function Home() {
    const storagedUserInfo = localStorage.getItem('userInfo');
    const username = storagedUserInfo ? JSON.parse(storagedUserInfo) : null;

    const token = localStorage.getItem('userToken');

    const initialCards = [
        {
            id: 1,
            title: 'Ler Posts',
            text: 'Encontre postagens de temas diversos criadas pelos professores na plataforma.',
            img: info_read_post,
            link: '/posts/'
        },
        {
            id: 2,
            title: 'Meus Posts',
            text: 'Crie seus próprios posts ou edite suas postagens existentes na plataforma de forma fácil e rápida. Essa área é exclusiva para professores. No futuro teremos teremos uma área dedicada para postagem de alunos.',
            img: teachers,
            link: '#'
        },
        {
            id: 3,
            title: 'Configurações de Administração',
            text: 'Gerencie usuários e premições na plataforma.',
            img: config_img,
            link: '/administration'
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

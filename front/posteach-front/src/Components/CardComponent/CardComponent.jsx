import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


export default function CardComponent({ title, text, img, link }) {

    const cardBodyStyle = {
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1, 
    };
    
    const clickableCardStyle = {
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };
    
    const handleMouseOver = (e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    };


    return (
        <div>
            <Link to={link}>
                <Row xs={1} md={2} className="g-4">
                    <Col>
                        <Card
                            style={clickableCardStyle}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            <Card.Img
                                variant="top"
                                src={img}
                            />
                            <Card.Body
                                style={cardBodyStyle}>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>
                                    {text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Link>
        </div>
    );
}


import { useState } from 'react';
import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


export default function CardComponent({ title, text, img, link }) {
    return (
        <div>
            <Link to={link}>
                <Row xs={1} md={2} className="g-4">
                    <Col>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={img}
                                style={{
                                    maxWidth: '380px',
                                    maxHeight: '160px',
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                            <Card.Body>
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


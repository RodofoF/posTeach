import { Container, Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import PageTitle from '../../Components/PageTitle/PageTitle.jsx'
import CardComponent from '../../Components/CardComponent/CardComponent.jsx';

export default function Posts() {
    return (
        <Container style={{ paddingTop: '6rem' }}>
            <PageTitle title={`Posts`} button={true}/>
            <Row xs={1} md={2} className="g-4" style={{ marginTop: '2rem' }}>
                    <Col>
                        <CardComponent />
                    </Col>
            </Row>
        </Container>
    )
}
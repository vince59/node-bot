import React from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import Logger from './components/Logger';
import Simulator from './components/Simulator';

function App() {
  return (
    <div>
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Show logs
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container>
              <Row>
                <Col><Logger topic="log" from="testLog2" max="5" /></Col>
                <Col><Logger topic="log" from="testLog" max="4" /></Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Simulator
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <Simulator/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    </div>
  );
}

export default App;

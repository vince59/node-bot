import React, { Component } from 'react';
import { Table, Button, Row,Container } from 'react-bootstrap';

const engine = "ws://localhost:8080";

class Logger extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.addMessage = this.addMessage.bind(this);
    }

    ws = new WebSocket(engine);

    addMessage(message) {
        const data = JSON.parse(message.data);
        if (data.message.from === this.props.from || this.props.from === "*") {
            const msg = this.state.messages;
            if (msg.length + 1 > this.props.max)
                msg.pop();
            this.setState(state => ({ messages: [data, ...msg] }))
        }
    }

    componentDidMount() {

        this.ws.onopen = () => {
            const msg = { action: 'subscribe', topic: 'log' };
            this.ws.send(JSON.stringify(msg));
        };

        this.ws.onmessage = this.addMessage;
    }

    render() {
        return (
            <Container>
                <Row style={{justifyContent: "center", padding : "2px"}}>
            <Button variant="secondary">{`Logs from ${this.props.from} on topic ${this.props.topic}`}</Button>
            </Row>
            <Row>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.messages.map(m => {
                        return (
                            <tr>
                                <td>{m.message.from}</td>
                                <td>{m.message.msg}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </Row>
            </Container>
        );
    }
}

export default Logger;
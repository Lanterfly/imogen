'use client'

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";

export default function Hero() {
    return (
        <Container>
            <div style={{padding: '8em'}}>
                <div style={{fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5em' }}>
                    Job scheduling done right.
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <ButtonToolbar>
                            <ButtonGroup className="me-2">
                                <Button>Get Started</Button>
                            </ButtonGroup>
                            <ButtonGroup aria-label="Third group">
                                <Button variant="light">Documentation</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </Container>
    );
}

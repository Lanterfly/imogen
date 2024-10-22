import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Container from "react-bootstrap/Container";
import React from "react";

function renderCodeSample(json) {
    return (
        <SyntaxHighlighter
            language="JavaScript"
            style={a11yLight}
            customStyle={{
                backgroundColor: '#eee',
            }}
        >
            {
                JSON.stringify(
                    json,
                    null,
                    4
                )
            }
        </SyntaxHighlighter>
    );
}

export default function Introduction () {
    return (
        <Container style={{ paddingTop: '1em' }}>
            <h1>Getting Started</h1>

            <h2>Install</h2>
            <p>To install imogen run the following:</p>
            <SyntaxHighlighter
                style={a11yLight}
                customStyle={{
                    backgroundColor: '#eee',
                }}
            >
                npm install imogen@latest
            </SyntaxHighlighter>

            <h2>Configure</h2>
            <p>Imogen uses a JSON based configuration file like the following:</p>
            {
                renderCodeSample({
                    database: {
                        path: 'path/to/sqlite/file',
                    },
                    jobs: [
                        {
                            'name': 'job-name',
                            'time': '* * * * * *',
                            'command': 'timeout 5s',
                        }
                    ],
                    server: {
                        enabled: true,
                        bindHostname: 'localhost',
                        bindPort: 16061,
                    }
                })
            }
            <p>See <a href="documentation">documentation</a> for details on each of the configuration options.</p>

            <h2>Run</h2>
            <p>To run imogen run the following command</p>
            <SyntaxHighlighter
                style={a11yLight}
                customStyle={{
                    backgroundColor: '#eee',
                }}
            >
                imogen --config=path/to/config/file
            </SyntaxHighlighter>
        </Container>
    );
}

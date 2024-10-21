import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import React from "react";
import {Table} from "react-bootstrap";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"

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

export default function () {
    return (
        <Container style={{paddingTop: '1em'}}>
            <h1>Documentation</h1>

            <h2>Configuration File</h2>
            <p>A configuration file is loaded on startup and allows users to customize the jobs that are run, if/how the
                server is run, and where the job database is stored. The configuration file is a JSON file formatted
                like the following:</p>
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

            <h3>Configuration Parameters</h3>

            <Table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Required?</th>
                        <th>Data Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td><code>database.path</code></td>
                    <td>No</td>
                    <td>String</td>
                    <td>This is the path to the SQLite database file. If no path is provided a file
                        titled <code>imogen.db</code> will be created in the working directory.
                    </td>
                </tr>
                <tr>
                    <td><code>jobs[#].name</code></td>
                    <td>Yes</td>
                    <td>String</td>
                    <td>The name of the job. Only letters, numbers, dashes, and underscores are allowed.</td>
                </tr>
                <tr>
                    <td><code>jobs[#].time</code></td>
                    <td>Yes</td>
                    <td>String</td>
                    <td>This is a cron style string specifying when the job will run. See <a
                        href="https://www.npmjs.com/package/node-schedule#cron-style-scheduling">this</a> for more
                        details.
                    </td>
                </tr>
                <tr>
                    <td><code>jobs[#].command</code></td>
                    <td>Yes</td>
                    <td>String</td>
                    <td>The system command which should be run on each job execution.</td>
                </tr>
                <tr>
                    <td><code>server.enabled</code></td>
                    <td>No</td>
                    <td>Boolean</td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>server.bindHostname</code></td>
                    <td>No</td>
                    <td>String</td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>server.bindPort</code></td>
                    <td>No</td>
                    <td>Integer</td>
                    <td></td>
                </tr>
                </tbody>
            </Table>

            <h2>Server API</h2>
            <Card body>
                <SwaggerUI
                    spec={{
                        swagger: "2.0",
                        info: {
                            description: "This is the API used to talk to an Imogen server instance.",
                            version: "0.1.0",
                            title: "Imogen Server API",
                        },
                        schemes: [
                            "http"
                        ],
                        paths: {
                            'isEnabled': {
                                'get': {
                                    "produces": [
                                        "application/json"
                                    ],
                                    "parameters": [
                                        {
                                            "name": "name",
                                            "description": "The name of the job.",
                                            "required": true,
                                            "type": "string",
                                        },
                                    ],
                                    "responses": {
                                        "200": {
                                            "description": "successful operation",
                                        },
                                        "500": {
                                            "description": "unsuccessful operation",
                                        }
                                    },
                                },
                            },
                            'isRunning': {
                                'get': {
                                    "produces": [
                                        "application/json"
                                    ],
                                    "parameters": [
                                        {
                                            "name": "name",
                                            "description": "The name of the job.",
                                            "required": true,
                                            "type": "string",
                                        },
                                    ],
                                    "responses": {
                                        "200": {
                                            "description": "successful operation",
                                        },
                                        "500": {
                                            "description": "unsuccessful operation",
                                        }
                                    },
                                },
                            },
                        },
                    }}
                />
            </Card>
        </Container>
    );
}

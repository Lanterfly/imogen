import React from 'react';
import PropTypes from "prop-types";
import {a11yLight} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import axios from "axios";

export default class CodeSample extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: 'Loading sample...',
        };

        axios.get(props.path).then(
            (response) => this.setState({ code: response.data }),
        ).catch(
            () => this.setState({ code: 'Unable to load sample...' }),
        )
    }

    render() {
        return (
            <SyntaxHighlighter
                language={this.props.language}
                style={a11yLight}
                customStyle={{
                    backgroundColor: '#eee',
                }}
            >
                {this.state.code}
            </SyntaxHighlighter>
        );
    }

}

CodeSample.propTypes = {
    language: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}
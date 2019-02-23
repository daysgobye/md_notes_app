import React, { Component } from 'react';
import purp from "../../images/p-b-link-long.svg"
class BuiltBy extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <p style={{ display: "flex", alignItems: "center" }}>
                © {new Date().getFullYear()}
                <a href="https://www.purpleandbold" aria-label="link to Purple and bolds web site">
                    <img style={{ padding: "10px" }} src={purp} width="100" height="75" alt="purple and bold logo" />
                </a>
            </p>
        );
    }
}

export default BuiltBy;
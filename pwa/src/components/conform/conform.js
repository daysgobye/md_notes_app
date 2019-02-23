// props
// email
import React, { Component } from 'react';
class Conform extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <form style={{ display: "flex", flexDirection: "column", width: "100%", }} action={`https://formspree.io/${this.props.email}`} method="POST">
                <input type="text" name="foo" style={{ display: "none" }} />
                {this.props.children}
            </form>
        );
    }
}

export default Conform;
// props
// all strings
// ---------
// title
// message
// icon
import React, { Component } from 'react';
class ShareReddit extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    removeSpaces(str) {
        return str.split(" ").join("%20")
    }
    render() {
        return (
            <a href={`http://reddit.com/submit?url=${this.removeSpaces(this.props.message)}&title=${this.removeSpaces(this.props.title)}`} target="_blanck" aria-label="share this blog post on Reddit">
                <img src={this.props.icon} alt="Reddit Logo" />
            </a>
        );
    }
}

export default ShareReddit;
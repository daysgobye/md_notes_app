// props
// ---------
// message
// icon
import React, { Component } from 'react';
class ShareFacebook extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    removeSpaces(str) {
        return str.split(" ").join("%20")
    }
    render() {
        return (
            <a href={`https://www.facebook.com/sharer.php?s=100&p[url]=${this.props.message}`} target="_blanck" aria-label="share this blog post on facebook">
                <img src={this.props.icon} alt="FaceBook Logo" />
            </a>
        );
    }
}

export default ShareFacebook;
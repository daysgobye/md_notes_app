// props
// ----------
// title
// message
// link
// website
// icon


import React, { Component } from 'react';
class ShareLinked extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    removeSpaces(str) {
        return str.split(" ").join("%20")
    }
    render() {
        return (
            <a href={`
            https://www.linkedin.com/shareArticle?mini=true&url=${this.props.link}&title=${this.removeSpaces(this.props.title)}&source=${this.props.website}&summary=${this.removeSpaces(this.props.message)}
            `} target="_blanck" aria-label="share this blog post on Linked in">
                <img src={this.props.icon} alt="Linked in Logo" />
            </a>
        );
    }
}

export default ShareLinked;
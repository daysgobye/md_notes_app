// props
// all strings
//--------------
// message 
// title
// link
// hashtag
// icon

import React, { Component } from 'react';
class shareTwitter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    removeSpaces(str) {
        return str.split(" ").join("%20")
    }
    hashtag(str) {
        return str.replace("#", "%23")
    }
    render() {
        const pb = this.props
        return (
            <a href={`https://twitter.com/share?url=
            ${this.removeSpaces(pb.message)}
            &text=${this.removeSpaces(pb.title)}
            &via=${pb.link}
            &hashtags=${this.hashtag(pb.hastag)}`} target="_blanck" aria-label="share this on twitter" >
                <img src={this.props.icon} alt="twitter Logo" />
            </a>
        );
    }
}

export default shareTwitter;
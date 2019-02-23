import React, { Component } from 'react';
import Content from "../utility/Content/Content"
import { Parallax, Background } from 'react-parallax';
class LaxHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="hero">
                <Parallax
                    blur={0}
                    bgImage={this.props.bgimg}
                    bgImageAlt="the cat"
                    strength={300}
                >

                    <Content>
                        {this.props.children}
                    </Content>
                </Parallax>


            </div >

        );
    }
}

export default LaxHeader;
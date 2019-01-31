import React, { Component } from 'react';
import Note from "../note/note"
import Mdviewer from "../mdviewer/mdviewer"
import style from "./body.sass"
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodystyles: {
                background: "black",
                color: "rgb(0, 255, 93)"
            }
        }
    }
    componentDidMount() {
        console.log(this.state.bodystyles);

    }

    render() {
        return (
            <div className={style.body} style={this.state.bodystyles}>

                {this.props.editing ? (<Note md={this.props.inUse} swap={this.props.viewNote} delete={this.props.deleteNote} index={this.props.inUseIndex} update={this.props.noteUpdate} />) : (<Mdviewer md={this.props.inUse} />)}
            </div>
        );
    }
}

export default Body;
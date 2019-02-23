import React, { Component } from 'react';
import Note from "../note/note"
import Mdviewer from "../mdviewer/mdviewer"
import styles from "./body.module.sass"

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={styles.body}>
                {this.props.editing ? (<Note md={this.props.inUse} swap={this.props.viewNote} delete={this.props.deleteNote} index={this.props.inUseIndex} update={this.props.noteUpdate} />) : (<Mdviewer md={this.props.inUse} swap={this.props.edit} />)}
            </div>
        );
    }
}

export default Body;
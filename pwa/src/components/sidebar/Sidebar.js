import React, { Component } from 'react';
import styles from "./sidebar.module.sass"

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar__notes}>
                    {this.props.notes.map((note, index) => (

                        <div key={index} className={"stuff"}>
                            <div className=" note" onClick={() => this.props.chose(index, this.props.notes)}>
                                {note.substring(0, 50)}
                            </div>

                            <button onClick={() => this.props.edit(index, this.props.notes)}>Edit this one</button>
                            <button onClick={() => this.props.delNote(index)}> delete note</button>
                        </div>
                    ))}
                </div>
                <div className={styles.sidebar__misc}>
                    <button onClick={this.props.openSettings}>settings</button>
                    <button onClick={this.props.newNote}>New note</button>
                </div>
            </div>


        );
    }
}

export default SideBar;
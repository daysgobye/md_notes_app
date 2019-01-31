import React, { Component } from 'react';
import style from "./sidebar.sass"
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className={` ${this.props.theme === "term" ? style.term : style.default}`}>
                {this.props.notes.map((note, index) => (

                    <div key={index} className={"stuff"}>
                        <div className=" note" onClick={() => this.props.chose(index, this.props.notes)}>
                            {note.substring(0, 50)}
                        </div>

                        <button onClick={() => this.props.edit(index, this.props.notes)}>Edit this one</button>
                        <button onClick={() => this.props.delNote(index)}> delete note</button>
                    </div>
                ))}

                <button onClick={this.props.openSettings}>settings</button>
                <button onClick={this.props.newNote}>New note</button>
            </div>


        );
    }
}

export default SideBar;
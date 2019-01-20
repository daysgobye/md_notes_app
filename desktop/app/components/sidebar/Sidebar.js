import React, { Component } from 'react';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            {
                this.state.notes.map((note, index) => (

                    <div key={index} className={style.sidebar__note}>
                        <div style={{ background: "red" }} onClick={() => this.chose(index, this.state.notes)}>
                            {note.substring(0, 50)}
                        </div>

                        <button onClick={() => this.edit(index, this.state.notes)}>Edit this one</button>
                        <button onClick={() => this.deleteNote(index)}> delete note</button>
                    </div>
                ))
            }
        );
    }
}

export default SideBar;
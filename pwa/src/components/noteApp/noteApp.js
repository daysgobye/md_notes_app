// import Note from "./note/note"
// import Mdviewer from "./mdviewer/mdviewer"
// import style from "../counter.sass"
// import React, { Component } from 'react';
// class NotApp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         <div className={style.wraper}>
//             <div className={style.sidebar}>
//                 {this.state.notes.map((note, index) => (

//                     <div key={index} className={style.sidebar__note}>
//                         <div style={{ background: "red" }} onClick={() => this.chose(index, this.state.notes)}>
//                             {note.substring(0, 50)}
//                         </div>

//                         <button onClick={() => this.edit(index, this.state.notes)}>Edit this one</button>
//                     </div>
//                 ))}
//                 <button onClick={this.openSettings}>settings</button>
//                 <button onClick={this.newNote}>New note</button>
//             </div>
//             <div className={style.body}>
//                 {this.state.editing ? (<Note md={this.state.inUse} swap={this.viewNote} delete={this.deleteNote} index={this.state.inUseIndex} update={this.noteUpdate} />) : (<Mdviewer md={this.state.inUse} />)}
//             </div>

//         </div>
//          );
//     }
// }

// export default NotApp;
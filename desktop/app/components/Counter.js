// // @flow
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Counter.css';
// import style from "./counter.sass"
// import routes from '../constants/routes';
// import Note from "../components/note/note"
// import Mdviewer from "../components/mdviewer/mdviewer"
// import base from "../base"
// import firebase from 'firebase'

// console.log("firebase", firebase)

// console.log(base);

// // type Props = {
// //   // increment: () => void,
// //   // incrementIfOdd: () => void,
// //   // incrementAsync: () => void,
// //   // decrement: () => void,
// //   // counter: number
// // };

// export default class Counter extends Component<Props> {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: [],
//       inUse: "",
//       inUseIndex: null,
//       editing: null,
//       uid: null
//     }
//     this.password = React.createRef()
//     this.email = React.createRef()
//     this.chose = this.chose.bind(this)
//     this.edit = this.edit.bind(this)
//     this.noteUpdate = this.noteUpdate.bind(this)
//     this.viewNote = this.viewNote.bind(this)
//     this.newNote = this.newNote.bind(this)
//     this.renderLogin = this.renderLogin.bind(this)
//     this.auth = this.auth.bind(this)
//     this.authHandler = this.authHandler.bind(this)
//     this.getNotes = this.getNotes.bind(this)
//     this.staySignedIn = this.staySignedIn.bind(this)
//     this.logout = this.logout.bind(this)

//   }


//   // UNSAFE_componentWillMount() {
//   //   this.notesRef = base.syncState(`${this.state.uid}/notes`, {
//   //     context: this,
//   //     state: "notes"
//   //   })
//   // } 
//   componentDidMount() {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ uid: user.uid });
//         this.getNotes()
//       }
//     });

//   }

//   componentWillUnmount() {
//     base.removeBinding(this.notesRef)
//   }

//   chose(i, arr) {
//     // console.log(i, arr);
//     this.setState({ editing: false })
//     this.setState({ inUse: arr[i] })
//     this.setState({ inUseIndex: i })

//   }

//   edit(i, arr) {

//     this.setState({ editing: true })
//     this.setState({ inUse: arr[i] })
//     this.setState({ inUseIndex: i })
//   }

//   noteUpdate(data) {
//     // console.log("somthin", data);

//     this.setState({ inUse: data })
//     let tempArr = this.state.notes
//     tempArr[this.state.inUseIndex] = data
//     this.setState({ notes: tempArr })
//     // console.log(this.state.inUse);

//   }

//   viewNote() {
//     this.setState({ editing: false })
//   }

//   newNote() {
//     const oldNotes = this.state.notes
//     oldNotes.push("")
//     this.setState({ notes: oldNotes })
//   }

//   auth(logIn) {
//     const pass = this.password.current.value
//     const email = this.email.current.value
//     console.log(email, pass);

//     console.log(logIn);
//     if (logIn) {
//       firebase.auth().signInWithEmailAndPassword(email, pass).then((result) => {

//         this.authHandler(result)
//         this.staySignedIn(email, pass)
//         return
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//     } else {
//       firebase.auth().createUserWithEmailAndPassword(email, pass).then((result) => {
//         this.newUser(result)
//         this.authHandler(result)
//         this.staySignedIn(email, pass)
//         return
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//     }
//   }

//   staySignedIn() {
//     firebase.auth().setPersistence("local")
//   }

//   newUser(data) {
//     base.post(`users/${data.user.uid}/notes`, {
//       data: ["# your first note"]
//     })
//   }

//   authHandler(authData) {
//     this.setState({ uid: authData.user.uid })
//     this.getNotes()
//   }

//   getNotes() {

//     this.notesRef = base.syncState(`users/${this.state.uid}/notes`, {
//       context: this,
//       state: "notes"
//     })
//   }

//   logout() {
//     console.log("signing off");

//     firebase.auth().signOut()
//       .then(() => {
//         this.setState({
//           uid: null
//         });
//         return
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//   }

//   renderLogin() {
//     return (
//       <div>
//         <p>pass</p>
//         <input ref={this.password} type="text" />
//         <p>email</p>
//         <input ref={this.email} type="text" />
//         <button onClick={() => this.auth(true)}>login with git hub</button>
//         <button onClick={() => this.auth(false)}>sign up</button>
//       </div>

//     )
//   }

//   render() {
//     if (!this.state.uid) {
//       return <div>{this.renderLogin()}</div>
//     }

//     return (
//       <div>
//         <div className={styles.backButton} data-tid="backButton">
//           <Link to={routes.HOME}>
//             <i className="fa fa-arrow-left fa-3x" />
//           </Link>
//           <button onClick={() => this.logout()}>sign out</button>
//         </div>
//         <div className={style.wraper}>
//           <div className={style.sidebar}>
//             {this.state.notes.map((note, index) => (

//               <div key={index} className={style.sidebar__note}>
//                 <div style={{ background: "red" }} onClick={() => this.chose(index, this.state.notes)}>
//                   {note.substring(0, 50)}
//                 </div>

//                 <button onClick={() => this.edit(index, this.state.notes)}>Edit this one</button>
//               </div>
//             ))}
//             <button onClick={this.newNote}>New note</button>
//           </div>
//           <div className={style.body}>
//             {this.state.editing ? (<Note md={this.state.inUse} swap={this.viewNote} update={this.noteUpdate} />) : (<Mdviewer md={this.state.inUse} />)}
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Counter.css';
import style from "./counter.sass"
import routes from '../constants/routes';
import Body from "../components/body/Body"
import Sidebar from "../components/sidebar/Sidebar"
import base from "../base"
import firebase from 'firebase'
import Settings from './Settings/Settings'

console.log("firebase", firebase)

console.log(base);

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      theme: "term",
      inUse: "",
      inUseIndex: null,
      editing: null,
      uid: null,
      inSetting: null,
      themes: [
        "term",
        "anime"
      ]
    }
    this.themepick = this.themepick.bind(this)
    this.password = React.createRef()
    this.email = React.createRef()
    this.delNote = this.delNote.bind(this)
    this.chose = this.chose.bind(this)
    this.edit = this.edit.bind(this)
    this.noteUpdate = this.noteUpdate.bind(this)
    this.viewNote = this.viewNote.bind(this)
    this.newNote = this.newNote.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.auth = this.auth.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.getNotes = this.getNotes.bind(this)
    this.staySignedIn = this.staySignedIn.bind(this)
    this.logout = this.logout.bind(this)
    this.deleteNote = this.deleteNote.bind(this)

    this.openSettings = this.openSettings.bind(this)

    this.closeSettings = this.closeSettings.bind(this)

  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.getNotes()
      }
    });

  }

  componentWillUnmount() {
    base.removeBinding(this.notesRef)
  }

  deleteNote(i) {


    let newInUseIndex
    if (!i == 0) {
      newInUseIndex = i - 1
    } else {
      return
    }


    const tempArr = this.state.notes


    tempArr.splice(i, 1)
    this.setState({
      notes: tempArr,
      inUseIndex: newInUseIndex,
      inUse: tempArr[newInUseIndex]
    })
  }

  chose(i, arr) {
    // console.log(i, arr);
    this.setState({ editing: false })
    this.setState({ inUse: arr[i] })
    this.setState({ inUseIndex: i })

  }

  edit(i, arr) {

    this.setState({ editing: true })
    this.setState({ inUse: arr[i] })
    this.setState({ inUseIndex: i })
  }

  noteUpdate(data) {
    // console.log("somthin", data);

    this.setState({ inUse: data })
    let tempArr = this.state.notes
    tempArr[this.state.inUseIndex] = data
    this.setState({ notes: tempArr })
    // console.log(this.state.inUse);

  }

  viewNote() {
    this.setState({ editing: false })
  }

  delNote(i) {
    const tempnotes = this.state.notes
    tempnotes.splice(i, 1)
    this.setState({ notes: tempnotes })
  }

  newNote() {
    const oldNotes = this.state.notes
    oldNotes.push("")
    this.setState({ notes: oldNotes })
  }

  openSettings() {
    this.setState({ inSettings: true })
  }

  closeSettings() {
    this.setState({ inSettings: false })
  }

  auth(logIn) {
    const pass = this.password.current.value
    const email = this.email.current.value
    console.log(email, pass);

    console.log(logIn);
    if (logIn) {
      firebase.auth().signInWithEmailAndPassword(email, pass).then((result) => {

        this.authHandler(result)
        this.staySignedIn(email, pass)
        return
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then((result) => {
        this.newUser(result)
        this.authHandler(result)
        this.staySignedIn(email, pass)
        return
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }

  staySignedIn() {
    firebase.auth().setPersistence("local")
  }

  newUser(data) {
    base.post(`users/${data.user.uid}/notes`, {
      data: ["# your first note"]
    })
  }

  authHandler(authData) {
    this.setState({ uid: authData.user.uid })
    this.getNotes()
  }

  getNotes() {

    this.notesRef = base.syncState(`users/${this.state.uid}/notes`, {
      context: this,
      state: "notes"
    })
  }

  logout() {
    console.log("signing off");

    firebase.auth().signOut()
      .then(() => {
        this.setState({
          uid: null
        });
        return
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  themepick(pick) {
    console.log("changing theme", pick);

    this.setState({ theme: pick })
  }

  renderLogin() {
    return (
      <div>
        <p>email</p>
        <input ref={this.email} type="text" />
        <p>pass</p>
        <input ref={this.password} type="text" />
        <button onClick={() => this.auth(true)}>login</button>
        <button onClick={() => this.auth(false)}>sign up</button>
      </div>

    )
  }

  render() {
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    } else if (this.state.inSettings) {
      return <Settings close={this.closeSettings} themes={this.state.themes} themepick={this.themepick} logout={this.logout}></Settings>
    }

    return (
      <div className={`${style.wraper} ${this.state.theme === "term" ? style.term : style.default}`}>

        <div className={style.sidebar}>
          <Sidebar notes={this.state.notes} theme={this.state.theme} edit={this.edit} chose={this.chose} delNote={this.delNote} newNote={this.newNote} openSettings={this.openSettings} />
        </div>
        <div className={style.body}>
          <Body editing={this.state.editing} theme={this.state.theme} inUse={this.state.inUse} viewNote={this.viewNote} deleteNote={this.deleteNote} inUseIndex={this.state.inUseIndex} noteUpdate={this.noteUpdate} />

        </div>
      </div>
    );
  }
}

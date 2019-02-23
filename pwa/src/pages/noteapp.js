import React, { Component } from 'react';
import Body from "../components/body/Body"
import Sidebar from "../components/sidebar/Sidebar"
import base from "../base"
import firebase from 'firebase'
import Settings from '../components/Settings/Settings'
import "../components/styles/app.global.sass"
class NoteApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            notes: [],
            theme: "",
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
        this.editNote = this.editNote.bind(this)
        this.openSettings = this.openSettings.bind(this)

        this.closeSettings = this.closeSettings.bind(this)
        this.fetchtheme = this.fetchtheme.bind(this)
        this.expandsidebar = this.expandsidebar.bind(this)

    }
    componentWillMount() {
        this.setState({ theme: localStorage.getItem("theme") })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid });
                this.getNotes()
            }
        });
        this.htmlClass(this.state.theme)
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
        this.expandsidebar()

    }

    edit(i, arr) {
        this.setState({ editing: true })
        this.setState({ inUse: arr[i] })
        this.setState({ inUseIndex: i })
        this.expandsidebar()
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
    editNote() {
        this.setState({ editing: true })

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
        this.htmlClass(this.state.theme)
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
        this.savetheme(pick)
        this.fetchtheme()
    }

    htmlClass(pick) {
        document.querySelector("html").className = " "
        document.querySelector("html").classList.add(pick)
    }

    savetheme(pick) {
        localStorage.setItem("theme", pick)
    }

    fetchtheme() {
        this.setState({ theme: localStorage.getItem("theme") })
        this.htmlClass(this.state.theme)
    }
    expandsidebar() {
        const current = this.state.sidebarOpen
        this.setState({ sidebarOpen: !current })
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
            <div className="wraper">

                <div className={`sidebar ${this.state.sidebarOpen ? "is__opened" : "is__closed"}`}>
                    <div className={`closed`}>

                        <button onClick={() => this.expandsidebar()}> o</button>
                    </div>
                    <div className={`open`}>
                        <button onClick={() => this.expandsidebar()}>c</button>

                        <Sidebar notes={this.state.notes} edit={this.edit} chose={this.chose} delNote={this.delNote} newNote={this.newNote} openSettings={this.openSettings} />
                    </div>
                </div>
                <div className={`body ${this.state.sidebarOpen ? "bodyhide" : "bodyshow"}`}>
                    <Body editing={this.state.editing} inUse={this.state.inUse} viewNote={this.viewNote} deleteNote={this.deleteNote} inUseIndex={this.state.inUseIndex} noteUpdate={this.noteUpdate} edit={this.editNote} />
                </div>
            </div>
        );
    }
}
export default NoteApp;
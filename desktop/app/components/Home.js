// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import base from "../base"
import firebase from 'firebase'

type Props = {};

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      uid: null
    }
    this.password = React.createRef()
    this.email = React.createRef()

    this.renderLogin = this.renderLogin.bind(this)
    this.auth = this.auth.bind(this)
    // this.authHandler = this.authHandler.bind(this)

    this.staySignedIn = this.staySignedIn.bind(this)
    this.logout = this.logout.bind(this)

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.getNotes()
      }
    });
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

  authHandler(authData) {
    this.setState({ uid: authData.user.uid })
    // this.getNotes()
  }

  staySignedIn() {
    firebase.auth().setPersistence("local")
  }


  newUser(data) {
    base.post(`users/${data.user.uid}/notes`, {
      data: ["# your first note"]
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

  renderLogin() {
    return (
      <div>
        <p>pass</p>
        <input ref={this.password} type="text" />
        <p>email</p>
        <input ref={this.email} type="text" />
        <button onClick={() => this.auth(true)}>login with git hub</button>
        <button onClick={() => this.auth(false)}>sign up</button>
      </div>

    )
  }

  render() {
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    return (
      <div className={styles.container} data-tid="container">
        <button onClick={() => this.logout()}>sign out</button>
        <h2>Home</h2>
        <Link to={routes.COUNTER}>notes</Link>
      </div>
    );
  }
}


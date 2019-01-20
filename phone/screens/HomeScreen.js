import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import Note from "../components/note"
import Mdviewer from "../components/mdviewer"
import { MonoText } from '../components/StyledText';
import Markdown from 'react-native-simple-markdown'
import firebase from 'firebase'
// const config = {
//   apiKey: "AIzaSyCOGqbjz-RvVklmM3LlY7WpNuWu1IP6JYs",
//   authDomain: "md-notes-eb533.firebaseapp.com",
//   databaseURL: "https://md-notes-eb533.firebaseio.com",
//   projectId: "md-notes-eb533",
//   storageBucket: "md-notes-eb533.appspot.com",
//   messagingSenderId: "310717051496"
// }

// const app = firebase.initializeApp(config);
import base from "../base"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      expandSidebar: true,
      email: "",
      pass: "",
      notes: [],
      inUse: "",
      inUseIndex: null,
      editing: null,
      uid: null
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.delNote = this.delNote.bind(this)
    // this.itemsRef = app.database().ref();
    // this.password = React.createRef()
    // this.email = React.createRef()
    this.chose = this.chose.bind(this)
    this.edit = this.edit.bind(this)
    this.noteUpdate = this.noteUpdate.bind(this)
    this.swap = this.swap.bind(this)
    this.newNote = this.newNote.bind(this)
    // this.renderLogin = this.renderLogin.bind(this)
    this.auth = this.auth.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.getNotes = this.getNotes.bind(this)
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.getNotes()
      }
    });

  }
  chose(i, arr) {
    // console.log(i, arr);
    this.setState({ editing: false })
    this.setState({ inUse: arr[i] })
    this.setState({ inUseIndex: i })
    this.toggleSidebar()
  }

  edit(i, arr) {

    this.setState({ editing: true })
    this.setState({ inUse: arr[i] })
    this.setState({ inUseIndex: i })
    this.toggleSidebar()
  }

  noteUpdate(data) {
    // console.log("somthin", data);

    this.setState({ inUse: data })
    let tempArr = this.state.notes
    tempArr[this.state.inUseIndex] = data
    this.setState({ notes: tempArr })
    // console.log(this.state.inUse);

  }
  delNote(i) {
    const tempnotes = this.state.notes
    tempnotes.splice(i, 1)
    this.setState({ notes: tempnotes })
  }
  swap() {
    const was = this.state.editing
    this.setState({ editing: !was })
  }

  newNote() {
    const oldNotes = this.state.notes
    oldNotes.push("")
    const i = oldNotes.length
    this.setState({ notes: oldNotes })
    this.setState({ editing: true })
    this.setState({ inUse: this.state.notes[i] })
    this.setState({ inUseIndex: i })

  }
  toggleSidebar() {
    const tempState = !this.state.expandSidebar
    this.setState({ expandSidebar: tempState })
  }

  auth(logIn) {
    const pass = this.state.pass
    const email = this.state.email
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
    console.log(authData);
    this.setState({ uid: authData.user.uid })
    this.getNotes()
  }
  newUser(data) {


    // base.post(`users/${data.user.uid}`, {
    //   notes: ["# your first note"]
    // }
    // ).catch(err => {
    //   console.log(err);
    // });

    // base.post(`users/${data.user.uid}/notes`, {
    //   data: ["# your first note"]
    // })
    firebase.database().ref(`users/${data.user.uid}`).set({
      notes: ["# your first note on your IOS device"]
    });
  }
  staySignedIn() {
    firebase.auth().setPersistence("local")
  }
  getNotes() {
    // console.log("firebase value", firebase.database().ref(`users/${this.state.uid}/notes`).orderByValue());
    // //   this.notesRef = base.syncState(`users/${this.state.uid}/notes`, {
    // //     context: this,
    // //     state: "notes"
    // //   })

    this.notesRef = base.syncState(`users/${this.state.uid}/notes`, {
      context: this,
      state: "notes"
    })
  }

  render() {
    if (!this.state.uid) {
      return (
        <View style={loginStyles.wrapper}>
          <Text>email</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="email"
            placeholderTextColor="grey"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email} />
          <Text>pass word8</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="email"
            placeholderTextColor="grey"
            onChangeText={(text) => this.setState({ pass: text })}
            value={this.state.pass} />
          <Button title="sign up" onPress={() => this.auth(false)} />
          <Button title="login" onPress={() => this.auth(true)} />
        </View>

      )
    } else {
      return (
        <View style={styles.container}>
          <View style={[this.state.expandSidebar ? sidebarStyles.sidebarOpen : sidebarStyles.sidebarClosed]}>
            {this.state.notes.map((note, index) => (

              <View key={index} style={[this.state.expandSidebar ? sidebarStyles.sidebar__noteOpen : sidebarStyles.sidebar__noteClosed]}>

                <View style={{ background: "red" }} >

                  <Markdown>
                    {note.substring(0, 50)}
                  </Markdown>

                </View>
                <Button onPress={() => this.delNote(index)} title="delete Note" />
                <Button title="vue this one" onPress={() => this.chose(index, this.state.notes)} />
                <Button onPress={() => this.edit(index, this.state.notes)}
                  title="Edit this one"
                />
              </View>
            ))}
            <Button onPress={this.toggleSidebar} title="toggle" />
            <Button onPress={this.newNote} title="New Note" />
          </View>

          <View style={BodyStyles.body}>
            {this.state.editing ? (<Note md={this.state.inUse} swap={this.swap} update={this.noteUpdate} />) : (<Mdviewer md={this.state.inUse} swap={this.swap} />)}
          </View>

        </View>
      );
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const loginStyles = {
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}
const BodyStyles = {
  body: {
    flex: 1,
  }
}
const sidebarStyles = StyleSheet.create({
  sidebarOpen: {
    marginTop: 20,
    backgroundColor: "white",
    width: 500,
    flexDirection: "column",

  },
  sidebarClosed: {
    marginTop: 20,
    backgroundColor: "white",
    width: 70,
    flexDirection: "column",
  },
  sidebar__noteOpen: {
    backgroundColor: "green",
    // height: 50,
  },
  sidebar__noteClosed: {
    display: "none"
  }
})
const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: '#333',


  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

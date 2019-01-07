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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      notes: ["# this is a test", "**Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, vitae. Excepturi odit molestias ipsam optio quibusdam doloribus accusamus, totam possimus officiis, molestiae quia magnam minus, aliquid assumenda ex necessitatibus quaerat?**"],
      inUse: "",
      inUseIndex: null,
      editing: null,
      uid: null
    }
    // this.password = React.createRef()
    // this.email = React.createRef()
    this.chose = this.chose.bind(this)
    this.edit = this.edit.bind(this)
    this.noteUpdate = this.noteUpdate.bind(this)
    this.swap = this.swap.bind(this)
    this.newNote = this.newNote.bind(this)
    // this.renderLogin = this.renderLogin.bind(this)
    // this.auth = this.auth.bind(this)
    // this.authHandler = this.authHandler.bind(this)
    // this.getNotes = this.getNotes.bind(this)
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

  swap() {
    const was = this.state.editing
    this.setState({ editing: !was })
  }

  newNote() {
    const oldNotes = this.state.notes
    oldNotes.push("")
    this.setState({ notes: oldNotes })
  }


  render() {
    if (!this.state.uid) {
      return (
        <View>
          <Text>email</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="email"
            placeholderTextColor="grey"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email} />
          <Text>pass word</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="email"
            placeholderTextColor="grey"
            onChangeText={(text) => this.setState({ pass: text })}
            value={this.state.pass} />

        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={sidebarStyles.sidebar}>
          {this.state.notes.map((note, index) => (

            <View key={index} style={sidebarStyles.sidebar__note}>

              <View style={{ background: "red" }} >

                <Markdown>
                  {note.substring(0, 50)}
                </Markdown>

              </View>
              <Button title="vue this one" onPress={() => this.chose(index, this.state.notes)} />
              <Button onPress={() => this.edit(index, this.state.notes)}
                title="Edit this one"
              />
            </View>
          ))}
          <Button onPress={this.newNote} title="New Note" />
        </View>

        <View style={BodyStyles.body}>
          {this.state.editing ? (<Note md={this.state.inUse} swap={this.swap} update={this.noteUpdate} />) : (<Mdviewer md={this.state.inUse} swap={this.swap} />)}
        </View>

      </View>
    );
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


const BodyStyles = {
  body: {
    width: 600
  }
}
const sidebarStyles = {
  sidebar: {
    marginTop: 20,
    backgroundColor: "white",
    flex: 1,
    width: 100,
    flexDirection: "column",

  },
  sidebar__note: {
    backgroundColor: "green",
    height: 20,
    flex: 1,
  }
}
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

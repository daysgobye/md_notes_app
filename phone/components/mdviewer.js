
import React from 'react'
import Markdown from "./myMd/react-native-simple-markdown/index"
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

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.swap = this.swap.bind(this)
    }

    componentDidMount() {


    }

    changeHandler(data) {
        // console.log(this.textzone.current.value)
        // this.setState({ text: data })
        // 
    }
    swap() {

        this.props.swap()
    }

    render() {

        return (
            <View >
                <Button onPress={this.swap} title="Edit it"
                    color="#841584"

                />
                <Markdown styles={markdownStyles}>
                    {this.props.md}
                </Markdown>
            </View>
        )
    }
}
const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'white',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: 'white',
    },
}

export default Note;


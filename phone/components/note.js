import React from 'react'
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
        this.textzone = React.createRef()
        this.changeHandler = this.changeHandler.bind(this)
        this.swap = this.swap.bind(this)
    }

    componentDidMount() {
        // console.log(this.props.md);

        this.setState({ text: this.props.md })

    }

    changeHandler(data) {
        // console.log(this.textzone.current.value)
        // this.setState({ text: data })
        // 
    }
    swap() {
        this.props.update(this.state.text)
        this.props.swap()
    }

    render() {

        return (
            <View style={styles.textAreaContainer} >
                <Button onPress={this.swap} title="view it"
                    color="#841584" />
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text} />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    textAreaContainer: {

        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 1500,
        justifyContent: "flex-start",
        backgroundColor: "white",
    }
})
export default Note;
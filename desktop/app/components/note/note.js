import React from 'react'
import style from "./note.sass"
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/twilight';
class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calcpattern: /calc\(([0-9]+[\+|\*|\-|\\][0-9]+)\)=/ig,
            md: ""
        }
        // this.textzone = React.createRef()
        this.changeHandler = this.changeHandler.bind(this)
        this.swap = this.swap.bind(this)
        this.doCalc = this.doCalc.bind(this)
        this.del = this.del.bind(this)
        this.saveFile = this.saveFile.bind(this)
    }

    componentDidMount() {
        this.setState({ md: this.props.md })
        // this.textzone.current.value = this.props.md
        document.addEventListener("keydown", (e) => {
            // check if mac then look for cmd key and s or if not then controll and s to swap to view mode
            if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
                e.preventDefault();
                this.swap()
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (e) => {
            console.log(e);

        })
    }

    del() {
        this.props.delete(this.props.index)
    }


    doCalc(text) {
        const res = this.state.calcpattern.exec(text)
        if (res) {
            const doneMath = eval(res[1])
            const patt = this.state.calcpattern
            const newText = text.replace(patt, doneMath)
            this.setState({ md: newText })
        }
    }

    changeHandler(value, event) {
        this.setState({ md: value })
        this.doCalc(value)
        this.props.update(value)
    }

    onLoad(e) {
        // console.log("onload", e);

        // console.log(this.props.md);

        // this.textzone.current.value = this.props.md
    }
    swap() {
        this.props.swap()
    }

    saveFile() {
        //file system
        const fs = require('fs')
        // popup dialog
        const { dialog } = require('electron').remote
        dialog.showSaveDialog((filename) => {
            if (!filename) {
                console.log("no name?");
                return
            }
            fs.writeFile(filename, this.state.md, (err) => {
                console.log(err);
            })
        })
    }

    import() {
        //file system
        const fs = require('fs')
        // popup dialog
        const { dialog } = require('electron').remote
        dialog.showOpenDialog((filename) => {
            if (!filename) {
                console.log("no name?");
                return
            }
            fs.readFile(filename[0], "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                    return
                }
                this.setState({ md: data })

            })
        })
    }

    render() {
        return (
            <div className={style.wraper}>
                <div className={style.buttons}>
                    <button onClick={this.swap}>view</button>
                    <button onClick={this.del}>delete</button>
                    <button onClick={() => this.saveFile()}>save to file</button>
                    <button onClick={() => this.import()}>import</button>
                </div>
                {/* <textarea name="" id="" ref={this.textzone} onChange={this.changeHandler}></textarea> */}
                <AceEditor
                    mode="markdown"
                    theme="twilight"
                    name="blah2"
                    onLoad={this.onLoad}
                    onChange={this.changeHandler}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={false}
                    highlightActiveLine={true}
                    value={this.state.md}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "#10101000"
                    }} />

            </div>

        )
    }
}

export default Note;
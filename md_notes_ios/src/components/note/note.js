import React from 'react'
import style from "./note.sass"

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calcpattern: /calc\(([0-9]+[\+|\*|\-|\\][0-9]+)\)/ig
        }
        this.textzone = React.createRef()
        this.changeHandler = this.changeHandler.bind(this)
        this.swap = this.swap.bind(this)
        this.doCalc = this.doCalc.bind(this)
        this.del = this.del.bind(this)
    }

    componentDidMount() {
        console.log(this.props.md);

        this.textzone.current.value = this.props.md

    }

    del() {
        console.log("deleting in note");

        this.props.delete(this.props.index)
    }


    doCalc(text) {
        const res = this.state.calcpattern.exec(text)
        if (res) {
            const doneMath = eval(res[1])
            const patt = this.state.calcpattern
            const newText = text.replace(patt, doneMath)
            this.textzone.current.value = newText
            // console.log(eval(res[1]));
        }



    }

    changeHandler(event) {
        // console.log(this.textzone.current.value)
        this.doCalc(this.textzone.current.value)

        this.props.update(this.textzone.current.value)
    }

    swap() {
        this.props.swap()
    }

    render() {
        return (
            <div className={style.wraper}>
                <button onClick={this.swap}>view</button>
                <button onClick={this.del}>delete</button>
                <textarea name="" id="" ref={this.textzone} onChange={this.changeHandler}></textarea>
            </div>

        )
    }
}

export default Note;
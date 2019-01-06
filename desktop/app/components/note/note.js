import React from 'react'
import style from "./note.sass"
class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.textzone = React.createRef()
        this.changeHandler = this.changeHandler.bind(this)
        this.swap = this.swap.bind(this)
    }

    componentDidMount() {
        console.log(this.props.md);

        this.textzone.current.value = this.props.md

    }
    changeHandler(event) {
        // console.log(this.textzone.current.value)

        this.props.update(this.textzone.current.value)
    }
    swap() {
        this.props.swap()
    }

    render() {
        return (
            <div className={style.wraper}>
                <button onClick={this.swap}>vue</button>
                <textarea name="" id="" ref={this.textzone} onChange={this.changeHandler}></textarea>
            </div>

        )
    }
}

export default Note;
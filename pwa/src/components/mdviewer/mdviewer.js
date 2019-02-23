import React from 'react'
import style from "./mdviewer.module.sass"
const Remarkable = require('remarkable');
class Mdviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getRawMarkup(passed) {
        const md = new Remarkable();
        return { __html: md.render(passed) };
    }

    componentDidMount() {

    }
    swap() {
        this.props.swap()
    }


    render() {
        return (
            <div className={style.wraper}>
                <button onClick={() => this.swap()}>edit</button>
                <div className={style.mdbody} dangerouslySetInnerHTML={this.getRawMarkup(this.props.md)}>
                </div>
            </div>
        );
    }
}

export default Mdviewer;
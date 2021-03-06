import React from 'react'
import style from "./mdviewer.sass"
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

    render() {
        return (
            <div className={style.wraper} dangerouslySetInnerHTML={this.getRawMarkup(this.props.md)}>
            </div>
        );
    }
}

export default Mdviewer;
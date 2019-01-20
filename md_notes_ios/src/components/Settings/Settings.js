import React, { Component } from 'react';
import style from './Settings.sass'
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style.wraper}>

                <button onClick={() => this.props.close()}>x</button>
                <button onClick={() => this.logout()}>sign out</button>
                <h1>this is my settings page</h1>
            </div>
        );
    }
}

export default Settings;
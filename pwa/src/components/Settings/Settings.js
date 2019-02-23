import React, { Component } from 'react';
import style from './Settings.module.sass'
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picedtheme: ""
        }
        this.choseTheme = this.choseTheme.bind(this)
        this.changeHangler = this.changeHangler.bind(this)
    }

    choseTheme() {
        console.log("working");

        if (!this.state.picedtheme == "") {
            console.log("in if");

            this.props.themepick(this.state.picedtheme)
        }
    }

    changeHangler(e) {
        this.setState({ picedtheme: e.target.value })
    }

    render() {
        return (
            <div className={style.wraper}>

                <button onClick={() => this.props.close()}>x</button>

                <div className={style.body}>

                    <button onClick={() => this.props.logout()}>sign out</button>

                    <select ref={this.selectRef} id="themes" onChange={this.changeHangler} >
                        <option disabled value>
                            Please select one
                    </option>
                        {this.props.themes.map((theme, index) => (
                            <option value={theme} key={index}>
                                {theme}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => this.choseTheme()}> change theme</button>
                </div>
            </div>
        );
    }
}

export default Settings;
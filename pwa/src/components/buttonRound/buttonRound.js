// props
// innerText "what the button should say"
// type "link" or "function" or "gatsby link"
// action "url" or function or "page name"
// color "color"
// fsize ".5"
// padding "0 20px"
import React from 'react'
import { Link } from 'gatsby'
//styles
import style from './buttonround.module.sass'
class ButtonRound extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    color: 'black',
    pos: 'center',
    fsize: '.7',
    passedState: '',
    padding: '0px 25px',
  }
  render() {
    let button
    if (this.props.type === 'link') {
      button = (<a href={`${this.props.action}`} nofollow="true" target="_blank" style={{ color: this.props.color }}>

        <button
          className={style.buttonRound}
          style={{
            borderRadius: ".9rem",
            border: `1px solid ${this.props.color}`,
            borderColor: this.props.color,
            padding: this.props.padding,
            fontSize: `${this.props.fsize}rem`,
          }}
        >

          {this.props.innerText}
          {' '}
        </button>   </a>
      )
    } else if (this.props.type === 'function') {
      button = (
        <button
          className={style.buttonRound}
          onClick={this.props.action}
          style={{
            borderRadius: ".9rem",
            border: `1px solid ${this.props.color}`,
            color: this.props.color,
            borderColor: this.props.color,
            padding: this.props.padding,
            fontSize: `${this.props.fsize}rem`,
          }}
        >
          {this.props.innerText}
        </button>
      )
    } else if (this.props.type === 'gatsbylink') {
      button = (
        <Link
          to={`/${this.props.action}/`}
          state={{ fromButtonRound: this.props.passedState }}
        >
          <button
            className={style.buttonRound}
            style={{
              borderRadius: ".9rem",
              border: `1px solid ${this.props.color}`,
              color: this.props.color,
              borderColor: this.props.color,
              padding: this.props.padding,
              fontSize: `${this.props.fsize}rem`,
            }}
          >
            {this.props.innerText}
          </button>
        </Link>
      )
    }

    return (
      <div className={style.wraper} style={{ justifyContent: this.props.pos }}>
        {button}
      </div>
    )
  }
}

export default ButtonRound

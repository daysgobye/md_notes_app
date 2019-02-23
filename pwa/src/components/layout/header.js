import React, { Component } from 'react';
import { Link } from "gatsby"
import "./header.sass"
import Content from '../utility/Content/Content'
class Headder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navlinks: [
        {
          title: "Home",
          link: "/"
        },
        {
          title: "storybook",
          link: "storybook"
        },
      ],
      navOpen: false
    }
    this.toggleNav = this.toggleNav.bind(this)
  }
  toggleNav() {
    const currentstate = this.state.navOpen
    this.setState({ navOpen: !currentstate });
  }
  render() {
    return (
      <div className="header__wrapper">
        <Content>
          <div className="header">

            <h1>
              <Link to={"/"}>

                {this.props.siteTitle}
              </Link>
            </h1>
            {/* desktop nav */}
            <div className="desktop">
              <nav className="nav">
                {this.state.navlinks.map((link, index) => (
                  <div className="nav__link">
                    <Link to={link.link} key={index}>
                      {link.title}
                    </Link>
                  </div>

                ))}
              </nav>
            </div>
            {/* mobile nav */}
            <div className={`mobile ${this.state.navOpen ? "nav__open" : "nav__closed"}`}>
              <button className="dot" aria-label="click to expand nav" onClick={() => this.toggleNav()}>
                <div className="dot__one"></div>
                <div className="dot__two"></div>
                <div className="dot__three"></div>
              </button>
              <nav className={`nav`}>
                {this.state.navlinks.map((link, index) => (
                  <div className="nav__link">
                    <Link to={link.link} key={index}>
                      {link.title}
                    </Link>
                  </div>

                ))}
              </nav>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default Headder;
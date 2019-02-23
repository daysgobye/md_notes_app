import React, { Component } from "react";
import "./footer.sass";
import BuiltBy from "./builtby";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const data = this.props.data;
    return (
      <footer className="footer">
        <h3>Stay in Touch</h3>
        <p>
          Subscribe to my mailing list to receive updates and promotional
          offers.
        </p>
        <BuiltBy />
      </footer>
    );
  }
}

export default Footer;

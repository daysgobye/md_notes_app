import React, { Component } from 'react';
import Layout from "../components/layout/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Content from "../components/utility/Content/Content"
import "../components/pagestyles/storybook.sass"
import ShareFacebook from "../components/shareLinks/shareFacebook"
import ShareTwitter from "../components/shareLinks/shareTwitter"
import ShareLinked from "../components/shareLinks/shareLinked"
import ShareReddit from "../components/shareLinks/shareReddit"
import GoogleMap from "../components/googleMap/googleMap"
import LaxHeader from "../components/laxheader/laxheader"
import Conform from "../components/conform/conform"
import ButtonRound from "../components/buttonRound/buttonRound"
class StoryBook extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Layout>
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
                <LaxHeader bgimg={"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-685781.png"}>
                    <div style={{ height: "85vh", color: "white", textAlign: "center", display: "flex", justifyContent: "center", margin: "auto", flexDirection: "column" }} >
                        <h2>
                            welcom to the story book
              </h2>
                        <p>
                            look in the story book file to see how to use them
              </p>
                    </div>
                </LaxHeader>
                <Content>
                    <div className="wraper">
                        <div className="comp">
                            <div className="icons">
                                <ShareTwitter
                                    title="Purple + Bold"
                                    message="this is most of whtat we need to get a site going"
                                    hastag={`#p+B #gatsby #customwebsites `}
                                    link={`https://purpleandbold.com`}
                                    icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgNC41NTdjLS44ODMuMzkyLTEuODMyLjY1Ni0yLjgyOC43NzUgMS4wMTctLjYwOSAxLjc5OC0xLjU3NCAyLjE2NS0yLjcyNC0uOTUxLjU2NC0yLjAwNS45NzQtMy4xMjcgMS4xOTUtLjg5Ny0uOTU3LTIuMTc4LTEuNTU1LTMuNTk0LTEuNTU1LTMuMTc5IDAtNS41MTUgMi45NjYtNC43OTcgNi4wNDUtNC4wOTEtLjIwNS03LjcxOS0yLjE2NS0xMC4xNDgtNS4xNDQtMS4yOSAyLjIxMy0uNjY5IDUuMTA4IDEuNTIzIDYuNTc0LS44MDYtLjAyNi0xLjU2Ni0uMjQ3LTIuMjI5LS42MTYtLjA1NCAyLjI4MSAxLjU4MSA0LjQxNSAzLjk0OSA0Ljg5LS42OTMuMTg4LTEuNDUyLjIzMi0yLjIyNC4wODQuNjI2IDEuOTU2IDIuNDQ0IDMuMzc5IDQuNiAzLjQxOS0yLjA3IDEuNjIzLTQuNjc4IDIuMzQ4LTcuMjkgMi4wNCAyLjE3OSAxLjM5NyA0Ljc2OCAyLjIxMiA3LjU0OCAyLjIxMiA5LjE0MiAwIDE0LjMwNy03LjcyMSAxMy45OTUtMTQuNjQ2Ljk2Mi0uNjk1IDEuNzk3LTEuNTYyIDIuNDU3LTIuNTQ5eiIvPjwvc3ZnPg==" />
                                <ShareFacebook
                                    message={`https://purpleandbold.com`}
                                    icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIuNjc1IDBoLTIxLjM1Yy0uNzMyIDAtMS4zMjUuNTkzLTEuMzI1IDEuMzI1djIxLjM1MWMwIC43MzEuNTkzIDEuMzI0IDEuMzI1IDEuMzI0aDExLjQ5NXYtOS4yOTRoLTMuMTI4di0zLjYyMmgzLjEyOHYtMi42NzFjMC0zLjEgMS44OTMtNC43ODggNC42NTktNC43ODggMS4zMjUgMCAyLjQ2My4wOTkgMi43OTUuMTQzdjMuMjRsLTEuOTE4LjAwMWMtMS41MDQgMC0xLjc5NS43MTUtMS43OTUgMS43NjN2Mi4zMTNoMy41ODdsLS40NjcgMy42MjJoLTMuMTJ2OS4yOTNoNi4xMTZjLjczIDAgMS4zMjMtLjU5MyAxLjMyMy0xLjMyNXYtMjEuMzVjMC0uNzMyLS41OTMtMS4zMjUtMS4zMjUtMS4zMjV6Ii8+PC9zdmc+" />
                                <ShareLinked
                                    message={`this is most of whtat we need to get a site going`}
                                    title="Purple + Bold"
                                    website={"purple + bold"}
                                    link={`https://purpleandbold.com`}
                                    icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNC45OCAzLjVjMCAxLjM4MS0xLjExIDIuNS0yLjQ4IDIuNXMtMi40OC0xLjExOS0yLjQ4LTIuNWMwLTEuMzggMS4xMS0yLjUgMi40OC0yLjVzMi40OCAxLjEyIDIuNDggMi41em0uMDIgNC41aC01djE2aDV2LTE2em03Ljk4MiAwaC00Ljk2OHYxNmg0Ljk2OXYtOC4zOTljMC00LjY3IDYuMDI5LTUuMDUyIDYuMDI5IDB2OC4zOTloNC45ODh2LTEwLjEzMWMwLTcuODgtOC45MjItNy41OTMtMTEuMDE4LTMuNzE0di0yLjE1NXoiLz48L3N2Zz4=" />
                                <ShareReddit
                                    message={`most of what we need to get a site going from https://purpleandbold.com`}
                                    title={`starter by purple and bold`}
                                    icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTEuNzc5YzAtMS40NTktMS4xOTItMi42NDUtMi42NTctMi42NDUtLjcxNSAwLTEuMzYzLjI4Ni0xLjg0Ljc0Ni0xLjgxLTEuMTkxLTQuMjU5LTEuOTQ5LTYuOTcxLTIuMDQ2bDEuNDgzLTQuNjY5IDQuMDE2Ljk0MS0uMDA2LjA1OGMwIDEuMTkzLjk3NSAyLjE2MyAyLjE3NCAyLjE2MyAxLjE5OCAwIDIuMTcyLS45NyAyLjE3Mi0yLjE2M3MtLjk3NS0yLjE2NC0yLjE3Mi0yLjE2NGMtLjkyIDAtMS43MDQuNTc0LTIuMDIxIDEuMzc5bC00LjMyOS0xLjAxNWMtLjE4OS0uMDQ2LS4zODEuMDYzLS40NC4yNDlsLTEuNjU0IDUuMjA3Yy0yLjgzOC4wMzQtNS40MDkuNzk4LTcuMyAyLjAyNS0uNDc0LS40MzgtMS4xMDMtLjcxMi0xLjc5OS0uNzEyLTEuNDY1IDAtMi42NTYgMS4xODctMi42NTYgMi42NDYgMCAuOTcuNTMzIDEuODExIDEuMzE3IDIuMjcxLS4wNTIuMjgyLS4wODYuNTY3LS4wODYuODU3IDAgMy45MTEgNC44MDggNy4wOTMgMTAuNzE5IDcuMDkzczEwLjcyLTMuMTgyIDEwLjcyLTcuMDkzYzAtLjI3NC0uMDI5LS41NDQtLjA3NS0uODEuODMyLS40NDcgMS40MDUtMS4zMTIgMS40MDUtMi4zMTh6bS0xNy4yMjQgMS44MTZjMC0uODY4LjcxLTEuNTc1IDEuNTgyLTEuNTc1Ljg3MiAwIDEuNTgxLjcwNyAxLjU4MSAxLjU3NXMtLjcwOSAxLjU3NC0xLjU4MSAxLjU3NC0xLjU4Mi0uNzA2LTEuNTgyLTEuNTc0em05LjA2MSA0LjY2OWMtLjc5Ny43OTMtMi4wNDggMS4xNzktMy44MjQgMS4xNzlsLS4wMTMtLjAwMy0uMDEzLjAwM2MtMS43NzcgMC0zLjAyOC0uMzg2LTMuODI0LTEuMTc5LS4xNDUtLjE0NC0uMTQ1LS4zNzkgMC0uNTIzLjE0NS0uMTQ1LjM4MS0uMTQ1LjUyNiAwIC42NS42NDcgMS43MjkuOTYxIDMuMjk4Ljk2MWwuMDEzLjAwMy4wMTMtLjAwM2MxLjU2OSAwIDIuNjQ4LS4zMTUgMy4yOTgtLjk2Mi4xNDUtLjE0NS4zODEtLjE0NC41MjYgMCAuMTQ1LjE0NS4xNDUuMzc5IDAgLjUyNHptLS4xODktMy4wOTVjLS44NzIgMC0xLjU4MS0uNzA2LTEuNTgxLTEuNTc0IDAtLjg2OC43MDktMS41NzUgMS41ODEtMS41NzVzMS41ODEuNzA3IDEuNTgxIDEuNTc1LS43MDkgMS41NzQtMS41ODEgMS41NzR6Ii8+PC9zdmc+" />

                            </div>
                        </div>
                        <div className="comp">
                            <GoogleMap
                                address={` 4255 Spring Mountain Rd, Las Vegas, NV 89102`}

                            />
                        </div>
                        <div className="comp">
                            <Conform email={"your@email.com"}>
                                <label>
                                    Name *
                      <div className="name">
                                        <div className="name__input">
                                            <input required type="text" id="first" />
                                            <p>First Name</p>
                                        </div>
                                        <div className="name__input">
                                            <input required type="text" id="last" />
                                            <p>Last Name</p>
                                        </div>
                                    </div>
                                </label>
                                <label>
                                    Email Address *
                      <input required type="text" />
                                </label>
                                <label>
                                    Subject *
                      <input required type="text" />
                                </label>
                                <label>
                                    Message *
                      <textarea name="message" id="" cols="30" rows="10" />
                                </label>
                                <button type="submit" className="submit">
                                    {" "}
                                    submit{" "}
                                </button>
                            </Conform>
                        </div>
                        <div className="comp">
                            <ButtonRound
                                innerText="Gatsby.org"
                                pos="start"
                                action={`https://www.gatsby.org`}
                                type="link"
                            />
                            <ButtonRound
                                innerText={`Go home`}
                                action={`/`}
                                type="gatsbylink"
                                passedState={"cool page"}
                            />
                        </div>
                        <div className="comp">
                            <h2>
                                here are some snippes you will use
                        </h2>
                            <div className="code">
                                <code>
                                    <p className="show">when you want a link with a img or somting in it </p>
                                    <p className="codereal">

                                        {` <a href="#nav" `}
                                        <span className="highlight">
                                            {`aria-label="link to navigation bar"> `}
                                        </span>
                                        {`
                           </a>        `}
                                    </p>

                                    <p className="show">

                                        when you dont want a lable on your input use this lable
</p>
                                    <p className="codereal">
                                        <span className="highlight">
                                            {`<label htmlFor="EMAIL" className="visuallyhidden">
                                    Email Sign up
                                    </label>`}
                                        </span>
                                        <br />
                                        {`
                                    <input
                                    type="email"
                                    defaultValue
                                    name="EMAIL"
                                    className="email"
                                    id="EMAIL"
                                    placeholder="email address"
                                    required="required"
                                    value=""
                                    onFocus={this.focusHandler} onBlur={this.blurHandler}
                                    />`}
                                    </p>
                                </code>
                            </div>
                        </div>
                    </div>
                </Content>

            </Layout>
        );
    }
}

export default StoryBook;
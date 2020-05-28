import React from "react";
import LiveChat from "react-livechat";
import { AuthConsumer } from "../../AuthContext";
import Main from "../Main";
import Iframe from "react-iframe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fullscreen from "react-full-screen";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  };

  render() {
    return (
      <Main>
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-12">
                    <button
                      onClick={this.goFull}
                      className="btn btn-primary mb-3 float-right"
                    >
                      <FontAwesomeIcon icon={"desktop"} /> Go Fullscreen
                    </button>
                    <Fullscreen
                      enabled={this.state.isFull}
                      onChange={isFull => this.setState({ isFull })}
                    >
                      <Iframe
                        url="https://accounts.livechatinc.com/?client_id=bb9e5b2f1ab480e4a715977b7b1b4279&response_type=token&redirect_uri=https%3A%2F%2Fmy.livechatinc.com&state=%7B%22redirectTo%22%3A%22keep-on-chatting-with-customers%22%7D"
                        width={this.state.isFull ? "100%" : "1000px"}
                        height={this.state.isFull ? "100%" : "400px"}
                        id="myId"
                        display="initial"
                        position="relative"
                        allowFullScreen
                      />
                    </Fullscreen>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

Chat.contextType = AuthConsumer;
//<iframe src="" className="iframe-container col-lg-12" />

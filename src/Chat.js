import { useEffect } from "react";

const Chat = ({ room }) => {
  // dependencies = [] => only on mount
  // Handle WS connection
  useEffect(() => {
    console.log("Chat: mount");
    console.log("WS: connect");
    // cleanup
    return () => {
      console.log("Chat: unmount");
      console.log("WS: disconnect");
    };
  }, []);

  // Handle room registration
  useEffect(() => {
    console.log("Chat: join room", room);
    return () => {
      console.log("Chat: leave room", room);
    };
  }, [room]);

  return (
    <p>
      <strong>#{room}</strong>
    </p>
  );
};

/*
import React from "react";

class Chat extends React.Component {
  componentDidMount() {
    console.log("Chat#componentDidMount");
    console.log("WS: connect");
    console.log("WS: join room", this.props.room);
  }

  componentWillUnmount() {
    console.log("Chat#componentWillUnmount");
    console.log("WS: leave room", this.props.room);
    console.log("WS: disconnect");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Chat#componentDidUpdate", { prevProps, prevState });
    if (prevProps.room !== this.props.room) {
      console.log("WS: leave room", prevProps.room);
      console.log("WS: join room", this.props.room);
    }
  }

  render() {
    return (
      <p>
        <strong>#{this.props.room}</strong>
      </p>
    );
  }
}
*/

export default Chat;

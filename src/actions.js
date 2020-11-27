export const authLogin = (username) => ({
  type: "AUTH/LOGIN",
  payload: { username },
});

export const logout = () => ({
  type: "LOGOUT",
  payload: {},
});

export const joinedRoom = (label, closable = true) => ({
  type: "JOINED_ROOM",
  payload: { label, closable },
});

export const receivedMessage = ({
  timestamp = Date.now(),
  text,
  username,
  room,
}) => ({
  type: "RECEIVED_MESSAGE",
  payload: { timestamp, text, username, room },
});

/*
export const postMessage = (message) => ({
  type: "HTTP",
  payload: {
    url: "/message",
    data: (state) => ({
      message,
      username: state.username,
      // etc.
    }),
    onSuccessAction: receivedMessage,
  },
});
*/

export const postMessage = (message) => ({
  type: "WEBSOCKET",
  payload: (state) => ({
    name: "message",
    args: [message, state.currentRoom],
  }),
});

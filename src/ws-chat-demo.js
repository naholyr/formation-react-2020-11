import { connect } from "./ws-connect";

// Sample chat in console

const ws = connect();

ws.on("welcome", (username, isMyself) => {
  if (isMyself) {
    console.log(">> Welcome @%s!", username);
  } else {
    console.log(">> Welcome to @%s!", username);
  }
  if (isMyself) {
    ws.emit("join", "general");
  }
});

ws.on("goodbye", (username, isMyself) => {
  console.log(">> Goodbye, @%s", username);
});

ws.on("joined", (room, username, isMyself) => {
  if (isMyself) {
    console.log("#%s: You joined", room);
  } else {
    console.log("#%s: @%s joined", room, username);
  }
});

ws.on("left", (room, username, isMyself) => {
  if (isMyself) {
    console.log("#%s: You left", room);
  } else {
    console.log("#%s: @%s left", room, username);
  }
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

const showMessage = ({
  login: username,
  text,
  date: timestamp,
  room,
  myself: isMyself,
}) => {
  const formattedDate = dateFormatter.format(new Date(timestamp));
  if (isMyself) {
    console.log("#%s > You (%s): %s", room, username, formattedDate, text);
  } else {
    console.log("#%s > @%s (%s): %s", room, username, formattedDate, text);
  }
};

ws.on("messages", (room, messages) => messages.forEach(showMessage));
ws.on("message", showMessage);

ws.on("connect", () => console.warn("WS: connected"));
ws.on("disconnect", () => console.warn("WS: disconnected"));
ws.on("error", (message) => console.error("WS: error %s", message));

window.chat = {
  login: (username) => ws.emit("login", username),
  join: (room) => ws.emit("join", room),
  leave: (room) => ws.emit("leave", room),
  logout: () => ws.emit("logout"),
  post: (text, room = "general") => ws.emit("message", text, room),
};

console.info("Chat demo ready: call methods chat.login, chat.join, chat.post…");

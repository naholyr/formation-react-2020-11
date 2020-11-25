const env = require("./dotenv");
const WebSocket = require("ws");
const { handlers } = require("./handlers");

const port = env.REACT_APP_WS_PORT || 3002;

const parseMessage = (string) => {
  const parsed = JSON.parse(string);
  if (!Array.isArray(parsed))
    throw new Error("Invalid message format (JSON OK, but expected array)");
  if (typeof parsed[0] !== "string")
    throw new Error(
      "Invalid message format (JSON OK, array OK, but expected first element to be a string)"
    );
  return parsed;
};

// Socket => string[]
const wsRooms = new WeakMap();

const onMessage = (wss, ws, req) => {
  const emit = ({ myself = true, others = false, rooms = [] } = {}) => (
    type,
    ...args
  ) => {
    const message = JSON.stringify([type, ...args]);
    if (myself && !others) {
      console.log(">  message = %s", message);
      ws.send(message);
    } else if (others) {
      console.log(
        ">> myself = %s, rooms = %s, message = %s",
        rooms,
        myself ? "y" : "n",
        message
      );
      wss.clients.forEach((client) => {
        if (!myself && client === ws) return console.log("not myself");
        if (
          rooms.length &&
          !rooms.some((room) => wsRooms.get(client).has(room))
        )
          return console.log("not in rooms", rooms);
        console.log("emit to client");
        client.send(message);
      });
    }
  };

  const getRooms = () => wsRooms.get(ws);

  const join = (room) => {
    console.log("~  join %s", room);
    getRooms().add(room);
  };

  const leave = (room) => {
    console.log("~  leave %s", room);
    getRooms().delete(room);
  };

  return (msg) => {
    console.log("<  %s", msg);
    let type, args;
    try {
      [type, ...args] = parseMessage(msg);
      if (!handlers.hasOwnProperty(type))
        throw new Error(`Invalid message: no handler for type "${type}"`);
    } catch (err) {
      type = "error";
      args = [err];
    }
    handlers[type]({
      wss,
      ws,
      req,
      emit,
      join,
      leave,
      getRooms,
      type,
      args,
    });
  };
};

const onConnection = (wss) => (ws, req) => {
  console.log("!  %s", "new connection");
  wsRooms.set(ws, new Set());
  onMessage(wss, ws, req)(JSON.stringify(["connect"]));
  ws.on("close", () => {
    wsRooms.delete(ws);
    onMessage(wss, ws, req)(JSON.stringify(["disconnect"]));
  });
  ws.on("message", onMessage(wss, ws, req));
};

const wss = new WebSocket.Server({ port, clientTracking: true });

wss.on("connection", onConnection(wss));

wss.on("listening", () => {
  console.log("WebSocket server ready: localhost:" + port);
});

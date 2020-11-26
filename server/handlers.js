// -------------------------------
// UTILS: Latest messages storage
// -------------------------------

const latestMessages = new Map(); // TODO store in Redis
const LATEST_MESSAGES_COUNT = 10;
const LATEST_MESSAGES_EXPIR = 3600000; // 1 h

// Cleanup specific room
const cleanupRoomLatestMessages = (room) => {
  const messages = latestMessages.get(room);
  if (!messages) return;
  const expire = Date.now() - LATEST_MESSAGES_EXPIR;
  const withoutExpired = messages.filter((m) => m.date > expire);
  const trimmed =
    withoutExpired.length > LATEST_MESSAGES_COUNT
      ? withoutExpired.slice(0, LATEST_MESSAGES_COUNT - 1)
      : withoutExpired;
  if (trimmed.length === 0) {
    latestMessages.delete(room);
  } else if (messages.length !== trimmed.length) {
    latestMessages.set(room, trimmed);
  }
};

// Regularly cleanup latest messages
setInterval(() => {
  const rooms = latestMessages.keys();
  for (const room of rooms) {
    cleanupRoomLatestMessages(room);
  }
}, 10000);

const addToLatestMessages = (room, message) => {
  const rooms = latestMessages.get(room);
  if (!rooms) {
    latestMessages.set(room, [message]);
  } else {
    rooms.push(message);
    cleanupRoomLatestMessages(room);
  }
};

const getLatestMessages = (room) => {
  return latestMessages.get(room) || [];
};

// -------------------------------
// UTILS: Authentication storage
// -------------------------------

const wsLogins = new WeakMap();

const withLogin = (fn) => (opts) => {
  const login = wsLogins.get(opts.ws);
  fn({ ...opts, login });
};

const restricted = (fn) =>
  withLogin((opts) => {
    if (!opts.login) return opts.emit()("error", "Not logged in");
    fn(opts);
  });

// -------------------------------
// Helpers
// -------------------------------

const joinChatRoom = (room, { emit, join, login }) => {
  join(room);
  emit({ myself: false, others: true, rooms: ["system", room] })(
    "joined",
    room,
    login
  );
  emit()("joined", room, login, true);
  emit()("messages", room, getLatestMessages(room));
};

// -------------------------------
// Actual event handlers
// -------------------------------

exports.handlers = {
  // On socket connection
  connect: ({ emit }) => {
    emit()("hello");
  },

  // On socket disconnection
  disconnect: withLogin(({ emit, login }) => {
    if (login)
      emit({ myself: false, others: true, rooms: ["system"] })(
        "goodbye",
        login
      );
  }),

  // General error handler
  error: ({ emit, args: [err] }) => {
    emit("error", err.message);
  },

  // < login(username)
  // >> welcome(username, myself?)
  // >> joined(room, username, myself?)
  // > messages(room, Message[])
  login: ({ wss, ws, emit, args: [login], join }) => {
    if (typeof login !== "string")
      return emit()("error", "Invalid login @" + login);
    if (!login.match(/^[a-zA-Z0-9-_]{2,32}$/))
      return emit()(
        "error",
        `Invalid login @${login} (alphanumeric, 2-32 chars)`
      );
    let found = false;
    wss.clients.forEach((client) => {
      found = found || wsLogins.get(client) === login;
    });
    if (found) return emit()("error", "Unavailable login @" + login);
    wsLogins.set(ws, login);
    emit({ myself: false, others: true, rooms: ["system"] })("welcome", login);
    emit()("welcome", login, true);
    joinChatRoom("system", { emit, join, login });
    joinChatRoom("@" + login, { emit, join, login });
  },

  // < getLogin()
  // > your-login(username)
  getLogin: restricted(({ emit, login }) => {
    emit()("your-login", login);
  }),

  // < join(room)
  // >> joined(room, username, myself?)
  // > messages(Message[])
  join: restricted(({ emit, args: [room], getRooms, join, login }) => {
    if (typeof room !== "string")
      return emit()("error", "Invalid room (expected string)");
    if (!room.match(/^@?[a-zA-Z0-9-_]{2,32}$/))
      return emit()("error", "Invalid room (expected 2-32 alphanumeric chars)");
    if (getRooms().has(room))
      return emit()("error", "Already in room #" + room);
    joinChatRoom(room, { emit, join, login });
  }),

  // < leave(room)
  // >> left(room, username, myself?)
  leave: restricted(({ emit, args: [room], getRooms, leave, login }) => {
    if (!getRooms().has(room)) return emit()("error", "Not in room #" + room);
    leave(room);
    emit({ myself: false, others: true, rooms: ["system", room] })(
      "left",
      room,
      login
    );
    emit()("left", room, login, true);
  }),

  // < logout()
  // >> left(room, username)
  // >> goodbye(username, myself?)
  logout: restricted(({ ws, emit, getRooms, leave, login }) => {
    wsLogins.delete(ws, login);
    getRooms().forEach((room) => {
      leave(room);
      emit({ myself: false, others: true, rooms: ["system", room] })(
        "left",
        room,
        login
      );
    });
    emit({ myself: false, others: true, rooms: ["system"] })("goodbye", login);
    emit()("goodbye", login, true);
  }),

  // < message(text, room = "general")
  // >> message(Message)
  message: restricted(
    ({ emit, args: [text, room = "general"], getRooms, login }) => {
      if (!getRooms().has(room))
        return emit()("error", `Cannot post to room #${room} (not joined)`);
      const date = Date.now();
      const message = { login, text, date, room };
      emit({ myself: false, others: true, rooms: [room] })("message", message);
      emit()("message", { ...message, myself: true });
      addToLatestMessages(room, message);
    }
  ),
};

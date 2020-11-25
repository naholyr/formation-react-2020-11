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

exports.handlers = {
  connect: ({ emit }) => {
    emit()("hello");
  },
  disconnect: withLogin(({ emit, login }) => {
    if (login)
      emit({ myself: false, others: true, rooms: ["system"] })(
        "goodbye",
        login,
        false
      );
  }),
  error: ({ emit, args: [err] }) => {
    emit("error", err.message);
  },
  getLogin: restricted(({ emit, login }) => {
    emit()("your-login", login);
  }),
  join: restricted(({ emit, args: [room], getRooms, join, login }) => {
    if (typeof room !== "string")
      return emit()("error", "Invalid room (expected string)");
    if (!room.match(/^@?[a-zA-Z0-9-_]{2,32}$/))
      return emit()("error", "Invalid room (expected 2-32 alphanumeric chars)");
    if (getRooms().has(room))
      return emit()("error", "Already in room #" + room);
    join(room);
    emit({ myself: false, others: true, rooms: ["system", room] })(
      "joined",
      room,
      login,
      false
    );
    emit()("joined", room, login, true);
  }),
  leave: restricted(({ emit, args: [room], getRooms, leave, login }) => {
    if (!getRooms().has(room)) return emit()("error", "Not in room #" + room);
    leave(room);
    emit({ myself: false, others: true, rooms: ["system", room] })(
      "left",
      room,
      login,
      false
    );
    emit()("left", room, login, true);
  }),
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
    join("system");
    join("@" + login);
    emit({ myself: false, others: true, rooms: ["system"] })(
      "welcome",
      login,
      false
    );
    emit()("welcome", login, true);
    emit()("joined", "system", login, true);
    emit()("joined", "@" + login, login, true);
  },
  logout: restricted(({ ws, emit, getRooms, leave, login }) => {
    emit({ myself: true, others: true, rooms: ["system"] })(
      "goodbye",
      login,
      true
    );
    wsLogins.delete(ws, login);
    getRooms().forEach((room) => leave(room));
  }),
  message: restricted(
    ({ emit, args: [text, room = "general"], getRooms, login }) => {
      if (!getRooms().has(room))
        return emit()("error", `Cannot post to room #${room} (not joined)`);
      const date = Date.now();
      emit({ myself: false, others: true, rooms: [room] })(
        "message",
        login,
        text,
        date,
        room,
        false
      );
      emit()("message", login, text, date, room, true);
    }
  ),
};

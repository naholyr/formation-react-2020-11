export const connect = () => {
  let client = null; // WebSocket instance
  let ready = false; // Connection status
  let pendingMessages = []; // Queue messages here until ready

  // Initialize a client, update status, handle reconnection, handle events
  const initClient = () => {
    ready = false;
    client = new WebSocket("ws://localhost:" + process.env.REACT_APP_WS_PORT);

    // Message handler
    client.onmessage = (message) => {
      try {
        const [type, ...args] = JSON.parse(message.data);
        trigger(type, args);
      } catch (e) {
        trigger("error", [e]);
      }
    };

    // Connection closed: reconnect if applicable
    client.onclose = () => {
      trigger("disconnect");
      client = null;
      if (shouldReconnect) {
        trigger("reconnect");
        console.warn("Error: reconnecting...");
        setTimeout(() => initClient(), 1000);
      }
    };

    // Connection ready
    client.onopen = () => {
      trigger("connect");
      ready = true;
      pendingMessages.forEach((message) => client.send(pendingMessages));
      pendingMessages = [];
    };
  };

  const handlers = {};

  const trigger = (type, args = []) => {
    if (!handlers[type]) return false;
    handlers[type].forEach((h) => h(...args));
    return true;
  };

  const on = (type, handler) => {
    if (!handlers[type]) handlers[type] = [];
    handlers[type].push(handler);
    return () => off(type, handler);
  };

  const once = (type, handler) => {
    const onceHandler = (...args) => {
      off(type, onceHandler);
      handler(...args);
    };
    return on(type, onceHandler);
  };

  const off = (type, handler) => {
    if (!handler) {
      delete handlers[type];
      return;
    }
    if (handlers[type]) {
      handlers[type] = handlers[type].filter((h) => h !== handler);
      if (!handlers[type].length) {
        delete handlers[type];
      }
    }
  };

  let shouldReconnect = true;

  const reconnect = () => {
    shouldReconnect = true;
    if (!client) initClient();
  };

  const disconnect = () => {
    shouldReconnect = false;
    client.close();
  };

  const emit = (type, ...args) => {
    const message = JSON.stringify([type, ...args]);
    if (!client || !ready) {
      pendingMessages.push(message);
      return;
    }
    client.send(message);
  };

  // Connect now
  initClient();

  return { client, emit, on, once, off, disconnect, reconnect };
};

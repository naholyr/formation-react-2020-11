import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./ws-chat-demo";
import { createStore, compose, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { receivedMessage } from "./actions";

const logMiddleware = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

const httpMiddleware = (store) => (next) => (action) => {
  if (action.type === "HTTP") {
    /*
    store.dispatch(startWaiting());
    $.post(action.payload.url, action.payload.data(store.getState()))
      .then((data) => {
        store.dispatch(action.payload.onSuccessAction(data));
      })
      .then((err) => {
        store.dispatch(showError(err));
      });
      */
  } else {
    next(action);
  }
};

const socket = null; // TODO ws-connect

const wsMiddleware = (store) => (next) => (action) => {
  if (action.type === "WEBSOCKET") {
    const payload = action.payload(store.getState());
    socket.emit(payload.name, ...payload.args);
  } else {
    next(action);
  }
};

socket.on(
  "message",
  ({ login: username, text, date: timestamp, room, myself: isMyself }) => {
    store.dispatch(receivedMessage({ timestamp, text, username, room }));
  }
);

socket.on("messages", (messages) =>
  messages.forEach(
    ({ login: username, text, date: timestamp, room, myself: isMyself }) => {
      store.dispatch(receivedMessage({ timestamp, text, username, room }));
    }
  )
);

//const storeEnhancer = applyMiddleware(logMiddleware)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(
  applyMiddleware(logMiddleware, wsMiddleware, httpMiddleware)
);

const store = createStore(reducer, storeEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

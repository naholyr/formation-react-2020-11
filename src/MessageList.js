import "./MessageList.css";
import MessageItem from "./MessageItem";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useSelector, shallowEqual } from "react-redux";

// Lucas

const MessageList = () => {
  useLogLifecycle("MessageList");

  /*
  const messages = useSelector((appState) => appState.messages);
  const showSystemMessages = useSelector(
    (appState) => appState.showSystemMessages
  );
  */

  const [messages, showSystemMessages] = useSelector((appState) => {
    return [
      appState.messages[appState.currentRoom] || [],
      appState.showSystemMessages,
    ];
  }, shallowEqual);

  return (
    <div className="container MessageList">
      {messages.map(
        ({ timestamp, formattedTime, username, text, isRead, isSystem }) =>
          (showSystemMessages || !isSystem) && (
            <MessageItem
              key={timestamp} // unique-ish enough timestamp
              formattedTime={formattedTime}
              timestamp={timestamp}
              username={username}
              text={text}
              isRead={isRead}
              isSystem={isSystem}
            />
          )
      )}
    </div>
  );
};

export default MessageList;

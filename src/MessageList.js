import "./MessageList.css";
import MessageItem from "./MessageItem";
import { initialState } from "./store";
import { useLogLifecycle } from "./use-log-lifecycle";

// Lucas

const MessageList = () => {
  useLogLifecycle("MessageList");

  // TODO subscribe to store
  const { messages, showSystemMessages } = initialState;

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

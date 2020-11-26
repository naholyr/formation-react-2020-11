import MessageItem from "./MessageItem";

// Lucas

const MessageList = ({ items }) => {
  const styles = {
    height: "100%",
    overflow: "auto",
  };

  return (
    <div className="container" style={styles}>
      {items.map(({ date, username, text, isRead, isSystem }) => (
        <MessageItem
          key={date}
          time={date}
          userName={username}
          body={text}
          isRead={isRead}
          isSystem={isSystem}
        />
      ))}
    </div>
  );
};

export default MessageList;

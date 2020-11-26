//Damien
import "./Pagechat.css";
import RoomList from "./RoomList";
import ChatForm from "./ChatForm";
import MessageList from "./MessageList";

const PageChat = ({
  rooms,
  currentRoom,
  messages,
  onJoinRoom,
  onChangeRoom,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <RoomList
            items={rooms}
            currentRoom={currentRoom}
            onChangeRoom={onChangeRoom}
          />
        </div>
        <div className="col-lg-10 pt-3">
          <ChatForm currentRoom={currentRoom} onJoinRoom={onJoinRoom} />
          <MessageList items={messages} />
        </div>
      </div>
    </div>
  );
};

export default PageChat;

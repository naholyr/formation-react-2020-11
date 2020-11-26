//Damien
import "./Pagechat.css";
import RoomList from "./RoomList";
import ChatForm from "./ChatForm";
import MessageList from "./MessageList";

const PageChat = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <RoomList />
        </div>
        <div className="col-lg-10 pt-3">
          <ChatForm />
          <MessageList />
        </div>
      </div>
    </div>
  );
};

export default PageChat;

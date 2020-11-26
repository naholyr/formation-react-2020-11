import "./ChatForm.css";
import { initialState } from "./store";

const ChatForm = () => {
  // TODO subscribe to store
  const { currentRoom } = initialState;

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (e.target.elements.action.value) {
      case "join":
        // TODO dispatch "joinRoom"
        // TODO set select's value to "join" once selected new room
        break;
      default:
        // TODO dispatch "postMessage"
        break;
    }
    e.target.elements.message.value = "";
  };

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <div className="input-group-prepend">
        <select name="action" className="custom-select" defaultValue="post">
          <option value="post">Post to {currentRoom}</option>
          <option value="join">Join room #</option>
        </select>
      </div>
      <input name="message" type="text" className="form-control" autoFocus />
    </form>
  );
};

export default ChatForm;

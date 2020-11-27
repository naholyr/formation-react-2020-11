import "./ChatForm.css";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useDispatch } from "react-redux";
import { joinedRoom } from "./actions";
import { useSelector } from "react-redux";

const ChatForm = () => {
  useLogLifecycle("ChatForm");

  const currentRoom = useSelector((appState) => appState.currentRoom);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;

    switch (e.target.elements.action.value) {
      case "join":
        dispatch(joinedRoom("#" + message));
        e.target.elements.action.value = "post";
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

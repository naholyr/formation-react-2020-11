import "./ChatForm.css";

const ChatForm = ({ currentRoom, onJoinRoom }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.action.value === "join") {
      onJoinRoom("#" + e.target.elements.message.value);
      e.target.elements.action.value = "post";
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

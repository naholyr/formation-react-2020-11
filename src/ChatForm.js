import "./ChatForm.css";

const ChatForm = ({ currentRoom }) => {
  return (
    <form className="input-group mb-3">
      <div className="input-group-prepend">
        <select className="custom-select" defaultValue="post">
          <option value="post">Post to {currentRoom}</option>
          <option value="join">Join room #</option>
        </select>
      </div>
      <input type="text" className="form-control" autoFocus />
    </form>
  );
};

export default ChatForm;

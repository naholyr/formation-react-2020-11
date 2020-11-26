import "./ChatForm.css";

const ChatForm = ({ currentRoom }) => {
  return (
    <form className="input-group mb-3">
      <div className="input-group-prepend">
        <select className="custom-select">
          <option selected>Post to {currentRoom}</option>
          <option>Join room #</option>
        </select>
      </div>
      <input type="text" className="form-control" autoFocus />
    </form>
  );
};

export default ChatForm;

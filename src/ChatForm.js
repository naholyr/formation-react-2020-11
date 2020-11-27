import "./ChatForm.css";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useDispatch } from "react-redux";
import { joinedRoom, receivedMessage } from "./actions";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef } from "react";

const ChatForm = memo(() => {
  useLogLifecycle("ChatForm");

  const currentRoom = useSelector((appState) => appState.currentRoom);
  const username = useSelector((appState) => appState.username);

  // useEffect(() => { montage; return () => démontage }, [])
  //   → au montage et au démontage
  // useEffect(() => { update; return () => avant l'update suivant })
  //   → à chaque update
  // useEffect(() => { update; return () => avant l'update suivant }, [var1, var2])
  //   → à chaque update ssi var1 ou var2 a changé

  const canPost = currentRoom !== "(system)";

  const refSelect = useRef();
  const refMessage = useRef();
  useEffect(() => {
    if (canPost && refSelect.current) {
      refSelect.current.value = "post";
      refMessage.current.focus();
    }
  }, [
    currentRoom, // extra dependency: ensure trigger on each change of room
    canPost,
  ]);

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
        // dispatch(postMessage(message))

        // Version optimiste:
        // TODO dispatch "receivedMessage"
        dispatch(
          receivedMessage({
            timestamp: Date.now(),
            text: message,
            username,
            room: currentRoom,
          })
        );
        break;
    }
    e.target.elements.message.value = "";
  };

  const focusInput = () => {
    refMessage.current.focus();
  };

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <div className="input-group-prepend">
        <select
          ref={refSelect}
          name="action"
          className="custom-select"
          defaultValue="post"
          onChange={focusInput}
        >
          {canPost && <option value="post">Post to {currentRoom}</option>}
          <option value="join">Join room #</option>
        </select>
      </div>
      <input
        name="message"
        type="text"
        className="form-control"
        autoFocus
        ref={refMessage}
      />
    </form>
  );
});

export default ChatForm;

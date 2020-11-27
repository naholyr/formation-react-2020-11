// Clément
import "./RoomList.css";
import RoomItem from "./RoomItem";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useSelector } from "react-redux";

const RoomList = () => {
  useLogLifecycle("RoomList");

  const rooms = useSelector((appState) => appState.rooms);
  const currentRoom = useSelector((appState) => appState.currentRoom);

  return (
    <ul className="RoomList col-auto p-3 nav nav-pills flex-column">
      {rooms.map((item) => (
        <li
          className="nav-item d-flex"
          key={item.label} // no duplicate label
        >
          <RoomItem
            label={item.label}
            notif={item.notif}
            closable={item.closable}
            disabled={item.disabled}
            active={item.label === currentRoom}
          />
        </li>
      ))}
    </ul>
  );
};

export default RoomList;

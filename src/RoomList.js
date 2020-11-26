// Clément
import "./RoomList.css";
import RoomItem from "./RoomItem";

const RoomList = ({ items, currentRoom }) => {
  return (
    <ul className="RoomList col-auto p-3 nav nav-pills flex-column">
      {items.map((item) => (
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

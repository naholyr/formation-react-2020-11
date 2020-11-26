//Marwa
import "./RoomItem.css";
import cx from "classnames";

const RoomItem = ({
  label,
  closable = false,
  notif = 0,
  active = false,
  disabled = false,
}) => {
  return (
    <>
      {closable && (
        <button type="button" className="close pr-3" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}

      <button
        className={cx(
          "btn",
          { disabled, "btn-link": !active, "btn-primary": active },
          "nav-link flex-grow-1"
        )}
      >
        {label}
        {notif > 0 && (
          <span className="badge badge-primary badge-pill">{notif}</span>
        )}
      </button>
    </>
  );
};

export default RoomItem;

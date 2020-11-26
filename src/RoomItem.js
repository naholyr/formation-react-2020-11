//Marwa & Lucas
import "./RoomItem.css";
import cx from "classnames";
import { useLogLifecycle } from "./use-log-lifecycle";

const RoomItem = ({
  label,
  closable = false,
  notif = 0,
  active = false,
  disabled = false,
}) => {
  useLogLifecycle("RoomItem");

  const handleClick = (e) => {
    e.preventDefault();
    // TODO dispatch "changeRoom"
  };

  return (
    <>
      {closable && (
        <button type="button" className="close mr-3" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}

      <button
        className={cx(
          "btn",
          { disabled, "btn-link": !active, "btn-primary": active },
          "nav-link flex-grow-1 text-right"
        )}
        onClick={handleClick}
      >
        {label}
        {notif > 0 && (
          <span className="badge badge-primary badge-pill ml-3">{notif}</span>
        )}
      </button>
    </>
  );
};

export default RoomItem;

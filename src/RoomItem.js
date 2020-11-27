// Marwa & Lucas & Pascal
import "./RoomItem.css";
import cx from "classnames";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useDispatch } from "react-redux";
import { joinedRoom } from "./actions.js";
import { memo } from "react";

const RoomItem = memo(
  ({
    label,
    closable = false,
    notif = 0,
    active = false,
    disabled = false,
  }) => {
    useLogLifecycle("RoomItem");

    const dispatch = useDispatch();

    const handleClick = (e) => {
      e.preventDefault();
      dispatch(joinedRoom(label, closable));
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
  }
);

export default RoomItem;

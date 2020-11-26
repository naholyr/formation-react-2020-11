import "./MessageItem.css";
import cx from "classnames";

/* <div class="row bg-light py-2">
            <small class="col-auto text-secondary">22:41</small>
            <a href="#" title="Un autre username plus long" class="col-sm-2 text-truncate">@<strong>Un autre username
                plus long</strong></a>
            <span class="col text-wrap">Un texte très long qui devrait passer à la ligne on va voir comment ça se
              passe, ah bah ça a l'air de bien se passer</span>
          </div> */

/* <button
        className={cx("btn", { "btn-primary": active }, "nav-link flex-grow-1")}
      > */

const MessageItem = ({
  time,
  userName,
  body,
  isRead = false,
  isSystem = false,
}) => {
  return (
    <div
      className={cx(
        "row",
        "py-2",
        { "text-muted": isSystem },
        { "bg-light": !isSystem }
      )}
    >
      <small className="col-auto text-secondary">{time}</small>
      <span className="col text-wrap">
        <button
          className={cx(
            "btn btn-link",
            { "text-secondary": isSystem },
            { "text-truncate": !isSystem }
          )}
        >
          @<strong>{userName}</strong>
        </button>
        {body}
      </span>
    </div>
  );
};
export default MessageItem;

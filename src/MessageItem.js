import "./MessageItem.css";
import cx from "classnames";
import { useLogLifecycle } from "./use-log-lifecycle";

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
  timestamp,
  formattedTime,
  username,
  text,
  isRead = false,
  isSystem = false,
}) => {
  useLogLifecycle("MessageItem");

  const linkToUsername = (
    <button
      className={cx("btn btn-link text-left", {
        "text-secondary pl-0": isSystem,
        "text-truncate col-sm-2 pl-1": !isSystem,
      })}
    >
      @<strong>{username}</strong>
    </button>
  );

  return (
    <div
      className={cx("row py-2", {
        "text-muted": isSystem,
        "bg-light": !isSystem,
      })}
    >
      <time
        title={new Date(timestamp).toLocaleString()}
        className="col-auto text-secondary align-self-center"
      >
        {formattedTime}
      </time>
      {isSystem ? (
        <span className="col text-wrap align-self-left pl-1">
          {linkToUsername} {text}
        </span>
      ) : (
        <>
          {linkToUsername}
          <span className="col text-wrap align-self-center">{text}</span>
        </>
      )}
    </div>
  );
};
export default MessageItem;

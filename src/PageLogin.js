import { memo } from "react";
import LoginForm from "./LoginForm";
import RoomList from "./RoomList";
import { useLogLifecycle } from "./use-log-lifecycle";

const PageLogin = memo(() => {
  useLogLifecycle("PageLogin");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <RoomList />
        </div>
        <div className="col-lg-10 pt-3">
          <LoginForm />
        </div>
      </div>
    </div>
  );
});

export default PageLogin;

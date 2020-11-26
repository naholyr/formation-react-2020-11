import LoginForm from "./LoginForm";
import RoomList from "./RoomList";

const PageLogin = ({ rooms, currentRoom, messages, onSubmitLogin }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <RoomList
            items={[
              { label: "(system)", disabled: true },
              { label: "@username", disabled: true },
              { label: "#general", disabled: true },
            ]}
          />
        </div>
        <div className="col-lg-10 pt-3">
          <LoginForm onSubmitLogin={onSubmitLogin} />
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

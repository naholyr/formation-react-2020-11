import LoginForm from "./LoginForm";
import RoomList from "./RoomList";

const PageLogin = () => {
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

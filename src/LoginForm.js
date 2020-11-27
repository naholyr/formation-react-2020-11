import { authLogin, joinedRoom } from "./actions";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  useLogLifecycle("LoginForm");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO dispatch action "login"
    dispatch(authLogin(e.target.elements.username.value));
    dispatch(joinedRoom("(system)", false));
    dispatch(joinedRoom("#@" + e.target.elements.username.value));
    dispatch(joinedRoom("#general"));
  };

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <div className="input-group-prepend">
        <label className="input-group-text">@</label>
      </div>
      <input
        type="text"
        name="username"
        className="form-control"
        placeholder="username"
        defaultValue=""
        aria-label="Username"
        autoFocus
      />
    </form>
  );
};

export default LoginForm;

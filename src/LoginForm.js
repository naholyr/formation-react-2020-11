const LoginForm = ({ currentRoom }) => {
  return (
    <form
      className="input-group mb-3"
      onsubmit="document.querySelector('#step-1').style.display='none'; document.querySelector('#step-2').style.display=''; document.querySelector('#step-2 input').focus(); return false;"
    >
      <div className="input-group-prepend">
        <label className="input-group-text">@</label>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="username"
        aria-label="Username"
        autoFocus
      />
    </form>
  );
};

export default LoginForm;

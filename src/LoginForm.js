const LoginForm = ({ onSubmitLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.username.value);
    onSubmitLogin(e.target.elements.username.value);
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

const Header = ({ username }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="btn btn-link navbar-brand">#Awesome</button>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <button className="btn btn-link nav-link">
              Chat <span className="sr-only">(current)</span>
            </button>
          </li>
          <li className="nav-item disabled">
            <button className="btn btn-link nav-link">
              Incoming awesome feature…
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

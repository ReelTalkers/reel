var React = require('react');

class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/assets/navbar-logo.png" alt="Reeltalk"/>
          </a>
        </div>
        <div className="search-bar">
          <input type="text" name="search-bar" placeholder="Search"/>
          <div className="placeholder">
            <img src="/assets/search.png" alt="Search"/>
            <span className="text">Search</span>
          </div>
        </div>
        <div className="user-name">
          andrew
        </div>
      </div>
    );
  }
}

export default Navbar;

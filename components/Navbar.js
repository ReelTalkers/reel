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
        </div>
        <div className="user-name">
          andrew
        </div>
      </div>
    );
  }
}

export default Navbar;

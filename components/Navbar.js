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
            <a>
              <img src="/assets/search.png" alt="Search"/>
            </a>
          <input type="text" name="search-bar" placeholder="Search..."/>
        </div>
        <div className="user-name">
          andrew
        </div>
      </div>
    );
  }
}

export default Navbar;

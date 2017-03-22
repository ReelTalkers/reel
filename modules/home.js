var React = require('react');

import Lolomo from '../components/Lolomo.js';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home">
        <div>Welcome to Reeltalk, {this.props.name}!</div>
        <Lolomo />
      </div>
    );
  }
}

export default Home;

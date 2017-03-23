var React = require('react');

import Lolomo from '../components/Lolomo.js';
import Group from '../components/Group.js';
import Navbar from '../components/Navbar.js';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home">
        <Navbar/>
        <Group user_picture={this.props.user_picture}/>
        <Lolomo />
      </div>
    );
  }
}

export default Home;

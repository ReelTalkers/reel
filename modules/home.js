var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Lolomo from '../components/Lolomo.js';
import Group from '../components/Group.js';
import Navbar from '../components/Navbar.js';

import recommendations from '../testing/dummy_data.js';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    // fake query for now
    const fakeProps = {
      "data": JSON.parse(recommendations)
    };
    return (
      <div className="home">
        <Navbar/>
        <Group user_picture={this.props.user_picture}/>
        <Lolomo recommendations={fakeProps.data.recommendations}/>
      </div>
    );
  }
}

export default Home;

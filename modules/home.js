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
    this.state = {
      searchForUsers: false,
      searchBarActive: false
    }
  }

  componentWillMount() {
    this.state = {
      groupMembers: this.props.groupMembers,
    }
  }

  searchUsers() {
    this.setState({
      searchForUsers: true,
      searchBarActive: true,
      lastClick: "users"
    });
  }

  clickBackground() {
    if (this.state.lastClick == "users") {
      this.setState({
        searchForUsers: false,
        searchBarActive: false,
        lastClick: "background"
      })
    }
  }

  addUserToGroup(userId) {
    this.props.addUserToGroup(userId).then(response => {
      this.setState({
        groupMembers: response.data.addUserToGroup
      });
    });
  }

  render() {
    // fake query for now
    const fakeProps = {
      "data": JSON.parse(recommendations)
    };
    return (
      <div onClick={() => this.clickBackground()} className="home">
        <Navbar
          searchForUsers={this.state.searchForUsers}
          searchBarActive={this.state.searchBarActive}
          addUserToGroup={this.addUserToGroup.bind(this)}/>
        <Group
          searchUsers={this.searchUsers.bind(this)}
          user_picture={this.props.user_picture}
          groupMembers={this.state.groupMembers}
        />
        <Lolomo recommendations={fakeProps.data.recommendations}/>
      </div>
    );
  }
}

const addUserToGroup = gql`
  mutation addUserToGroup($id: ID!) {
    addUserToGroup(id: $id) {
      id,
      smallPhoto
    }
  }
`;

const HomeWithData = graphql(addUserToGroup, {
  props: ({ mutate }) => ({
    addUserToGroup: (id) => mutate({ variables: { id } }),
  }),
})(Home);

export default HomeWithData;

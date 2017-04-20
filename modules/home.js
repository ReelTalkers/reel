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
    return (
      <div onClick={() => this.clickBackground()} className="home">
        <Navbar
          searchForUsers={this.state.searchForUsers}
          searchBarActive={this.state.searchBarActive}
          addUserToGroup={this.addUserToGroup.bind(this)}
          fullName={this.props.fullName}
        />
        <Group
          searchUsers={this.searchUsers.bind(this)}
          userPicture={this.props.userPicture}
          groupMembers={this.state.groupMembers}
        />
        <RecommendationsWithData
          groupMembersIds={this.state.groupMembers.map(user => user.id)}
          genres={["Top", "Comedy", "Drama"]}
        />
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

class Recommendations extends React.Component {
  render() {
    if (this.props.data.loading) {
      // loading
      return (<div>Loading</div>)
    } else if (this.props.data.error) {
      // error
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <Lolomo recommendations={this.props.data.recommendations}/>
    )
  }
}

Recommendations.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
  }).isRequired,
};

const RecommendationsQuery = gql`
  query RecommendationsQuery($groupMembersIds: [ID]!, $genres: [String]!) {
    recommendations(userIds: $groupMembersIds, genres: $genres, quantity: 10) {
      name,
      media {
        id,
        poster_path
      }
    }
  }
`

const RecommendationsWithData = graphql(RecommendationsQuery, {
    options: ({ groupMembersIds, genres }) => ({ variables: { groupMembersIds, genres } }),
})(Recommendations);

export default HomeWithData;

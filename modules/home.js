var React = require('react');
import { graphql, compose } from 'react-apollo';
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

  removeUserFromGroup(userId) {
    this.props.removeUserFromGroup(userId).then(response => {
      this.setState({
        groupMembers: response.data.removeUserFromGroup
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
          fullName={this.props.fullName}
          groupMembers={this.state.groupMembers}
          removeUserFromGroup={this.removeUserFromGroup.bind(this)}
        />
        <RecommendationsWithData
          groupMembersIds={this.state.groupMembers.map(user => user.id)}
          genres={["Top", "Comedy", "Drama", "Documentary", "Action", "Romance", "Thriller", "Adventure", "Animation"]}
        />
      </div>
    );
  }
}

const addUserToGroup = gql`
  mutation addUserToGroup($id: ID!) {
    addUserToGroup(id: $id) {
      id,
      fullName,
      smallPhoto
    }
  }
`;

const removeUserFromGroup = gql`
  mutation removeUserFromGroup($id: ID!) {
    removeUserFromGroup(id: $id) {
      id,
      fullName,
      smallPhoto
    }
  }
`;

const HomeWithMutations = compose(
  graphql(addUserToGroup, {
    props: ({ mutate }) => ({
      addUserToGroup: (id) => mutate({ variables: { id } }),
    }),
  }),
  graphql(removeUserFromGroup, {
    props: ({ mutate }) => ({
      removeUserFromGroup: (id) => mutate({ variables: { id } }),
    }),
  })
)(Home);

class Recommendations extends React.Component {
  render() {
    if (this.props.data.loading) {
      // loading
      return (
        <div className="recommendations-loading">
          <img src="/assets/Loading.svg"/>
        </div>)
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
    recommendations(userIds: $groupMembersIds, genres: $genres, minYear: 2010, quantity: 20) {
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

export default HomeWithMutations;

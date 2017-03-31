var React = require('react');
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.data.loading) {
      // loading
      return (<div></div>)
    }

    if (this.props.data.error) {
      // error
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    console.log(this.props.data);

    // fetch('http://localhost:3000/').then(response => console.log(response));
    // if this.props.loggedIn: home, if not: welcome
    return(
      <div>
        {this.props.data.logged_in.toString()}
        <a href="http://localhost:3000/auth/facebook">test</a>
      </div>
    );
  }
}

Welcome.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    logged_in: React.PropTypes.bool,
  }).isRequired,
};

const LoggedInQuery = gql`
  query LoggedInQuery {
    logged_in
  }
`

const WelcomeWithData = graphql(LoggedInQuery)(Welcome)

export default WelcomeWithData;

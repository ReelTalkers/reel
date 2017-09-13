var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Home from './home.js';

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

    if (this.props.data.logged_in) {
      return(
        <Home
          fullName={this.props.data.current_user.fullName}
          userPicture={this.props.data.current_user.smallPhoto}
          groupMembers={this.props.data.current_user.groupMembers}/>
      );
    }
    return(
      <div className="welcome">
        <div className="background"></div>
        <div className="content">
          <div className="logo">
            <img src="./assets/Reels.png" alt="loading logo"/>
          </div>
          <div className="tag-line">
            Stop arguing. Start watching.
          </div>
          <button className="login-button" onClick={() => location.href="http://reeltalk.student.cwru.edu:3000/auth/facebook"}>
            <div className="container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">
                <path fill="#ffffff" d="
                  M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
                  11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
                  11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
                  15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
                  11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path>
              </svg>
              Log in with Facebook
            </div>
          </button>
        </div>
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

const CurrentUserQuery = gql`
  query CurrentUserQuery {
    logged_in,
    current_user {
      fullName,
      smallPhoto,
      groupMembers {
        id,
        smallPhoto
      }
    }
  }
`

const WelcomeWithData = graphql(CurrentUserQuery)(Welcome)

export default WelcomeWithData;

import React from 'react';
import ReactDOM from 'react-dom';
import {APP_ID} from '../keys';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseStatus: null,
    }
  };

  componentWillMount() {
    window.fbAsyncInit = function() {
        FB.init({
          appId      : APP_ID,
          cookie     : true,
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use version 2.8
        });

        FB.getLoginStatus(function(response) {
          this.statusChangeCallback(response);
        }.bind(this));
      }.bind(this);
    this.loadSdkAsynchronously();
  };

  loadSdkAsynchronously() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };

  statusChangeCallback(response) {
    // We don't immidietly call setState because if the user is logged in
    // then we want to get their info before we re-render. Otherwise we may
    // see results load and then info fill in
    this.state = {
      responseStatus: response.status
    }
    if (response.status === 'connected') {
      // if the user is logged in then fetch data about them
      this.fetchUser(response.authResponse);
    } else if (response.status) {
      // if the user is not logged in then we don't fetch any data on them
      this.setState({});
    }
  };

  fetchUser(authResponse) {
    window.FB.api('/me', { fields: 'name,email,picture' }, (me) => {
      Object.assign(me, authResponse);
      this.responseFacebook(me);
    });
  };

  responseFacebook(response) {
    console.log(response);
    // We will just store everything in the state for now until we decide what
    // we want to use
    this.setState({
      loggedIn: true,
      accessToken: response.accessToken,
      email: response.email,
      expiresIn: response.expiresIn,
      id: response.id,
      name: response.name,
      picture: response.picture,
      signedRequest: response.signedRequest,
      userID: response.userID,
    });
  };

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  };

  handleClick() {
    FB.login(this.checkLoginState());
  };

  render() {
    // If we haven't got a response from facebook yet, show nothing
    if ( !this.state.responseStatus ) {
      return (
        <div>
        </div>
      );
    } else {
      // once we have a response, show the main page if they are logged in, or
      // the login page if they are not
      return (
        <div>
          { this.state.responseStatus == "connected"? (
              "Welcome to Reeltalk, "+this.state.name+"!"
            ) : (
              <a href="#" onClick={this.handleClick.bind(this)}>Login</a>
            )
          }
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

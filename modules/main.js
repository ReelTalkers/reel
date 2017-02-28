import React from 'react';
import ReactDOM from 'react-dom';
// import FacebookLogin from 'react-facebook-login';
import {FacebookLogin} from '../mixins/FacebookLogin.js';
import {APP_ID} from '../keys';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      responseStatus: null,
    }
  };

  componentWillMount() {
    window.fbAsyncInit = function() {
        FB.init({
          appId      : APP_ID,
          cookie     : true,  // enable cookies to allow the server to access
                            // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use version 2.1
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
    this.state = {
      responseStatus: response.status
    }
    if (response.status === 'connected') {
      this.fetchUser(response.authResponse);
    }
  };

  responseFacebook(response) {
    console.log(response);
    this.setState({
      loggedIn: true,
      // accessToken: response.accessToken,
      // email: response.email,
      // expiresIn: response.expiresIn,
      // id: response.id,
      name: response.name,
      // picture: response.picture,
      // signedRequest: response.signedRequest,
      // userID: response.userID,
    });
  };

  fetchUser(authResponse) {
    window.FB.api('/me', { fields: 'name,email,picture' }, (me) => {
      Object.assign(me, authResponse);
      this.responseFacebook(me);
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
    if ( !this.state.responseStatus ) {
      return (
        <div>
        </div>
      );
    } else {

    }
    return (
      <div>
        { this.state.responseStatus == "connected"? (
            "Welcome to Reeltalk, "+this.state.name+"!"
          ) : (
            <a href="#" onClick={this.handleClick.bind(this)}>Login</a>
          )
        }
        {/* { this.state.loggedIn ? (
          <h1>Welcome to Reeltalk, {this.state.name}!</h1>
        ) : (
          <FacebookLogin
            appId={APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            cssClass="fb-login"
            textButton="Sign in with Facebook"
            callback={this.responseFacebook.bind(this)} />
        )} */}
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

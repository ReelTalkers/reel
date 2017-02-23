import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import {APP_ID} from '../keys';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      email: null,
      expiresIn: null,
      id: null,
      name: null,
      picture: null,
      signedRequest: null,
      userID: null,
    }
  };

  responseFacebook(response) {
    console.log(response);
    this.setState({
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

  render() {
    if (this.state.name) {
      return (
        <div>
          <h1>Welcome to Reeltalk, {this.state.name}!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <FacebookLogin
            appId={APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            cssClass="fb-login"
            textButton="Sign in with Facebook"
            callback={this.responseFacebook.bind(this)} />
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

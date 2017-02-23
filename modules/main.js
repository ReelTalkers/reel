import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import {APP_ID} from '../keys';

const responseFacebook = (response) => {
  console.log(response);
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <h1>Welcome to Reeltalk!</h1>
        <FacebookLogin
          appId={APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook} />
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

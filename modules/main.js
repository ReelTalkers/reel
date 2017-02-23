import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

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
          appId="askandrew"
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

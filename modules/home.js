var React = require('react');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Reeltalk",
    };
  }

  render() {
    return (
      <h1>Welcome to {this.state.name}!</h1>
    );
  }
}

export default Home;

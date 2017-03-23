var React = require('react');

class Group extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="group">
        <div className="round-image-wrapper">
          <img src={this.props.user_picture.data.url}/>
        </div>
        <div className="group-name">You</div>
      </div>
    );
  }
}

export default Group;

var React = require('react');

class Group extends React.Component {
  constructor() {
    super();
  }
// Make profile photo its own react class
// make circle its own react class
  render() {
    return (
      <div className="group">
        <div className="photos">
          <div className="round-image-wrapper">
            <img src={this.props.user_picture.data.url}/>
          </div>
          <div className="add">
            <div className="plus"></div>
          </div>
        </div>
        <div className="group-name">You</div>
      </div>
    );
  }
}

export default Group;

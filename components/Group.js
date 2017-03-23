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
          <CircularPhoto photo_url={this.props.user_picture.data.url}/>
          <AddButton/>
        </div>
        <div className="group-name">You</div>
      </div>
    );
  }
}

class CircularPhoto extends React.Component {
  render() {
    return (
      <div className="circular-photo">
        <img src={this.props.photo_url}/>
      </div>
    );
  }
}

class AddButton extends React.Component {
  render() {
    return (
      <div className="add">
        <div className="plus"></div>
      </div>
    );
  }
}

export default Group;

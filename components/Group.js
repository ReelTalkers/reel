var React = require('react');

class Group extends React.Component {
  constructor() {
    super();
  }
// Make profile photo its own react class
// make circle its own react class
  render() {
    const groupName = this.props.groupMembers.length > 0? "You & Friends" : "You";
    return (
      <div className="group">
        <div className="circles">
          <div className="photos">
            <CircularPhoto photo_url={this.props.user_picture}/>
            {this.props.groupMembers.map(groupMember => (
              <CircularPhoto key={groupMember.id} photo_url={groupMember.smallPhoto}/>
            ))}
          </div>
          <AddButton onClick={() => this.props.searchUsers()}/>
        </div>
        <div className="group-name">{groupName}</div>
      </div>
    );
  }
}

class CircularPhoto extends React.Component {
  render() {
    return (
      <div className="circular-photo">
        <div className="inner-circle">
          <img src={this.props.photo_url}/>
        </div>
      </div>
    );
  }
}

class AddButton extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.onClick() } className="add">
        <div className="plus"></div>
      </div>
    );
  }
}

export default Group;

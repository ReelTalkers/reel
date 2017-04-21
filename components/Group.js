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
            <CircularPhoto
              photo_url={this.props.userPicture}
              removeUserFromGroup={() => null}/>
            {this.props.groupMembers.map(groupMember => (
              <CircularPhoto
                key={groupMember.id}
                userId={groupMember.id}
                className="group-member"
                photo_url={groupMember.smallPhoto}
                removeUserFromGroup={this.props.removeUserFromGroup}/>
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
      <div
        onClick={() => this.props.removeUserFromGroup(this.props.userId)}
        className={"circular-photo "+this.props.className}>
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

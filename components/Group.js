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
        <div className="circles">
          <CircularPhoto photo_url={this.props.user_picture}/>
          <CircularPhoto photo_url="https://lh3.googleusercontent.com/-R9i1ENT-FLM/AAAAAAAAAAI/AAAAAAAAADA/c9MxnVlrYGs/photo.jpg"/>
          <CircularPhoto photo_url="https://www.wired.com/wp-content/uploads/2016/02/KanyeWest-42-69483240.jpg"/>
          <AddButton/>
        </div>
        <div className="group-name">You & Friends</div>
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
      <div className="add">
        <div className="plus"></div>
      </div>
    );
  }
}

export default Group;

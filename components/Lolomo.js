var React = require('react');

class Lolomo extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="lolomo">
        <Lomo title="Top Picks"/>
        <Lomo title="Comedy"/>
        <Lomo title="Drama"/>
      </div>
    );
  }
}

class Lomo extends React.Component {
  render() {
    return (
      <div className="lomo">
        <div className="title">{this.props.title}</div>
        <div className="movies">
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
          <Movie/>
        </div>
      </div>
    );
  }
}

class Movie extends React.Component {
  render() {
    return (
      <div className="movie">

      </div>
    );
  }
}

export default Lolomo;

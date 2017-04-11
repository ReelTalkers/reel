var React = require('react');

class Lolomo extends React.Component {
  render() {
    return (
      <div className="lolomo">
        {this.props.recommendations.map(genre =>
          <Lomo
            key={genre.genre}
            title={genre.genre}
            movies={genre.media}
          />
        )}
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
          {this.props.movies.map(movie =>
            <Movie
              // TODO: change the key to be the movie.id
              key={movie.poster_path}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          )}
        </div>
      </div>
    );
  }
}

// I think have an onclick here that outlines the movie and calls a callback to lomo
// that puts the detail below the lomo
class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    }
  }

  toggleActive() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + this.props.poster_path;
    return (
      <div onClick={() => this.toggleActive()} className={"movie"+ (this.state.isActive? " active" : "")}>
        <img src={poster_url}/>
      </div>
    );
  }
}

export default Lolomo;

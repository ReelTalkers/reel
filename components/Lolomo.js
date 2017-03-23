var React = require('react');

import genres from '../testing/dummy_data.js';

class Lolomo extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: JSON.parse(genres)
    }
  }

  render() {
    return (
      <div className="lolomo">
        {this.state.genres.map(genre =>
          <Lomo
            key={genre.title}
            title={genre.title}
            movies={genre.movies}
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
              key={movie.poster_path}
              poster_path={movie.poster_path}
            />
          )}
        </div>
      </div>
    );
  }
}

class Movie extends React.Component {
  render() {
    const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + this.props.poster_path;
    return (
      <div className="movie">
        <img src={poster_url}/>
      </div>
    );
  }
}

export default Lolomo;

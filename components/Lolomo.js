var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
  constructor() {
    super();
    this.state = {
      movieSelected: false,
      movieSelectedId: null,
    }
  }

  showMovie(id) {
    this.setState({
      movieSelected: true,
      movieSelectedId: id
    })
  }

  stopShowingMovie(id) {
    if (this.state.movieSelectedId !== id) {
      throw "Error, "+id+" was not selected before deselection";
    } else {
      this.setState({
        movieSelected: false,
        movieSelectedId: null
      })
    }
  }

  render() {
    const movieDetail = this.state.movieSelected?
      <MovieDetailWithData id={this.state.movieSelectedId}/> :
      "";
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
              showMovie={this.showMovie.bind(this)}
              stopShowingMovie={this.stopShowingMovie.bind(this)}
            />
          )}
        </div>
        <div>
          {movieDetail}
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
    if (this.state.isActive) {
      this.props.stopShowingMovie(this.props.id);
    } else {
      this.props.showMovie(this.props.id);
    }
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

class MovieDetail extends React.Component {
  render() {
    if (this.props.data.loading) {
      // loading
      return (<div></div>)
    } else if (this.props.data.error) {
      // error
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div clasName="movie-detail">
        <div className="poster"></div>
        <div className="info">
          <div className="title">
            {this.props.data.media.title}
          </div>
          <div className="tabs"></div>
          <div className="description">
            {this.props.data.media.overview}
          </div>
        </div>
      </div>
    )
  }
}

MovieDetail.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
  }).isRequired,
};

const MovieDetailQuery = gql`
  query MovieDetailQuery($id: String!) {
    media(id: $id) {
      overview,
      title,
    }
  }
`

const MovieDetailWithData = graphql(MovieDetailQuery, {
    options: ({ id }) => ({ variables: { id } }),
})(MovieDetail);

export default Lolomo;

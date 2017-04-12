var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Lolomo extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLomo: null,
      disableSelectedLomo: (() => null)
    }
  }

  enableActiveDetail(genre, disable) {
    this.disableActiveDetail(genre);
    this.setState({
      selectedLomo: genre,
      disableSelectedLomo: (() => disable())
    })
  }

  disableActiveDetail(genre) {
    if (this.state.selectedLomo != genre) {
      this.state.disableSelectedLomo();
    }
    this.setState({
      selectedLomo: null,
      disableSelectedLomo: (() => null)
    });
  }

  render() {
    return (
      <div className="lolomo">
        {this.props.recommendations.map(genre =>
          <Lomo
            key={genre.genre}
            title={genre.genre}
            movies={genre.media}
            enableActiveDetail={this.enableActiveDetail.bind(this)}
            disableActiveDetail={this.disableActiveDetail.bind(this)}
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
      isActive: false,
      selectedMovie: null,
      disableSelectedMovie: (() => null)
    }
  }

  enableDetail(id, disable) {
    this.disableDetail(id);
    this.props.enableActiveDetail(this.props.title, this.disableDetail.bind(this));

    this.setState({
      isActive: true,
      selectedMovie: id,
      disableSelectedMovie: (() => disable())
    });
  }

  disableDetail(id) {
    if (this.state.selectedMovie != id) {
      this.state.disableSelectedMovie();
    }
    this.props.disableActiveDetail(this.props.title);

    this.setState({
      isActive: false,
      selectedMovie: null,
      disableSelectedMovie: (() => null)
    });
  }

  render() {
    const movieDetail = this.state.isActive?
      <MovieDetailWithData id={this.state.selectedMovie}/> :
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
              enableDetail={this.enableDetail.bind(this)}
              disableDetail={this.disableDetail.bind(this)}
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
      this.props.disableDetail(this.props.id);
    } else {
      this.props.enableDetail(this.props.id, this.toggleActive.bind(this));
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

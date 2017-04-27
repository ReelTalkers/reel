var React = require('react');
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Rating from './Rating';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'overview',
    }
  }

  componentDidMount() {
    this.ensureVisible();
  }

  ensureVisible() {
    const movieDetail = ReactDOM.findDOMNode(this);
    var top = movieDetail.offsetTop - ( window.innerHeight / 2 ) + (movieDetail.offsetHeight / 2);
    window.scrollTo(0, top)
  }

  getTab(selectedTab) {
    // use if statement instead of dictionary so we only render if necessary
    if (selectedTab == 'overview') {
      return <Overview
        directors={this.props.data.media.directors.map(director => director.person.name)}
        cast={this.props.data.media.cast.map(castMember => castMember.person.name)}
        mediaID={this.props.id}
        description={this.props.data.media.overview}/>
    } else if (selectedTab == 'similar') {
      return <SimilarWithData mediaId={this.props.id} />
    } else if (selectedTab == 'cast') {
      return <Cast />
    }
  }

  close() {
    this.props.close();
  }

  updateScore(movieId, score) {
    return this.props.submitRating(movieId, score).then(response => {
      this.setState({
        score: response.data.reviewMedia.score
      });
    });
  }

  render() {
    if (this.props.data.loading) {
      // loading
      return (
        <div className="movie-detail-loading">
          <img src="/assets/Loading.svg"/>
        </div>
      )
    } else if (this.props.data.error) {
      // error
      return (<div>An unexpected error occurred</div>)
    }

    const tabs = ['overview', 'similar', 'cast'];
    const tabComponent = this.getTab(this.state.selectedTab, this.props.data.media);
    const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + this.props.data.media.poster_path;

    const score = this.props.data.media.review?
      this.props.data.media.review.score:
      null;

    return (
      <div className="movie-detail">
        <div onClick={() => this.close()}className="close-button">
          ×
        </div>
        <div className="poster">
          <img src={poster_url} className="poster"/>
          <Rating
            score={score}
            onClick={(score) => this.updateScore(this.props.id, score)}/>
        </div>
        <div className="info">
          <div className="title">
            {this.props.data.media.title}
          </div>
          <div className="tabs">
            {tabs.map(tab => (
              <div
                key={tab}
                className={this.state.selectedTab==tab? "selected" : ""}
                onClick={() => this.setState({selectedTab: tab})}>
                {tab.toUpperCase()}
              </div>
            ))}
          </div>
          {tabComponent}
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
      id,
      overview,
      title,
      poster_path,
      review {
        id,
        score
      },
      directors {
        person {
          name
        }
      },
      cast(limit:5) {
        person {
          name
        }
      }
    }
  }
`

const submitRating = gql`
  mutation reviewMedia($mediaId: ID!, $score: Int!) {
    reviewMedia(mediaId: $mediaId, score: $score) {
      id,
      review {
        id,
        score
      }
    }
  }
`;

const MovieDetailWithData = compose(
  graphql(submitRating, {
    props: ({ mutate }) => ({
      submitRating: (mediaId, score) => mutate({
        variables: { mediaId, score },
        optimisticResponse: {
          __typename: 'Mutation',
          reviewMedia: {
            __typename: 'Media',
            id: mediaId,
            review: {
              __typename: 'Review',
              id: 1,
              score: score,
            }
          }
        }
      }),
    }),
  }),
  graphql(MovieDetailQuery, {
      options: ({ id }) => ({ variables: { id } }),
  })
)(MovieDetail);

class Overview extends React.Component {
  render() {
    const additionalInfo = [
      ["Available On", "Netflix"],
      ["Director", this.props.directors.join(", ")],
      ["Starring", this.props.cast.join(", ")],
    ]
    return (
      <div>
        <div className="description">
          {this.props.description}
        </div>
        <div className="additional-info">
          {additionalInfo.map(info => (
            <div key={info[0]} className="section">
              <div className="label">{info[0]}: </div>
              <div className="list">{info[1]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class Similar extends React.Component {
  render() {
    if (this.props.data.loading) {
      // loading
      return (
        <div className="similar loading">
          <img src="/assets/Loading.svg"/>
        </div>
      )
    } else if (this.props.data.error) {
      // error
      return (<div>An unexpected error occurred</div>)
    }

    // TODO: Should make lolomo more importable and use it here
    return (
      <div className="similar">
        <div className="movies">
          {this.props.data.media.similar_media.map(movie => {
            const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movie.poster_path;
            return (
              <div
                key={movie.id}
                className="movie">
                <img src={poster_url}/>
              </div>
            )
          })}
        </div>
      </div>
    )
    return (
      <div>
        Some similar stuff
      </div>
    );
  }
}

Similar.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
  }).isRequired,
};

const SimilarQuery = gql`
  query SimilarQuery($mediaId: String!) {
    media(id: $mediaId) {
      id,
      similar_media(quantity: 10) {
        id,
        poster_path
      }
    }
  }
`

const SimilarWithData = graphql(SimilarQuery, {
  options: ({ mediaId }) => ({ variables: { mediaId } }),
})(Similar);

class Cast extends React.Component {
  render() {
    return (
      <div className="cast-list">
            <Actor
            actorPhoto="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg/220px-Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg"
            actorName="kanyeezy"
            actorRole="yeezus"/>

            <Actor
            actorPhoto="smile.png"
            actorName="poop"
            actorRole="mrpoopyface"/>

            <Actor
            actorPhoto="smile.png"
            actorName="poop"
            actorRole="mrpoopyface"/>

            <Actor
            actorPhoto="smile.png"
            actorName="poop"
            actorRole="mrpoopyface"/>
      </div>
    );
  }
}

class Actor extends React.Component {
  render() {
    return (
      <div className="actor-view">
          <div className="actor-photo">
            <img src={this.props.actorPhoto}/>
          </div>
          <div className="actor-name">
            {this.props.actorName}
          </div>
          <div className="spacer">
            as
          </div>
          <div className="actor-role">
            {this.props.actorRole}
          </div>
        </div>
    );
  }
}


export default MovieDetailWithData;

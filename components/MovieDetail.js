var React = require('react');
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Rating from './Rating';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      display: true,
      selectedTab: 'overview',
      score: null,
    }
  }

  componentWillMount() {
    // TODO this is bad, the state should be lifted
    if (!this.props.data.media) {
      return;
    }
    const score = this.props.data.media.review?
      this.props.data.media.review.score:
      null;
    this.state = {
      score: score
    };
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
      return <Similar />
    } else if (selectedTab == 'cast') {
      return <Cast />
    }
  }

  close() {
    if (this.props.close) {
      this.props.close();
    }
    this.setState({
      display: false
    });
  }

  updateScore(movieId, score) {
    this.props.submitRating(movieId, score).then(response => {
      this.setState({
        score: response.data.reviewMedia.score
      });
    });
  }

  render() {
    if (!this.state.display) {
      return (<div></div>)
    }
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
      submitRating: (mediaId, score) => mutate({ variables: { mediaId, score } }),
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
    return (
      <div>
        Some similar stuff
      </div>
    );
  }
}

class Cast extends React.Component {
  render() {
    return (
      <div className="cast_list">
        <div className="actorPicture">
          <img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiS5pWby7PTAhVJ74MKHWMRBZsQjRwIBw&url=http%3A%2F%2Fmuppet.wikia.com%2Fwiki%2FBig_Bird&psig=AFQjCNFLc3Lk-L93QxvnqQxtUzRd5iCN0Q&ust=1492796700698567"/>
        </div>
        <div className="actorName">
          Pappa John
        </div>
      </div>
    );
  }
}


export default MovieDetailWithData;

var React = require('react');
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
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

  componentDidUpdate() {
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
    } else {
      return <Cast />
    }
  }

  render() {
    if (this.props.data.loading) {
      // loading
      return (<div></div>)
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
        <div className="poster">
          <img src={poster_url} className="poster"/>
          <Rating score={score} mediaID={this.props.id}/>
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
      overview,
      title,
      poster_path,
      review {
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

const MovieDetailWithData = graphql(MovieDetailQuery, {
    options: ({ id }) => ({ variables: { id } }),
})(MovieDetail);

class Overview extends React.Component {
  render() {
    const additionalInfo = [
      ["Available On", "Netflix"],
      ["Director", this.props.directors],
      ["Starring", this.props.cast.join(", ")],
    ]
    console.log(this.props.directors)
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
      <div>
        Some cast stuff
      </div>
    );
  }
}


export default MovieDetailWithData;

var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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


export default MovieDetailWithData;

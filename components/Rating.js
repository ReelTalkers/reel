import React, { Component, PropTypes } from 'react';
import { gql, graphql } from 'react-apollo';

class Rating extends Component {
  score(score) {
    this.props.submit(this.props.mediaID, score);
  }

  render() {
    const scores = [1,2,3,4,5];
    return (
      <div>
        {scores.map(score => (
          <button key={score} onClick={() => this.score(score)}>{score}</button>
        ))}
      </div>
    );
  }
}

const submitRating = gql`
  mutation createReview($mediaId: ID!, $score: Int!) {
    createReview(userId: "1", mediaId: $mediaId, score: $score) {
      id
    }
  }
`;

const RatingWithData = graphql(submitRating, {
  props: ({ mutate }) => ({
    submit: (mediaId, score) => mutate({ variables: { mediaId, score } }),
  }),
})(Rating);

export default RatingWithData;

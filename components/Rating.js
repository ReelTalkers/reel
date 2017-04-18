import React, { Component, PropTypes } from 'react';
import { gql, graphql } from 'react-apollo';

class Rating extends Component {
  score(score) {
    this.props.submit(this.props.mediaID, score);
  }

  renderButton(word, score) {
    return (
      <button
        key={score}
        className={"reaction-"+score}
        onClick={() => this.score(score)}>
        <span className="legend">
          {word}
        </span>
      </button>
    );
  }

  render() {
    const scores = [1,2,3,4,5];
    const reactions = [
      { word: "Terrible", score: 1 },
      { word: "Bad", score: 2 },
      { word: "Ok", score: 3 },
      { word: "Good", score: 4 },
      { word: "Fantastic", score: 5 },
    ];
    return (
      <div className="rating">
        <div className="toolbox">
          {reactions.map(reaction => (
            this.renderButton(reaction.word, reaction.score)
          ))}
        </div>
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

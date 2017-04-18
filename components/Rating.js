import React, { Component, PropTypes } from 'react';
import { gql, graphql } from 'react-apollo';

class Rating extends Component {
  componentWillMount() {
    this.state = {
      score: this.props.score,
    }
  }

  score(score) {
    this.props.submit(this.props.mediaID, score);
    this.setState({
      score: score
    });
  }

  renderButton(word, score, selectedScore) {
    var selected = "";
    if (selectedScore != null) {
      selected = selectedScore == score? " selected" : " not-selected";
    }

    return (
      <button
        key={score}
        className={"reaction-"+score+selected}
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
            this.renderButton(reaction.word, reaction.score, this.state.score)
          ))}
        </div>
      </div>
    );
  }
}

const submitRating = gql`
  mutation reviewMedia($mediaId: ID!, $score: Int!) {
    reviewMedia(userId: "1", mediaId: $mediaId, score: $score) {
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

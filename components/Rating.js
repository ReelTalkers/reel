import React, { Component, PropTypes } from 'react';
import { gql, graphql } from 'react-apollo';

class Rating extends Component {
  constructor() {
    super();
    this.state = {
      selecting: true,
    }
  }

  onClick(score) {
    this.props.onClick(score);
    this.setState({rating: false})
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
        onClick={() => this.onClick(score)}>
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

    const showToolbox = this.state.rating || !this.props.score;
    const toolbox = showToolbox? " selecting" : " selected";
    const neverSelected = this.props.score? "" : " new";

    return (
      <div className={"rating"+neverSelected}>
        <div
          onMouseEnter={() => this.setState({rating: true})}
          onMouseLeave={() => this.setState({rating: false})}
          className={"toolbox"+toolbox}>
          {reactions.map(reaction => (
            this.renderButton(reaction.word, reaction.score, this.props.score)
          ))}
        </div>
      </div>
    );
  }
}

export default Rating;

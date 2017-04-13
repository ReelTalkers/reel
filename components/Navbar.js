var React = require('react');
import Autosuggest from 'react-autosuggest';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    }
  }

  updateSearch(newValue) {
    this.setState({
      searchValue: newValue,
    })
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/assets/navbar-logo.png" alt="Reeltalk"/>
          </a>
        </div>
        <SearchBarWithData value={this.state.searchValue} onChange={this.updateSearch.bind(this)}/>
        <div className="user-name">
          andrew
        </div>
      </div>
    );
  }
}

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.title}
  </div>
);

const renderInputComponent = inputProps => {
  const placeholder = inputProps.value == ""? "Search" : inputProps.value;
  return (
    <div className="search-bar">
      <input {...inputProps} />
      <div className="placeholder">
        <img src="/assets/search.png" alt="Search"/>
        <span className="text">{placeholder}</span>
      </div>
    </div>
  );
};

const renderSuggestionsContainer = ({ containerProps , children, query })  => {
  const activeStyle = children == null? " hidden" : "";
  return (
    <div className={"suggestions-container"+activeStyle}>
      <div className="triangle"></div>
      <div className="suggestions">
        <div {... containerProps}>
          {children}
        </div>
      </div>
    </div>
  );
};

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    };
  }

  onChange(event, { newValue }) {
    this.props.onChange(newValue);
  };

  onSuggestionsFetchRequested({ value }) {
    // this is required but we dont need it
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions() {
    if (typeof this.props.data != 'undefined' && !this.props.data.loading) {
      this.state = {
        suggestions: this.props.data.search_media
      }
    }
    return this.state.suggestions;
  }

  render() {
    const value = this.props.value;
    const suggestions = this.getSuggestions();

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange.bind(this)
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
      />
    );
  }
}

const SearchQuery = gql`
  query SearchQuery($value: String!) {
    search_media(title: $value) {
      title,
      poster_path,
    }
  }
`

const SearchBarWithData = graphql(SearchQuery, {
    skip: (ownProps) => ownProps.value == "",
    options: ({ value }) => ({ variables: { value } }),
})(SearchBar);

export default Navbar;

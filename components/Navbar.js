var React = require('react');

class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/assets/navbar-logo.png" alt="Reeltalk"/>
          </a>
        </div>
        <SearchBar/>
        <div className="user-name">
          andrew
        </div>
      </div>
    );
  }
}

import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
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
  const activeStyle = children == null? " hidden" : ""
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
      value: '',
      suggestions: []
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({ value }) {
    // See if we should just show users
    // combine users and people
    this.setState({
      suggestions: [{name: "mom"},{name: "mom"},{name: "mom"},{name: "mom"}]
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

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

    return (
      <div className="search-bar">
        <input type="text" name="search-bar" placeholder="Search"/>
        <div className="placeholder">
          <img src="/assets/search.png" alt="Search"/>
          <span className="text">Search</span>
        </div>
      </div>
    );
  }
}

export default Navbar;

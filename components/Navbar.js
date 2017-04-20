var React = require('react');
import Autosuggest from 'react-autosuggest';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MovieDetail from './MovieDetail';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      displayMedia: false,
      mediaID: null
    }
  }

  updateSearch(newValue) {
    this.setState({
      searchValue: newValue,
    })
  }

  displayMedia(mediaID) {
    this.setState({
      displayMedia: true,
      mediaID: mediaID
    })
  }

  render() {
    const movieDetail = this.state.displayMedia?
      <MovieDetail id={this.state.mediaID}/> :
      "";
    const searchProps = {
      value: this.state.searchValue,
      displayMedia: this.displayMedia.bind(this),
      onChange: this.updateSearch.bind(this),
      autoFocus: this.props.searchForUsers
    }
    const searchBar = this.props.searchForUsers?
      <SearchBarWithUserData {...searchProps}/> :
      <SearchBarWithMovieData {...searchProps}/>

    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="logo">
            <a href="/">
              <img src="/assets/navbar-logo.png" alt="Reeltalk"/>
            </a>
          </div>
          {searchBar}
          <div className="user-name">
            andrew
          </div>
        </div>
        {movieDetail}
      </div>
    );
  }
}

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => {
  const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + suggestion.poster_path;
  const fallback_image = "/assets/Icon-29@2x.png"
  return (
    <div className="suggestion">
      <div className="image">
        <img src={poster_url}
          onError={ ev => {
                      ev.onError=null;
                      ev.target.src=fallback_image
                  }}/>
      </div>
      <div className="info">
        <div className="title">
          {suggestion.title}
        </div>
        <div className="director">
          urmom
        </div>
      </div>
    </div>
  );
};

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
      suggestions: [],
      updateSuggestions: false
    };
  }

  onChange(event, { newValue }) {
    this.props.onChange(newValue);
  };

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      updateSuggestions: true
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions() {
    if (typeof this.props.data != 'undefined'
    && !this.props.data.loading
    && this.state.updateSuggestions) {
      this.state = {
        updateSuggestions:false,
        suggestions: this.props.data.search_media
      }
    }
    return this.state.suggestions;
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    this.props.displayMedia(suggestion.id)
  }

  render() {
    const value = this.props.value;
    const suggestions = this.getSuggestions();

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange.bind(this),
      autoFocus: this.props.autoFocus
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
        focusInputOnSuggestionClick={false}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
      />
    );
  }
}

const SearchMovieQuery = gql`
  query SearchMovieQuery($value: String!) {
    search_media(title: $value, quantity: 20) {
      id,
      title,
      poster_path,
    }
  }
`

const SearchBarWithMovieData = graphql(SearchMovieQuery, {
    skip: (ownProps) => ownProps.value == "",
    options: ({ value }) => ({ variables: { value } }),
})(SearchBar);

const SearchUserQuery = gql`
  query SearchUserQuery($value: String!) {
    search_media(title: $value, quantity: 20) {
      id,
      title,
      poster_path,
    }
  }
`

const SearchBarWithUserData = graphql(SearchUserQuery, {
    skip: (ownProps) => ownProps.value == "",
    options: ({ value }) => ({ variables: { value } }),
})(SearchBar);

export default Navbar;

var React = require('react');
import MovieDetail from './MovieDetail';
import Slider from 'react-slick';

class Lolomo extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLomo: null,
      disableSelectedLomo: (() => null)
    }
  }

  enableActiveDetail(genre, disable) {
    this.disableActiveDetail(genre);
    this.setState({
      selectedLomo: genre,
      disableSelectedLomo: (() => disable())
    })
  }

  disableActiveDetail(genre) {
    if (this.state.selectedLomo != genre) {
      this.state.disableSelectedLomo();
    }
    this.setState({
      selectedLomo: null,
      disableSelectedLomo: (() => null)
    });
  }

  render() {
    return (
      <div className="lolomo">
        {this.props.recommendations.map(genre =>
          <Lomo
            key={genre.name}
            title={genre.name}
            movies={genre.media}
            enableActiveDetail={this.enableActiveDetail.bind(this)}
            disableActiveDetail={this.disableActiveDetail.bind(this)}
          />
        )}
      </div>
    );
  }
}

class Lomo extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      selectedMovie: null,
      disableSelectedMovie: (() => null),
      hasScrolled: false,
    }
  }

  enableDetail(id, disable) {
    this.disableDetail(id);
    this.props.enableActiveDetail(this.props.title, this.disableDetail.bind(this));

    this.setState({
      isActive: true,
      selectedMovie: id,
      disableSelectedMovie: (() => disable())
    });
  }

  disableDetail(id) {
    if (this.state.selectedMovie != id) {
      this.state.disableSelectedMovie();
    }
    this.props.disableActiveDetail(this.props.title);

    this.setState({
      isActive: false,
      selectedMovie: null,
      disableSelectedMovie: (() => null)
    });
  }

  onScroll() {
    this.setState({
      hasScrolled: true,
    });
  }

  renderNavButton(direction) {
    return (
      <NavButton
        hasScrolled={this.state.hasScrolled}
        direction={direction}
        onScroll={() => this.onScroll()}
      />
    )
  }

  render() {
    const movieDetail = this.state.isActive?
      <MovieDetail
        close={this.props.disableActiveDetail}
        id={this.state.selectedMovie}/> :
      "";
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      initialSlide: 0,
      slidesToShow: 8,
      slidesToScroll: 8,
      dots: false,
      prevArrow: this.renderNavButton(NavEnum.PREV),
      nextArrow: this.renderNavButton(NavEnum.NEXT)
    };
    const scrolledClass = this.state.hasScrolled? "" : " not-scrolled"
    return (
      <div className="lomo">
        <div className={"row"+scrolledClass}>
          <div className="title">{this.props.title}</div>
          <Slider {...settings}>
            {this.props.movies.map(movie =>
              <div key={movie.id}>
                <Movie
                  id={movie.id}
                  poster_path={movie.poster_path}
                  enableDetail={this.enableDetail.bind(this)}
                  disableDetail={this.disableDetail.bind(this)}
                />
              </div>
            )}
          </Slider>
        </div>
        {movieDetail}
      </div>
    );
  }
}

const NavEnum = {
    NEXT : 0,
    PREV : 1,
}

class NavButton extends React.Component {
  render() {
    const extraClass = this.props.direction == NavEnum.NEXT? "next" : "prev";
    const faClass = this.props.direction == NavEnum.NEXT? "fa-angle-right" : "fa-angle-left";

    const shouldHide = !this.props.hasScrolled && this.props.direction == NavEnum.PREV;
    const hidden = shouldHide? " hidden" : "";

    // Only update state if we need to
    var onClick;
    if (this.props.hasScrolled) {
      onClick = this.props.onClick;
    } else {
      onClick = () => {
        this.props.onClick();
        // Should fix this. It is a little bit jank to allow animation
        setTimeout(() => this.props.onScroll(), 450);
      }
    }

    return (
      <button
        {...this.props}
        onClick={() => onClick()}
        className={"nav-button "+extraClass+hidden}>
          <span className={"icon fa "+faClass}></span>
          Next
      </button>
    )
  }
}

// I think have an onclick here that outlines the movie and calls a callback to lomo
// that puts the detail below the lomo
class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    }
  }

  toggleActive() {
    if (this.state.isActive) {
      this.props.disableDetail(this.props.id);
    } else {
      this.props.enableDetail(this.props.id, this.toggleActive.bind(this));
    }
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const poster_url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + this.props.poster_path;
    return (
      <div onClick={() => this.toggleActive()} className={"movie"+ (this.state.isActive? " active" : "")}>
        <img src={poster_url}/>
      </div>
    );
  }
}

export default Lolomo;

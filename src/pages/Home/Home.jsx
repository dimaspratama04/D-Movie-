// Module
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

// Component
import Card from "../../component/Card/Card";
import Footer from "../../component/Footer/Footer";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "./Home.css";

const Home = () => {
  // Value search movie
  const inputRef = useRef(null);
  // Popular
  const [posters, setPosters] = useState([]);
  // Movie Detail
  const [movieDetail, setMovieDetail] = useState([]);
  // Search Movie Poster
  const [movies, setMovies] = useState([]);
  // Search Value
  const [searchValue, setSearchValue] = useState("");
  // Search Statement
  const [isSearch, setIsSearch] = useState(false);
  // Response statement for search movie
  const [response, setResponse] = useState("True");
  // Now playing movies
  const [nowPlayings, setNowPlayings] = useState([]);

  // Get popular
  useEffect(() => {
    try {
      const getDatas = async () => {
        const response = await fetch(
          "https://www.omdbapi.com/?apikey=e9a8997e&s=Avengers"
        );
        const datas = await response.json();
        let results = datas.Search.slice(0, 4);
        setPosters(results);
      };
      getDatas();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Show nav
  const showNav = () => {
    const navbar = document.querySelector(".navbar-nav-home");
    navbar.classList.toggle("active");
  };

  // Get movie details
  const getMovieDetails = async (imdbid) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=e9a8997e&i=${imdbid}`
      );
      const datas = await response.json();
      setMovieDetail(datas);
    } catch (e) {
      console.log(e);
    }
  };

  // Show details
  const showDetails = (e) => {
    let imdbid = e.target.dataset.imdbid;
    getMovieDetails(imdbid);

    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  // Search Movie
  const searchMovie = () => {
    let value = inputRef.current.value;
    setSearchValue(value);
    setIsSearch(true);
    try {
      const getSearchMovie = async () => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=e9a8997e&s=${value}`
        );
        const datas = await res.json();
        if (datas.Response === "True") {
          setResponse("True");
          setMovies(datas.Search);
        } else {
          setResponse("False");
        }
        window.location.href = "#search-results";
      };
      getSearchMovie();
    } catch (e) {
      console.log(e);
    }
  };

  // Now Playing Movie
  const getNowPlayingMovie = async (value) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=e9a8997e&s=${value}`
      );
      const datas = await response.json();
      setNowPlayings(datas.Search);
    } catch (e) {
      console.log(e);
    }
  };

  // Value on dom for now playing
  useEffect(() => {
    getNowPlayingMovie("conjuring");
  }, []);

  // Now playing
  const onChangeSelect = () => {
    let e = document.getElementById("by-city").value;
    switch (e) {
      case "bdg":
        getNowPlayingMovie("conjuring");
        break;
      case "jkt":
        getNowPlayingMovie("joker");
        break;
      case "sby":
        getNowPlayingMovie("herbie");
        break;
      default:
        return;
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar-home">
        <a className="navbar-home-logo" href="/home">
          D`<span>Movie</span>
        </a>
        <div className="navbar-nav-home">
          <a href="/">Home</a>
          <a href="#popular">Popular</a>
          <a href="#now-playing">Now Playing</a>
        </div>
        <a className="hamburger-menu" onClick={showNav}>
          <svg
            width="46"
            height="46"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z"></path>
          </svg>
        </a>
      </nav>

      {/* Jumbotron */}
      <section className="jumbotron">
        <form id="search-input">
          <input
            ref={inputRef}
            id="search-value"
            type="search"
            placeholder="Search movies..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchMovie();
              }
            }}
          />
          <button type="button" onClick={searchMovie}></button>
        </form>
      </section>

      {/* Popular Section */}
      <h1 id="popular" className="popular-title">
        Popular
      </h1>
      <section className="popular">
        {posters.map((poster, index) => {
          return (
            <Card
              delay={index + "00"}
              aos={"flip-left"}
              posterImg={poster.Poster}
              title={poster.Title}
              imdbid={poster.imdbID}
              onClick={showDetails}
              once={true}
            />
          );
        })}
      </section>

      {/* Now Playing */}
      <h1 id="now-playing" className="nowPlaying-title">
        Now Playing
      </h1>
      <section>
        <div className="select-playing-city">
          <h1>Playing at</h1>
          <select name="by-city" id="by-city" onChange={onChangeSelect}>
            <option value="bdg" selected="selected">
              Bandung
            </option>
            <option value="jkt">Jakrata</option>
            <option value="sby">Surabaya</option>
          </select>
        </div>

        {/* Card Now Playing */}
        <div className="card-slide-content">
          <div className="nowPlaying-results">
            <Swiper
              loop={true}
              navigation={false}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                360: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: "auto",
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="mySwiper"
            >
              {nowPlayings.map((nowPlaying) => {
                return (
                  <SwiperSlide>
                    <Card
                      posterImg={nowPlaying.Poster}
                      aos={"zoom-in-up"}
                      title={nowPlaying.Title}
                      imdbid={nowPlaying.imdbID}
                      onClick={showDetails}
                      once={true}
                    />
                    ;
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div id="search-results" className="container">
        {isSearch && (
          <h1 className="search-title">
            Search result for <span>{searchValue}</span>
          </h1>
        )}
        <section className="results">
          {response === "True" ? (
            movies.map((movie) => {
              return (
                <Card
                  posterImg={movie.Poster}
                  aos={"zoom-in-up"}
                  title={movie.Title}
                  imdbid={movie.imdbID}
                  onClick={showDetails}
                  once={false}
                />
              );
            })
          ) : (
            <h1 className="false-res">Movie not found !</h1>
          )}
        </section>
      </div>

      {/* Modal */}
      <div className="container">
        <div id="myModal" class="modal">
          <div class="modal-body">
            <span class="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </span>
            <div className="modal-content">
              <img src={movieDetail.Poster} alt="" />
              <ul class="list-group">
                <li class="list-group-item">
                  <strong>
                    <h1>
                      {movieDetail.Title} ({movieDetail.Year})
                    </h1>
                  </strong>
                </li>
                <li class="list-group-item">
                  <strong>Director : </strong>
                  {movieDetail.Director}
                </li>
                <li class="list-group-item">
                  <strong>Actors : </strong>
                  {movieDetail.Actors}
                </li>
                <li class="list-group-item">
                  <strong>Plot : </strong>
                  {movieDetail.Plot}
                </li>
                <li class="list-group-item">
                  <strong>Rate : </strong>
                  {movieDetail.imdbRating}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;

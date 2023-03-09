import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [posters, setPosters] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [response, setResponse] = useState("True");

  useEffect(() => {
    try {
      const getDatas = async () => {
        const response = await fetch(
          "http://www.omdbapi.com/?apikey=e9a8997e&s=Avengers"
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
        `http://www.omdbapi.com/?apikey=e9a8997e&i=${imdbid}`
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
    const value = document.getElementById("search-value").value;
    setSearchValue(value);
    setIsSearch(true);
    try {
      const getSearchMovie = async () => {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=e9a8997e&s=${value}`
        );
        const datas = await res.json();
        if (datas.Response === "True") {
          setResponse("True");
          setMovies(datas.Search);
        } else if (datas.Response === "False") {
          setResponse("False");
        } else {
        }
        window.location.href = "#search-results";
      };
      getSearchMovie();
    } catch (e) {
      console.log(e);
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
          <a href="#">Now Showing</a>
        </div>
        <a className="hamburger-menu" href="#" onClick={showNav}>
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
        <form>
          <input
            id="search-value"
            type="search"
            placeholder="Search movies..."
          />
          <button type="button" onClick={searchMovie}></button>
        </form>
      </section>

      {/* Section */}
      <div id="popular" className="container">
        <h1 className="popular-title">Popular</h1>
        <section className="popular">
          {posters.map((poster, index) => {
            return (
              <>
                <div
                  className="poster-card"
                  data-aos="flip-left"
                  data-aos-duration="1000"
                  data-aos-delay={index + "00"}
                  data-aos-once="true"
                  onClick={showDetails}
                >
                  <div className="poster-img">
                    <img
                      src={poster.Poster}
                      alt="Poster"
                      data-imdbid={poster.imdbID}
                    />
                  </div>
                  <h1 className="poster-title">{poster.Title}</h1>
                </div>
              </>
            );
          })}
          {}
        </section>
      </div>

      {/* Now Showing Section */}
      <div id="search-results" className="container">
        {isSearch && (
          <h1 className="search-title">
            Search result for <span>{searchValue}</span>
          </h1>
        )}
        <section className="results">
          {response === "True" ? (
            movies.map((movie, index) => {
              return (
                <>
                  <div
                    className="results-poster-card"
                    data-aos="flip-left"
                    data-aos-duration="1000"
                    data-aos-delay={index + "00"}
                    onClick={showDetails}
                    data-aos-once="false"
                  >
                    <div className="results-poster-img">
                      <img
                        src={movie.Poster}
                        alt="Poster"
                        data-imdbid={movie.imdbID}
                      />
                    </div>
                    <h1 className="results-poster-title">{movie.Title}</h1>
                  </div>
                </>
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
    </>
  );
};

export default Home;

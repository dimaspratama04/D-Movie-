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
        </section>
      </div>

      {/* Search Section */}
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
                    data-aos="zoom-in-up"
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

      {/* Footer */}
      <div id="footer" className="container">
        <footer className="footer">
          <div className="footer-main">
            <h1 className="footer-logo">
              D` <span>Movie</span>
            </h1>
            <div className="footer-socmed">
              <h2 className="footer-socmed-title"> Lets Connected</h2>
              <ul className="footer-socmed-list">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                  <a href="https://www.instagram.com/dmassssp/">Instagram</a>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  <a href="https://www.linkedin.com/in/mas-amirul-dimas-daen-pratama-309b0221a/">
                    Linkedin
                  </a>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <a href="https://github.com/dimasxitkj1">Github</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            <div></div>
            <p>©2023 by Mas Amirul Dimas Daen Pratama</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

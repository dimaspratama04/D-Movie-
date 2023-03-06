import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    try {
      const getDatas = async () => {
        const response = await fetch("http://www.omdbapi.com/?apikey=e9a8997e&s=Avengers");
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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar-home">
        <a className="navbar-home-logo" href="#">
          D`<span>Movie</span>
        </a>
        <div className="navbar-nav-home">
          <a href="#">Home</a>
          <a href="#">Popular</a>
          <a href="#">Profile</a>
        </div>
        <a className="hamburger-menu" href="#" onClick={showNav}>
          <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z"></path>
          </svg>
        </a>
      </nav>

      {/* Jumbotron */}
      <section className="jumbotron">
        <form>
          <input type="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Section */}
      <div className="container">
        <h1 className="popular-title">Popular</h1>
        <section className="popular">
          {posters.map((poster, index) => {
            return (
              <>
                <div className="poster-card" data-aos="flip-left" data-aos-duration="1000" data-aos-delay={index + "00"}>
                  <div className="poster-img">
                    <img src={poster.Poster} alt="Poster" />
                  </div>
                  <h1 className="poster-title">{poster.Title}</h1>
                </div>
              </>
            );
          })}
          {}
        </section>
      </div>
    </>
  );
};

export default Home;

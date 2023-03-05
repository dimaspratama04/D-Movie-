import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Menu } from "feather-icons-react/build/IconComponents";
import "./Home.css";

const Home = () => {
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
        <a className="hamburger-menu" href="#">
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
      <div className="jumbotron"></div>

      {/* Search bar */}
      <div className="search-bar"></div>
    </>
  );
};

export default Home;

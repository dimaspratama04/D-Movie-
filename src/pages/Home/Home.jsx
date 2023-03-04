import React from "react";
import "./Home.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Jumbotron from "../../assets/Jumbotron.jpg";
import Section1 from "../../assets/Section1.jpg";

const Home = () => {
  return (
    <>
      {/* Jumbotron */}
      <div className="jumbotron">
        <img src={Jumbotron} alt="" />

        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-title">
            <a href="#">
              <span>D` </span>
              <span>Movie</span>
            </a>
          </div>
          {/* <div className="navbar-search">
            <input id="search-bar" type="text" />
            <button className="navbar-search-btn">
              <FeatherIcon icon="search" />
            </button>
          </div> */}
          <div className="navbar-extras">
            <a href="">
              <FeatherIcon icon="user" />
            </a>
            <a href="">
              <FeatherIcon icon="settings" />
            </a>
          </div>
        </div>

        {/* Section title */}
        <div className="section-title">
          <h1>Most Popular</h1>
          <h2>Web for Search Film</h2>
          <button>Get Started</button>
        </div>
      </div>

      {/* Section 1 */}
      <div className="section-1">
        <h1>Enjoy play in everywhere</h1>
        <div className="img-section-1-wrapper">
          <img src={Section1} alt="" />
        </div>
      </div>
    </>
  );
};
export default Home;

// CSS
import "./LandingPage.css";
// Module
import Aos from "aos";
import "aos/dist/aos.css";
// Assets
import Extras1 from "../../assets/Extras1.webp";
import Extras2 from "../../assets/Extras2.webp";
import Extras3 from "../../assets/Extras3.webp";

Aos.init();
const LandingPage = () => {
  return (
    <>
      <nav className="navbar" data-aos="fade-down" data-aos-duration="1000">
        <a className="navbar-logo" href="#">
          D`<span>Movie</span>
        </a>
      </nav>

      {/* Section Hero */}
      <section className="hero">
        <main className="content">
          <h1>Most popular Website</h1>
          <h2>for search movies</h2>
          <a className="cta" href="/home">
            Get started
          </a>
        </main>
      </section>

      {/* Section Extras*/}
      <section className="extras">
        <div className="extras-1" data-aos="fade-right" data-aos-duration="500" data-aos-once="true" data-aos-offset="250">
          <div className="extras-1-title">
            <h1>Enjoy in everywhere</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cum minima perspiciatis? Incidunt, officiis illo!</p>
          </div>
          <div className="extras-1-img">
            <img src={Extras1} alt="Extras 1" />
          </div>
        </div>
        <div className="extras-2" data-aos="fade-right" data-aos-duration="500" data-aos-once="true" data-aos-offset="290">
          <div className="extras-2-title">
            <h1>Easy to acces</h1>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit lorem am sit, amet consectetur adipisicing elit. Sed, a? !</p>
          </div>
          <div className="extras-2-img">
            <img src={Extras2} alt="Extras 2" />
          </div>
        </div>
        <div className="extras-3" data-aos="fade-right" data-aos-duration="500" data-aos-once="true" data-aos-offset="310">
          <div className="extras-3-title">
            <h1>Unlimited film</h1>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, facere.</p>
          </div>
          <div className="extras-3-img">
            <img src={Extras3} alt="Extras 3" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

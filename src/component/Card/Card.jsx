import "./Card.css";
const Card = (props) => {
  return (
    <div className="poster-card" data-aos="flip-left" data-aos-duration="1000" data-aos-delay={props.delay} data-aos-once="true">
      <div className="poster-img">
        <img src={props.posterImg} alt="Poster" onClick={props.onClick} data-imdbid={props.imdbid} />
      </div>
      <h1 className="poster-title">{props.title}</h1>
    </div>
  );
};

export default Card;

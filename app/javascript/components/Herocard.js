import React from "react";
import { Link } from "react-router-dom";
const Herocard = props => {
  const Hero = props.hero;
  const attributes = Hero.hero_attributes;
  const heroLink = "/" + Hero._id;
  return (
    <div className="hero-card-item col-md-3 col-sm-4 col-xs-6">
      <Link to={`${heroLink}`}>
        <div className="hero-inner">
          <img
            src={attributes.image_portrait}
            className="hero-pt"
            alt={attributes.name}
          />

          <div className="hero-name"> {attributes.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Herocard;

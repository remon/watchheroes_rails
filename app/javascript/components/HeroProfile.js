import React from "react";

const HeroProfile = props => {
  const hero = props.hero,
    heroAttributes = hero.hero_attributes,
    style = {
      background: heroAttributes.image_splash
        ? `url(${heroAttributes.image_splash})`
        : "white",
      backgroundSize: "100% 100%"
    };

  return (
    <div className="hero-main container" style={style}>
      <img src={heroAttributes.image_portrait} />

      <div>
        <h2>{heroAttributes.name}</h2>
      </div>
    </div>
  );
};

export default HeroProfile;

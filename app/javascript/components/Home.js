import React from "react";

import HeroesContainer from "../components/HeroesContainer";

class Home extends React.Component {
  render() {
    return (
      <div className="container heroes-container">
        <HeroesContainer />
      </div>
    );
  }
}

export default Home;

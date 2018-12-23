import React from "react";
import HeroProfile from "../components/HeroProfile";
import LoadingGif from "../components/LoadingGif";
import axios from "axios";

class HeroItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: null
    };
  }
  componentDidMount() {
    const that = this;
    const heroId = this.props.match.params.id;
    axios
      .get("/api/v1/heroes/" + heroId + ".json")
      .then(function(response) {
        that.setState({
          hero: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const hero = this.state.hero;
    if (hero) {
      return (
        <div className="hero-profile">
          <HeroProfile hero={hero} />
        </div>
      );
    } else {
      return <LoadingGif text="Loading Profile Information" />;
    }
  }
}

export default HeroItem;

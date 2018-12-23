import React from "react";
import axios from "axios";
import Herocard from "../components/Herocard";
import ProgressBar from "../components/ProgressBar";
import LoadingGif from "../components/LoadingGif";
import AlertBar from "../components/AlertBar";
import SearchForm from "../components/SearchForm";

class HeroesContainer extends React.Component {
  constructor(props) {
    super(props);
    /* 
    setting initial state 
    heres = list of heroes 
    currentPage = the page number we use for pagination 
    isloading = determine if we are loading more data from server or not 
    error loading =  state variable when error happens while fetching data from server 
    hasMoreheroes = indicates if we have more heroes for pagination or not
    noSearchQuery = variable to indicate if we have a search qeury or not 
    formFinishLoading = used for filter name form 
    query = the search query variable 
    searchedQuery = for the search query we store it as a seprate variable 
    */

    this.state = {
      heroes: [],
      currentPage: 1,
      isLoading: false,
      errorLoading: false,
      hasMoreHeroes: true,
      noSearchQuery: false,
      formFinishLoading: false,
      query: null,
      searchedQuery: null
    };

    /* binding methods */

    this.loadMoreData = this.loadMoreData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    /* window on scroll method , better than using a separte component */

    window.onscroll = () => {
      const { errorLoading, isLoading, hasMoreHeroes } = this.state;

      /* 
      if we don't have more heroes or there is an error while loading or currently loading data 
      no need to trigger onscroll event 
      */

      if (!hasMoreHeroes || errorLoading || isLoading) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.loadMoreData();
      }
    };
  }

  loadMoreData = () => {
    const { heroes, currentPage, query } = this.state;
    let noSearchQuery = this.state.noSearchQuery;

    this.setState({ isLoading: true, formFinishLoading: true }, () => {
      let url;
      if (query) {
        url = "/api/v1/heroes.json?page=" + currentPage + "&q=" + query;
      } else {
        url = "/api/v1/heroes.json?page=" + currentPage;
      }
      axios
        .get(url)
        .then(response => {
          const responseData = response.data,
            //append new heroes to the original state heroes //
            newHeros = heroes.concat(responseData.heroes);

          noSearchQuery = query && responseData.heroes.length < 1;

          this.setState({
            isLoading: false,
            searchedQuery: query,
            noSearchQuery: noSearchQuery,
            heroes: newHeros,
            hasMoreHeroes: responseData.total_pages > responseData.current_page,
            currentPage: responseData.current_page + 1
          });
        })
        .catch(error => {
          this.setState({
            errorLoading: error.message,
            isLoading: false
          });
        });
    });
  };

  componentWillMount = () => {
    //initial populate data before loading the component //

    this.loadMoreData();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        heroes: [],
        currentPage: 1,
        isLoading: false,
        errorLoading: false,
        hasMoreHeroes: true
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };
  render() {
    const {
        hasMoreHeroes,
        errorLoading,
        isLoading,
        noSearchQuery,
        searchedQuery,
        formFinishLoading
      } = this.state,
      heroes = this.state.heroes.map((hero, index) => {
        return <Herocard hero={hero} key={index} />;
      }),
      /* 
      canloadProgressbar = variable to indicate when progressbar will be shown 
      canLoadmainGif = to indicate when the main loading gif will be show 
      canLoadScrollAlert = indicates when the scroll message will be shown
      canloadNomoreHeroes =indicates when the message of 'no more heroes' will be shown 
      
      */
      emptyHeroesList = heroes.length < 1,
      canLoadProgressBar = isLoading && !emptyHeroesList && !noSearchQuery,
      canLoadMainGif = emptyHeroesList && !errorLoading && !noSearchQuery,
      canLoadScrollAlert =
        hasMoreHeroes && !isLoading && !errorLoading && !noSearchQuery,
      canLoadNoMoreHeroes = !hasMoreHeroes && !noSearchQuery;
    return (
      <div className="heros-container row">
        {formFinishLoading && (
          <SearchForm
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        )}
        {heroes}
        {canLoadProgressBar && <ProgressBar />}
        {canLoadMainGif && <LoadingGif text="Loading Heroes List" />}
        {canLoadScrollAlert && (
          <AlertBar
            className="alert-success"
            text="Scroll down to load more heroes"
          />
        )}
        {canLoadNoMoreHeroes && (
          <AlertBar className="alert-info" text="No More Heroes" />
        )}

        {errorLoading && !noSearchQuery && (
          <AlertBar
            className="alert-danger"
            onClick={this.loadMoreData}
            text=" Error Loading Heroes List , click here to try again"
          />
        )}
        {noSearchQuery && (
          <AlertBar
            className="alert-danger"
            text={`No search Results for ${searchedQuery}`}
          />
        )}
      </div>
    );
  }
}

export default HeroesContainer;

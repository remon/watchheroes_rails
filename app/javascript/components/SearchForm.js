import React from "react";

const SearchForm = props => {
  
  return (
    <div className="container search-form">
      <form onSubmit={props.onSubmit}>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for Hero"
            onChange={props.onChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="submit"
            className=" btn-search btn btn-primary"
            value="Search"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default SearchForm;

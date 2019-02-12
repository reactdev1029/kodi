import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const SearchButton = ({ handleChange, classes, loader }) => {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center bg-grey darken-3 pointer btn-right-radius search-button"
      onClick={handleChange}
    >
      {loader ? (
        <CircularProgress size={24} className="text-white" />
      ) : (
        <i className={`zmdi zmdi-search ${classes[1]} text-white`} />
      )}
    </div>
  );
};

export default SearchButton;

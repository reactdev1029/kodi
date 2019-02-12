import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { FormattedNumber } from 'react-intl';
import AutoComplete from 'components/AutoComplete';
import SearchButton from 'components/SearchButton';
import AppDownload from 'components/AppDownload';

const SearchType = ({
  selectedCountry,
  typesList,
  selectedType,
  getSelectedType,
  handleChange,
  getSelectedCountry,
  countriesList,
  searchLoader,
  searchType,
}) => {
  let overview = [
    { name: 'Machines', value: 12456 },
    { name: 'Introductions', value: 1431 },
    { name: 'Partners', value: 2365 },
    { name: 'Countries', value: 12 },
  ];
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <h1 className="font-weight-bold text-white text-shadow mb-2">
        {searchType === 'rent'
          ? 'Equipment rental: made easy.'
          : searchType === 'buy'
          ? 'Buy the machine you need.'
          : searchType === 'bid'
          ? 'Maximize earnings: bid on RFQs'
          : 'Upgrading the construction industry in Africa'}
      </h1>
      {searchType !== 'overview' ? (
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            {searchType === 'rent' || searchType === 'buy' ? (
              <Paper elevation={4} className="p-2">
                <AutoComplete
                  placeholder="Location"
                  suggestions={countriesList}
                  handleChange={value => getSelectedCountry(value)}
                  value={selectedCountry}
                  disableUnderline={true}
                  type="single"
                />
              </Paper>
            ) : (
              searchType === 'bid' && (
                <Link to={'/post-item'} className="text-secondary">
                  <div className="d-flex justify-content-center align-items-center bg-primary-1 rounded-lg pointer p-2 h-100">
                    <span className="h3-font-size font-weight-bold">
                      List Machines
                    </span>
                  </div>
                </Link>
              )
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <div className="d-flex flex-row">
              <div className="p-2 w-100 bg-white btn-left-radius">
                {searchType === 'rent' || searchType === 'buy' ? (
                  <AutoComplete
                    placeholder="What are you looking for?"
                    suggestions={typesList}
                    handleChange={value => getSelectedType(value)}
                    value={selectedType}
                    disableUnderline={true}
                    type="single"
                  />
                ) : (
                  searchType === 'bid' && (
                    <AutoComplete
                      placeholder="Where are you located?"
                      suggestions={countriesList}
                      handleChange={value => getSelectedCountry(value)}
                      value={selectedCountry}
                      disableUnderline={true}
                      type="single"
                    />
                  )
                )}
              </div>
              <SearchButton
                handleChange={() => handleChange()}
                classes={['size-60', 'zmdi-hc-2x']}
                loader={searchLoader}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={16}>
          {overview.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <div className="d-flex flex-column align-items-center justify-content-center text-white right-border">
                <span className="h1-font-size font-weight-bold">
                  <FormattedNumber value={item.value} />
                </span>
                <span className="h2-font-size font-weight-bold">
                  {item.name}
                </span>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      {searchType !== 'overview' ? (
        <h2 className="mt-4 font-weight-bold font-italic text-white text-shadow d-none d-sm-block">
          {searchType === 'rent'
            ? 'Need multiple machines? Search & add them into your RFQ.'
            : searchType === 'buy'
            ? 'Search real-time listings of equipment for sale near you.'
            : searchType === 'bid' &&
              'Own or broker machines? List them on KODI to rent them out.'}
        </h2>
      ) : (
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <AppDownload />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SearchType;

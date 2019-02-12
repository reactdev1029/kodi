import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedNumber } from 'react-intl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import {
  getOrder,
  getBidMinValue,
  getAvailability,
  getCountriesStatus,
  getBidSearch,
} from 'actions/Content';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {
      nextLink: undefined,
    };
  }

  componentDidMount() {
    this.props.getOrder('-num_items');
  }

  availabilityChange = name => (event, checked) => {
    const { availability } = this.props;
    this.props.getAvailability({ ...availability, [name]: checked });
    this.handleSearch(name, checked);
  };

  handleCountryCheckChange = name => (event, checked) => {
    const { countriesStatus } = this.props;
    this.props.getCountriesStatus({ ...countriesStatus, [name]: checked });
    this.handleSearch('o_countries', { ...countriesStatus, [name]: checked });
  };

  handleSearch = (name, value) => {
    const { order, availability, countriesStatus } = this.props;

    let o_countries = '';
    if (name === 'o_countries') {
      Object.keys(value).map(country => {
        if (value[country]) {
          o_countries += `${country},`;
        }
      });
      o_countries = o_countries.slice(0, -1);
    } else {
      if (countriesStatus) {
        Object.keys(countriesStatus).map(country => {
          if (countriesStatus[country]) {
            o_countries += `${country},`;
          }
        });
        o_countries = o_countries.slice(0, -1);
      }
    }

    let params = {
      ordering: name === 'order' ? value : order,
      countries: o_countries,
      for_rent: name === 'for_rent' ? value : availability.for_rent,
      for_sale: name === 'for_sale' ? value : availability.for_sale,
    };
    this.props.getBidSearch(params);
  };

  render() {
    const { nextLink } = this.state;
    const {
      order,
      min_total_value,
      availability,
      countries,
      countriesStatus,
    } = this.props;

    let sortList = [
      { name: 'Most relevant', value: 'most_relevant' },
      { name: 'Date posted (new to old)', value: '-date_posted' },
      { name: 'Date posted (old to new)', value: 'date_posted' },
      { name: 'Num machines (high to low)', value: '-num_items' },
      { name: 'Num machines (low to high)', value: 'num_items' },
    ];

    if (nextLink)
      return (
        <Redirect
          to={{
            pathname: nextLink,
            state: { status: 'RFQs' },
          }}
        />
      );

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          <h3 className="font-weight-bold">Order by</h3>
          <FormControl className="w-100 mb-4">
            <Select
              value={order}
              onChange={event => {
                this.props.getOrder(event.target.value);
                this.handleSearch('order', event.target.value);
              }}
              input={<Input id="sort" className="text-primary" />}
            >
              {sortList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mb-3">
            <h3 className="font-weight-bold">Purpose</h3>
            <div className="d-flex flex-row align-items-center justify-content-between px-2">
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={availability.for_sale}
                    onChange={this.availabilityChange('for_sale')}
                    value={'for_sale'}
                  />
                }
                label={'For Sale'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={availability.for_rent}
                    onChange={this.availabilityChange('for_rent')}
                    value={'for_rent'}
                  />
                }
                label={'For Rent'}
              />
            </div>
          </div>
          <div className="mb-5">
            <h3 className="font-weight-bold">Project country</h3>
            <div className="px-2">
              <Grid container spacing={0}>
                {countries &&
                  countries.map((country, index) => (
                    <Grid key={index} item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="text-primary"
                            checked={countriesStatus.country}
                            onChange={this.handleCountryCheckChange(
                              country.name,
                            )}
                            value={country.name}
                          />
                        }
                        label={country.name}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>
          <span className="h3-font-size">See your completed bids</span>
          <div onClick={() => this.setState({ nextLink: '/account' })}>
            <span className="h3-font-size text-primary font-weight-bold pointer">
              here
            </span>
            .
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const {
    order,
    min_total_value,
    availability,
    countries,
    countriesStatus,
  } = content;
  return {
    order,
    min_total_value,
    availability,
    countries,
    countriesStatus,
  };
};

export default connect(
  mapStateToProps,
  {
    getOrder,
    getBidMinValue,
    getAvailability,
    getCountriesStatus,
    getBidSearch,
  },
)(SideView);

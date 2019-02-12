import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GoogleAutoComplete from 'components/GoogleAutoComplete';
import AutoComplete from 'components/AutoComplete';
import MapContainer from 'components/MapContainer';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
  }

  render() {
    const {
      address,
      coordinates,
      data,
      handleTextChange,
      postAsset,
      loader,
      countriesList,
    } = this.props;
    const { checked } = this.state;

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg px-3 py-4">
          <div className="mb-2">
            <span>Equipment location</span>
            <GoogleAutoComplete
              address={address}
              addressChange={address => this.props.addressChange(address)}
              handleSelect={address => this.props.handleSelect(address)}
            />
          </div>
          <div className="mb-2">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>For Sale (USD)</span>
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={data.is_purchaseable}
                    onChange={this.props.handleCheckChange('is_purchaseable')}
                    value={'is_purchaseable'}
                  />
                }
              />
            </div>
            <TextField
              id="purchase_price"
              margin="none"
              type="number"
              fullWidth
              value={data.purchase_price}
              onChange={handleTextChange('purchase_price')}
            />
          </div>
          <div className="mb-4">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>For Rent (USD per Day)</span>
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={data.is_rentable}
                    onChange={this.props.handleCheckChange('is_rentable')}
                    value={'is_rentable'}
                  />
                }
              />
            </div>
            <TextField
              id="rental_price"
              margin="none"
              type="number"
              fullWidth
              value={data.rental_price}
              onChange={handleTextChange('rental_price')}
            />
          </div>
          <div className="">
            <span>Available countries for rental</span>
            <AutoComplete
              placeholder=""
              suggestions={countriesList}
              handleChange={this.props.handleChange('available_countries')}
              value={data.available_countries}
              type="multi"
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center p-3 w-100">
          <FormControlLabel
            control={
              <Checkbox
                className="text-primary"
                checked={checked}
                onChange={(e, checked) => this.setState({ checked })}
                value={'checked'}
              />
            }
            className="my-2"
            label={
              <span className="h3-font-size font-weight-bold">
                I have read and accept KODI's{' '}
                <Link to={'/'}>Terms & Conditions</Link>
              </span>
            }
          />
          <Button
            className={`jr-btn bg-grey ${!checked ? 'lighten-1' : 'darken-3'}`}
            onClick={() => postAsset()}
            fullWidth
            disabled={!checked}
          >
            {loader ? (
              <CircularProgress size={16} className="text-white mx-4" />
            ) : (
              <span className="text-white">Add Machine</span>
            )}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null)(SideView);

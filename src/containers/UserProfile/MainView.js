import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactPaginate from 'react-paginate';
import ReactStars from 'react-stars';
import Geocode from 'react-geocode';
import { getAsset } from 'actions/Content';
import ListItem from '../RentSearchResults/ListItem';
import EarningsView from './EarningsView';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = { address: [] };

    Geocode.setApiKey('AIzaSyBgXZjbkC9ceSe9X8y_t9mFE-W1G-PFRhQ');
    Geocode.enableDebug();
  }

  componentDidMount = () => {
    const { asset } = this.props;
    this.getLocation(asset);
  };

  getLocation = asset => {
    if (asset && asset.results && asset.results.length > 0) {
      let address = [];
      asset.results.map(result => {
        Geocode.fromLatLng(result.last_latitude, result.last_longitude).then(
          response => {
            address.push(response.results[1].formatted_address);
            this.setState({ address });
          },
          error => {
            // console.error(error);
          },
        );
      });
    }
  };

  render() {
    const { address } = this.state;
    const { asset } = this.props;
    return (
      <div className="">
        <EarningsView />
        {asset && asset.results && asset.results.length > 0 && (
          <h3 className="font-weight-bold mb-4">
            {'Your assets ('}
            {asset.results.length > 5 ? '5' : asset.results.length}
            {')'}
          </h3>
        )}
        {asset &&
          asset.results &&
          asset.results.length > 0 &&
          asset.results.map(
            (result, index) =>
              index < 5 && (
                <ListItem
                  key={index}
                  result={result}
                  address={address[index]}
                />
              ),
          )}
      </div>
    );
  }
}

export default MainView;

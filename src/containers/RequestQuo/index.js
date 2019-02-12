import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import moment from 'moment';
import SnackBar from 'components/utils/SnackBar';
import AutoComplete from 'components/AutoComplete';
import GoogleAutoComplete from 'components/GoogleAutoComplete';
import Filter from 'components/Filter';
import SideView from './SideView';
import MainView from './MainView';
import { postRfq } from 'actions/Content';

class RequestQuo extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      error: '',
      variant: '',
      address: '',
      latitude: 0,
      longitude: 0,
      rfq_items: [],
    };
  }

  componentDidMount() {
    this.addEquipment();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Failed. Please check carefully.',
        variant: 'error',
      });
    } else if (nextProps.rfq === '' || nextProps.rfq !== undefined) {
      this.setState({
        open: true,
        error: 'Created successfully',
        variant: 'success',
      });
    }
  }

  addressChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    this.getCoordinates(address);
  };

  getCoordinates = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({ latitude: latLng.lat, longitude: latLng.lng }),
      )
      .catch(error => console.error('Error', error));
  };

  handleChange = (name, index) => value => {
    let rfq_items = this.state.rfq_items;
    rfq_items[index][name] = value;
    if (name === 'datetime_start' || name === 'datetime_end') {
      rfq_items[index][name] = value.format('YYYY-MM-DDTHH:mm');
    }
    this.setState({ rfq_items });
  };

  handleNumberChange = (name, index) => event => {
    let rfq_items = this.state.rfq_items;
    rfq_items[index][name] = event.target.value;
    this.setState({ rfq_items });
  };

  addEquipment() {
    let rfq_items = this.state.rfq_items;
    let itemData = {
      type: '',
      manufacturer: '',
      model: '',
      datetime_start: null,
      datetime_end: null,
      quantity: '',
      year_min: '',
      hours_max: '',
    };
    rfq_items.push(itemData);
    this.setState({ rfq_items });
  }

  handleClose = index => {
    let rfq_items = this.state.rfq_items;
    rfq_items.splice(index, 1);
    this.setState({ rfq_items });
  };

  publishRFQ = () => {
    const { rfq_items, latitude, longitude } = this.state;
    let data = {
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
      radius: 100,
      rfq_items,
    };
    this.props.postRfq(data);
  };

  snackbarClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { rfq_items, address, open, error, variant } = this.state;
    const { location, loader } = this.props;

    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <Grid container spacing={16}>
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                className="d-flex justify-content-center"
              >
                <SideView
                  publishRFQ={() => this.publishRFQ()}
                  loader={loader}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <MainView
                  rfq_items={rfq_items}
                  address={address}
                  addressChange={this.addressChange.bind(this)}
                  handleSelect={this.handleSelect.bind(this)}
                  handleChange={this.handleChange.bind(this)}
                  handleNumberChange={this.handleNumberChange.bind(this)}
                  handleClose={index => this.handleClose(index)}
                  addEquipment={() => this.addEquipment()}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <SnackBar
          open={open}
          error={error}
          variant={variant}
          snackbarClose={() => this.snackbarClose()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { loader, rfq, error } = content;
  return {
    loader,
    rfq,
    error,
  };
};

export default connect(
  mapStateToProps,
  { postRfq },
)(RequestQuo);

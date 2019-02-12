import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import SnackBar from 'components/utils/SnackBar';
import Filter from 'components/Filter';
import SideView from './SideView';
import MainView from './MainView';
import { postAsset, postImage } from 'actions/Content';

class PostItem extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      open: false,
      error: '',
      variant: '',
      photo1: null,
      publish: false,
      data: {
        place: {
          country: '',
        },
        serial_number: 'abc123',
        available_countries: '',
        is_rentable: true,
        rental_price: 0,
        is_purchaseable: true,
        purchase_price: 0,
        currency: 'usd',
        manufacturer: '',
        model: '',
        manufacture_date: null,
        machine_hours: 0,
        machine_distance: 0,
        type: '',
        category: '',
      },
      subCategoryList: [],
      modelsList: [],
      nextLink: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Failed. Please check carefully.',
        variant: 'error',
      });
    } else if (
      nextProps.postedAsset === '' ||
      nextProps.postedAsset !== undefined
    ) {
      if (this.state.photo1) {
        var data = new FormData();
        data.append('image', this.state.photo1);
        data.append('asset_uid', nextProps.postedAsset.asset_uid);
        this.props.postImage(data);
      }
    } else if (
      nextProps.postedImage === '' ||
      nextProps.postedImage !== undefined
    ) {
      this.setState({ nextLink: '/account' });
    }
  }

  addressChange = address => {
    this.setState({
      address,
      data: {
        ...this.state.data,
        place: {
          country: address,
        },
      },
    });
  };

  handleSelect = address => {
    let country = address.split(', ')[address.split(', ').length - 1];
    this.setState({
      address,
      data: {
        ...this.state.data,
        place: {
          country,
        },
      },
    });
    this.getCoordinates(address);
  };

  getCoordinates = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log(latLng.lat, latLng.lng))
      .catch(error => console.error('Error', error));
  };

  handleChange = name => value => {
    const { category, mans_models } = this.props;
    this.setState({
      data: {
        ...this.state.data,
        [name]:
          name === 'manufacture_date' ? value.format('YYYY-MM-DD') : value,
      },
    });
    if (name === 'category') {
      let subCategoryList = Object.keys(category[value]).map(suggestion => ({
        value: suggestion,
        label: suggestion,
      }));
      this.setState({ subCategoryList });
    }
    if (name === 'manufacturer') {
      let modelsList = mans_models
        .find(man => man.name === value)
        .models.map(suggestion => ({
          value: suggestion,
          label: suggestion,
        }));
      this.setState({ modelsList });
    }
  };

  handleTextChange = name => event => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: event.target.value,
      },
    });
  };

  handleCheckChange = name => (event, checked) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: checked,
      },
    });
  };

  handlePublishCheckChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  photoUpload = photo => {
    this.setState({
      photo1: photo,
    });
  };

  postAsset() {
    const { data } = this.state;
    this.props.postAsset(data);
  }

  snackbarClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { match, location, loader, countriesList } = this.props;
    const {
      address,
      data,
      open,
      error,
      variant,
      photo1,
      publish,
      subCategoryList,
      modelsList,
      nextLink,
    } = this.state;

    if (nextLink)
      return (
        <Redirect
          to={{
            pathname: nextLink,
            state: { status: 'Registry' },
          }}
        />
      );

    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <Grid container spacing={16}>
              <Grid item xs={12} sm={7} md={8} className="app-logo-content">
                <MainView
                  data={data}
                  photo1={photo1}
                  publish={publish}
                  subCategoryList={subCategoryList}
                  modelsList={modelsList}
                  handleChange={this.handleChange.bind(this)}
                  handleTextChange={this.handleTextChange.bind(this)}
                  handlePublishCheckChange={this.handlePublishCheckChange.bind(
                    this,
                  )}
                  photoUpload={photo => this.photoUpload(photo)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                className="app-login-content d-flex justify-content-center"
              >
                <SideView
                  address={address}
                  coordinates={{
                    latitude: data.last_latitude,
                    longitude: data.last_longitude,
                  }}
                  data={data}
                  countriesList={countriesList}
                  addressChange={this.addressChange.bind(this)}
                  handleSelect={this.handleSelect.bind(this)}
                  handleTextChange={this.handleTextChange.bind(this)}
                  handleCheckChange={this.handleCheckChange.bind(this)}
                  handleChange={this.handleChange.bind(this)}
                  postAsset={() => this.postAsset()}
                  loader={loader}
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
  const {
    loader,
    postedAsset,
    error,
    countriesList,
    category,
    mans_models,
    postedImage,
  } = content;
  return {
    loader,
    postedAsset,
    error,
    countriesList,
    category,
    mans_models,
    postedImage,
  };
};

export default connect(
  mapStateToProps,
  { postAsset, postImage },
)(PostItem);

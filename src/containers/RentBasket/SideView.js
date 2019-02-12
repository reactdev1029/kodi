import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from 'material-ui-pickers';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import SnackBar from 'components/utils/SnackBar';
import GoogleAutoComplete from 'components/GoogleAutoComplete';
import {
  postRentCosts,
  datetimeStart,
  datetimeEnd,
  getPlace,
  postRfq,
  errorClear,
  getPurpose,
  cancelRfq,
} from 'actions/Content';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      nextLink: undefined,
      open: false,
      error: '',
      variant: '',
      address: '',
      d_open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rfq !== undefined && nextProps.rfq === '') {
      this.setState({ nextLink: '/account' });
      this.props.errorClear();
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Error!',
        variant: 'error',
      });
    }
  }

  addressChange = address => {
    this.setState({ address });
    let place = {
      country: '',
      city: '',
      latitude: null,
      longitude: null,
    };
    this.props.getPlace(place);
    this.getAddress(address);
  };

  handleSelect = address => {
    this.setState({ address });
    this.getAddress(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let place = {
          ...this.props.place,
          latitude: latLng.lat.toFixed(6),
          longitude: latLng.lng.toFixed(6),
        };
        this.props.getPlace(place);
      })
      .catch(error => console.error('Error', error));
  };

  getAddress(address) {
    let res = address.split(', ');
    let place = {
      ...this.props.place,
    };

    if (res.length === 1) {
      place = {
        ...this.props.place,
        country: res[0],
      };
    } else if (res.length === 2) {
      place = {
        ...this.props.place,
        country: res[1],
        city: res[0],
      };
    } else if (res.length === 3) {
      place = {
        ...this.props.place,
        country: res[2],
        city: res[0],
      };
    } else if (res.length === 4) {
      place = {
        ...this.props.place,
        country: res[3],
        city: res[1],
      };
    } else if (res.length >= 5) {
      place = {
        ...this.props.place,
        country: res[res.length - 1],
        city: res[res.length - 3],
      };
    }
    this.props.getPlace(place);
    this.postRentCosts(
      this.props.datetime_start,
      this.props.datetime_end,
      place,
    );
  }

  datetimeStart(start) {
    this.props.datetimeStart(start);
    this.postRentCosts(start, this.props.datetime_end, this.props.place);
  }

  datetimeEnd(end) {
    this.props.datetimeEnd(end);
    this.postRentCosts(this.props.datetime_start, end, this.props.place);
  }

  postRentCosts(start, end, place) {
    const { rfq_items } = this.props;

    rfq_items.length > 0 &&
      rfq_items.map((item, index) => {
        rfq_items[index].datetime_start = start;
        rfq_items[index].datetime_end = end;
      });

    if (start && end && rfq_items.length > 0 && place.city && place.country) {
      let data = {
        datetime_start: start,
        datetime_end: end,
        currency: 'usd',
        rfq_items,
        place: {
          city: place.city,
          country: place.country,
        },
      };
      //this.props.postRentCosts(data);
    }
  }

  handleRequestClose = () => {
    const { bid_rfq_items } = this.props;
    var data = new FormData();
    data.append('rfq_uid', bid_rfq_items.uid);
    this.props.cancelRfq(data);
    this.setState({ d_open: false });
  };

  handleChange() {
    const {
      bid_rfq_items,
      rent_costs,
      datetime_start,
      datetime_end,
      authUser,
      place,
      purpose,
    } = this.props;

    let rfq_items = [];

    bid_rfq_items &&
      bid_rfq_items.rfq_items &&
      bid_rfq_items.rfq_items.length > 0 &&
      bid_rfq_items.rfq_items.map((item, index) => {
        let manufacturers_models = '';
        item.manufacturers_models.split(';').map(mans => {
          manufacturers_models += `${mans}-`;
        });
        manufacturers_models = manufacturers_models.slice(0, -1);

        rfq_items.push({
          category: item.category,
          type: item.type,
          manufacturers_models,
          min_year: item.min_year,
          max_distance: item.max_distance,
          max_hours: item.max_hours,
          quantity: item.quantity,
        });
      });

    if (authUser) {
      let data = {
        rfq_items,
        datetime_start,
        datetime_end,
        place,
        purpose,
      };
      this.props.postRfq(data);
    } else {
      this.setState({ nextLink: '/login' });
    }
  }

  snackbarClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      checked,
      nextLink,
      open,
      error,
      variant,
      address,
      d_open,
    } = this.state;
    const {
      place,
      rfq_items,
      rent_costs,
      datetime_start,
      datetime_end,
      loader,
      location,
      purpose,
      bid_rfq_items,
      bids,
      typesList,
    } = this.props;

    let type_state = true;
    if (bid_rfq_items) {
      bid_rfq_items.rfq_items.map(item => {
        let item_state =
          typesList.find(type => type.value === item.type) !== undefined;
        if (!item_state) {
          type_state = false;
        }
      });
    }

    let status =
      (address || (place.city && place.country)) === '' ||
      (datetime_start && datetime_end) === null ||
      !checked ||
      !type_state ||
      bid_rfq_items.count === 0;

    if (nextLink)
      return (
        <Redirect
          to={{
            pathname: nextLink,
            state: { from: location },
          }}
        />
      );

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          <div className="d-flex flex-row justify-content-between align-items-center w-100">
            {['RENT', 'BUY'].map((type, index) => (
              <div
                key={index}
                className={`d-flex border-width-2 w-50 py-2 search-type-width justify-content-center ${
                  purpose === type.toLowerCase()
                    ? 'border-primary'
                    : 'border-white'
                } pointer`}
                onClick={() => this.props.getPurpose(type.toLowerCase())}
              >
                <span className={`h3-font-size`}>{type}</span>
              </div>
            ))}
          </div>
          <div className="d-flex flex-row align-items-center p-3 mt-3">
            <i className="zmdi zmdi-calendar zmdi-hc-2x text-grey w-25" />
            <DatePicker
              fullWidth
              value={
                location.pathname !== '/rent-basket' && bid_rfq_items
                  ? bid_rfq_items.datetime_start
                  : datetime_start
              }
              placeholder="Start Date"
              onChange={date =>
                this.datetimeStart(date.format('YYYY-MM-DDTHH:MM'))
              }
              format="DD/MM/YYYY"
              animateYearScrolling={false}
              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
              disabled={location.pathname === '/rent-basket' ? false : true}
            />
          </div>
          <div className="d-flex flex-row align-items-center p-3">
            <i className="zmdi zmdi-calendar zmdi-hc-2x text-grey w-25" />
            <DatePicker
              fullWidth
              value={
                location.pathname !== '/rent-basket' && bid_rfq_items
                  ? bid_rfq_items.datetime_end
                  : datetime_end
              }
              placeholder="End Date"
              onChange={date =>
                this.datetimeEnd(date.format('YYYY-MM-DDTHH:MM'))
              }
              format="DD/MM/YYYY"
              animateYearScrolling={false}
              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
              disabled={location.pathname === '/rent-basket' ? false : true}
            />
          </div>
          <div className="d-flex flex-row align-items-center p-3">
            <i className="zmdi zmdi-pin zmdi-hc-2x text-grey w-25" />
            <GoogleAutoComplete
              address={
                location.pathname !== '/rent-basket' && bid_rfq_items
                  ? `${bid_rfq_items.place.city}, ${
                      bid_rfq_items.place.country
                    }`
                  : address
                  ? address
                  : place.city && place.country
                  ? `${place.city}, ${place.country}`
                  : ''
              }
              addressChange={this.addressChange.bind(this)}
              handleSelect={this.handleSelect.bind(this)}
              placeholder="Project Location"
              disabled={location.pathname === '/rent-basket' ? false : true}
            />
          </div>
          {location.pathname === '/rent-basket' ? (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={checked}
                    onChange={(e, checked) => this.setState({ checked })}
                    value={'checked'}
                  />
                }
                className="mt-3"
                label={
                  <span className="h3-font-size font-weight-bold">
                    I have read and accept KODI's{' '}
                    <Link to={'/'}>Terms & Conditions</Link>
                  </span>
                }
              />
              <div className="d-flex justify-content-center mt-3">
                <Button
                  className={`jr-btn bg-grey ${
                    status ? 'lighten-1' : 'darken-3'
                  }`}
                  onClick={() => this.handleChange()}
                  disabled={status}
                >
                  {loader ? (
                    <CircularProgress size={16} className="text-white mx-4" />
                  ) : (
                    <span className="text-white">Request for Quotations</span>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              {bids && bids.count > 0 && (
                <div>
                  <span className={`h3-font-size`}>Bids</span>
                  <div className="equipment-details border-grey mt-2">
                    {bids.results.map((item, index) => (
                      <div
                        key={index}
                        className={`ml-2 py-2 pointer ${
                          index === bids.results.length - 1
                            ? ''
                            : 'border-bottom'
                        }`}
                        onClick={() => {}}
                      >
                        <span>
                          <FormattedNumber
                            value={item.total_value}
                            style="currency"
                            currency={'usd'}
                          />
                          {` - ${3} machines`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-100 d-flex justify-content-end mt-4">
                <Button
                  className="jr-btn bg-white border"
                  onClick={() => this.setState({ d_open: true })}
                >
                  <span className="text-secondary">Cancel RFQ</span>
                </Button>
              </div>
            </div>
          )}
        </div>
        <SnackBar
          open={open}
          error={error}
          variant={variant}
          snackbarClose={() => this.snackbarClose()}
        />
        <Dialog open={d_open} onClose={() => this.setState({ d_open: false })}>
          <DialogTitle>
            {'Are you sure you want to cancel this RFQ?'}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.setState({ d_open: false })}
              className="text-grey"
            >
              No
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, content }) => {
  const { authUser } = auth;
  const {
    rfq_items,
    rent_costs,
    datetime_start,
    datetime_end,
    place,
    loader,
    rfq,
    error,
    purpose,
    bid_rfq_items,
    bids,
    typesList,
  } = content;
  return {
    authUser,
    rfq_items,
    rent_costs,
    datetime_start,
    datetime_end,
    place,
    loader,
    rfq,
    error,
    purpose,
    bid_rfq_items,
    bids,
    typesList,
  };
};

export default connect(
  mapStateToProps,
  {
    postRentCosts,
    datetimeStart,
    datetimeEnd,
    getPlace,
    postRfq,
    errorClear,
    getPurpose,
    cancelRfq,
  },
)(SideView);

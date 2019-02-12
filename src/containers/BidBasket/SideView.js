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
import TextField from '@material-ui/core/TextField';
import SnackBar from 'components/utils/SnackBar';
import {
  postBids,
  errorClear,
  getBidBasketSuccess,
  cancelBid,
  getIdRfq,
  ignoreBid,
  acceptBid,
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
      d_open: false,
      transit_value: '',
      modal_btn: null,
    };
  }

  componentDidMount() {
    const { bid_rfq_items, id_bid } = this.props;
    if (bid_rfq_items && bid_rfq_items.transit_value) {
      this.setState({ transit_value: bid_rfq_items.transit_value });
    }
    if (id_bid) {
      this.props.getIdRfq(id_bid.rfq);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rfq !== undefined && nextProps.rfq === '') {
      this.setState({ nextLink: '/account' });
      //this.props.errorClear();
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Error!',
        variant: 'error',
      });
    }
  }

  handlePriceChange = name => event => {
    let { bid_rfq_items } = this.props;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
    bid_rfq_items[name] = value;
    this.props.getBidBasketSuccess(bid_rfq_items);
  };

  handleChange() {
    const { authUser, bid_rfq_items } = this.props;
    const { transit_value } = this.state;

    if (authUser) {
      let bid_items = [];
      bid_rfq_items.rfq_items.map(item => {
        let asset_uids = [];
        item.equip_items &&
          item.equip_items.map(equip => {
            asset_uids.push(equip.uid);
          });
        bid_items.push({
          rfq_item_uid: item.uid,
          asset_uids,
          price_offer: item.price_offer ? item.price_offer : 0,
        });
      });

      let data = {
        rfq_uid: bid_rfq_items.uid,
        transit_value,
        currency: 'usd',
        bid_items,
      };
      this.props.postBids(data);
    } else {
      this.setState({ nextLink: '/login' });
    }
  }

  handleRequestClose = () => {
    const { modal_btn } = this.state;
    const { id_bid } = this.props;

    var data = new FormData();
    data.append('bid_uid', id_bid.uid);

    if (modal_btn === 'cancel') {
      this.props.cancelBid(data);
    } else {
      this.props.ignoreBid(data);
    }
    this.setState({ d_open: false });
  };

  bidAccept = () => {
    const { id_bid } = this.props;

    var data = new FormData();
    data.append('bid_uid', id_bid.uid);
    this.props.acceptBid(data);
  };

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
      d_open,
      transit_value,
      modal_btn,
    } = this.state;
    const {
      loader,
      location,
      bid_rfq_items,
      rfqs,
      id_bid,
      typesList,
    } = this.props;

    if (nextLink)
      return (
        <Redirect
          to={{
            pathname: nextLink,
            state: { from: location },
          }}
        />
      );

    if (bid_rfq_items) {
      let subtotal_value = bid_rfq_items.rfq_items.reduce(
        (a, { price_offer }) => (price_offer ? a + Number(price_offer) : a),
        0,
      );

      let total_value = Number(transit_value) + Number(subtotal_value);

      let views = 0;
      if (rfqs) {
        views = rfqs.results.reduce(
          (a, { num_items }) => (num_items ? a + Number(num_items) : a),
          0,
        );
      }

      let type_state = true;
      bid_rfq_items.rfq_items.map(item => {
        let item_state =
          typesList.find(type => type.value === item.type) !== undefined;
        if (!item_state) {
          type_state = false;
        }
      });

      let price_state = true;
      bid_rfq_items.rfq_items.map(item => {
        if (!item.price_offer) {
          price_state = false;
        }
      });

      let equip_state = true;
      bid_rfq_items.rfq_items.map(item => {
        if (!item.equip_items) {
          equip_state = false;
        }
      });

      console.log(bid_rfq_items);

      return (
        <div className="side-view-width">
          <div className="d-flex flex-column border border-grey rounded-lg p-3">
            {location.pathname === '/bid-basket' && (
              <div className="d-flex flex-row justify-content-between">
                <span className="h3-font-size mb-1">
                  <span className="h3-font-size font-weight-bold">
                    <FormattedNumber value={views} />
                  </span>{' '}
                  views
                </span>
                <span className="h3-font-size mb-1">
                  <span className="h3-font-size font-weight-bold">
                    <FormattedNumber value={bid_rfq_items.rfq_items.length} />
                  </span>{' '}
                  bids submitted
                </span>
              </div>
            )}
            <span className="h3-font-size mb-1">
              Expires:{' '}
              <span className="h3-font-size font-weight-bold">
                <FormattedDate value={new Date(bid_rfq_items.expiration)} />
              </span>
            </span>
            <span className="h3-font-size mb-1">
              Duration:{' '}
              <span className="h3-font-size font-weight-bold">
                <FormattedDate value={new Date(bid_rfq_items.datetime_start)} />
                {' - '}
                <FormattedDate value={new Date(bid_rfq_items.datetime_end)} />
              </span>
            </span>
            <span className="h3-font-size mb-2">
              Type:{' '}
              <span className="h3-font-size font-weight-bold">
                {bid_rfq_items.purpose}
              </span>
            </span>
            <div className="d-flex flex-row align-items-center px-3">
              <i className="zmdi zmdi-pin zmdi-hc-2x text-grey mr-4" />
              <span className="h3-font-size font-weight-bold">
                {`${bid_rfq_items.place.city}, ${bid_rfq_items.place.country}`}
              </span>
            </div>
            <div className="border-bottom my-3 w-100" />
            <span className="h3-font-size mb-1">
              <span className="h3-font-size font-weight-bold">
                <FormattedNumber
                  value={
                    location.pathname === '/bid-renter-summary'
                      ? bid_rfq_items.rfq_items.reduce(
                          (a, { equip_items }) =>
                            equip_items ? a + equip_items.length : a,
                          0,
                        )
                      : bid_rfq_items.rfq_items.reduce(
                          (a, { quantity }) => a + quantity,
                          0,
                        )
                  }
                />
              </span>{' '}
              {location.pathname === '/bid-renter-summary'
                ? 'machines offered'
                : 'machines selected'}
            </span>
            <div className="d-flex flex-row align-items-center mb-1">
              <span className="h3-font-size">Subtotal:</span>
              <span className="h3-font-size font-weight-bold ml-3 mr-1">$</span>
              <TextField
                id="subtotal_value"
                type="number"
                fullWidth
                value={
                  id_bid && location.pathname !== '/bid-basket'
                    ? id_bid.subtotal_value
                    : subtotal_value
                }
                onChange={this.handlePriceChange('subtotal_value')}
                margin="none"
                disabled={true}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-2">
              <span className="h3-font-size">Transit:</span>
              <span className="h3-font-size font-weight-bold ml-3 mr-1">$</span>
              <TextField
                id="transit_value"
                type="number"
                fullWidth
                value={
                  id_bid && location.pathname !== '/bid-basket'
                    ? id_bid.transit_value
                    : transit_value
                }
                onChange={this.handlePriceChange('transit_value')}
                margin="none"
                disabled={location.pathname === '/bid-basket' ? false : true}
              />
            </div>
            <span className="h3-font-size">
              Total:
              <span className="h3-font-size font-weight-bold ml-3">
                <FormattedNumber
                  value={
                    id_bid && location.pathname !== '/bid-basket'
                      ? id_bid.total_value
                      : total_value
                      ? total_value
                      : 0
                  }
                  style="currency"
                  currency={'usd'}
                />
              </span>
            </span>
            {location.pathname === '/bid-basket' ? (
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
                      transit_value === '' ||
                      !checked ||
                      !type_state ||
                      !price_state ||
                      !equip_state
                        ? 'lighten-1'
                        : 'darken-3'
                    }`}
                    onClick={() => this.handleChange()}
                    disabled={
                      transit_value === '' ||
                      !checked ||
                      !type_state ||
                      !price_state ||
                      !equip_state
                    }
                  >
                    {loader ? (
                      <CircularProgress size={16} className="text-white mx-4" />
                    ) : (
                      <span className="text-white">Submit Bid</span>
                    )}
                  </Button>
                </div>
              </div>
            ) : location.pathname === '/bid-renter-summary' ? (
              <div className="px-3 pt-3 w-100">
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    className="jr-btn bg-grey darken-3"
                    onClick={() => this.bidAccept()}
                  >
                    {loader ? (
                      <CircularProgress size={16} className="text-white mx-4" />
                    ) : (
                      <span className="text-white">Accept bid</span>
                    )}
                  </Button>
                </div>
                <div className="w-100 d-flex justify-content-end mt-5">
                  <Button
                    className="jr-btn bg-white border"
                    onClick={() =>
                      this.setState({ d_open: true, modal_btn: 'ignore' })
                    }
                  >
                    <span className="text-secondary">Ignore bid</span>
                  </Button>
                </div>
              </div>
            ) : (
              location.pathname === '/bid-owner-summary' && (
                <div className="w-100 d-flex justify-content-end mt-4">
                  <Button
                    className="jr-btn bg-white border"
                    onClick={() =>
                      this.setState({ d_open: true, modal_btn: 'cancel' })
                    }
                  >
                    <span className="text-secondary">Cancel bid</span>
                  </Button>
                </div>
              )
            )}
          </div>
          <SnackBar
            open={open}
            error={error}
            variant={variant}
            snackbarClose={() => this.snackbarClose()}
          />
          <Dialog
            open={d_open}
            onClose={() => this.setState({ d_open: false })}
          >
            <DialogTitle>
              {`Are you sure you want to ${modal_btn} this bid?`}
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

    return null;
  }
}

const mapStateToProps = ({ auth, content }) => {
  const { authUser } = auth;
  const { loader, rfq, error, rfqs, cancel_bid, id_bid, typesList } = content;
  return {
    authUser,
    loader,
    rfq,
    error,
    rfqs,
    cancel_bid,
    id_bid,
    typesList,
  };
};

export default connect(
  mapStateToProps,
  {
    postBids,
    errorClear,
    getBidBasketSuccess,
    cancelBid,
    getIdRfq,
    ignoreBid,
    acceptBid,
  },
)(SideView);

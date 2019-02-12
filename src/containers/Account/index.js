import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedNumber, FormattedDate } from 'react-intl';
import SideView from './SideView';
import ListItem from 'containers/BidSearchResults/ListItem';
import RegistryListItem from 'containers/BuySearchResults/ListItem';
import {
  getFeed,
  getRfqs,
  getBidBasket,
  getBids,
  getOrgEquip,
  getBuyEquip,
  getUsers,
  getIdBid,
} from 'actions/Content';
import { userSignOut } from 'actions/Auth';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      Link: undefined,
      status: 'feeds',
      btnClick: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;

    this.props.getFeed();
    this.props.getRfqs();
    this.props.getBids();
    this.props.getOrgEquip();
    this.props.getUsers();

    if (location.state && location.state.status) {
      this.setState({ status: location.state.status });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { btnClick } = this.state;
    if (
      nextProps.bid_rfq_items &&
      nextProps.bid_rfq_items.rfq_items &&
      nextProps.bid_rfq_items.rfq_items.length > 0 &&
      btnClick
    ) {
      this.setState({
        Link: `/rent-summary`,
        btnClick: false,
      });
    }
    if (
      nextProps.id_bid &&
      nextProps.id_bid.bid_items &&
      nextProps.id_bid.bid_items.length > 0 &&
      btnClick
    ) {
      this.setState({
        Link: `/bid-owner-summary`,
        btnClick: false,
      });
    }
    if (
      nextProps.buy_equip_details &&
      nextProps.org_equipment_list &&
      btnClick
    ) {
      this.setState({
        Link: `/buy-equipment-profile/${nextProps.buy_equip_details.uid}`,
        btnClick: false,
      });
    }
  }

  setStatus = status => {
    this.setState({ status });
    if (status === 'Profile') {
      this.setState({ Link: '/user-profile' });
    } else if (status === 'Change password') {
      this.setState({ Link: '/change-password' });
    } else if (status === 'Logout') {
      this.props.userSignOut();
    }
  };

  handleChange = url => {
    this.props.getBidBasket(url);
    this.setState({ btnClick: true });
  };

  handleRegistryChange = result => {
    this.props.getBuyEquip(result.url);
    this.setState({ btnClick: true });
  };

  rfqFeeds = () => {
    const { rfqs } = this.props;
    return rfqs && rfqs.count > 0
      ? rfqs.results.map((result, index) => (
          <ListItem
            key={index}
            result={result}
            handleChange={this.handleChange.bind(this)}
          />
        ))
      : this.noResults('RFQs');
  };

  bidFeeds = () => {
    const { bids } = this.props;
    return bids && bids.count > 0
      ? bids.results.map((result, index) => (
          <div
            key={index}
            className="d-flex flex-column justify-content-center pointer border border-grey rounded-lg p-3 mb-3"
            onClick={() => {
              this.props.getIdBid(result.url);
              this.setState({ btnClick: true });
            }}
          >
            <div className="d-flex flex-row align-items-center">
              <span className="h3-font-size mr-4">
                Date posted:{' '}
                <span className="h3-font-size font-weight-bold">
                  <FormattedDate value={new Date(result.datetime_created)} />
                </span>
              </span>
              <span className="h3-font-size">
                UID:{' '}
                <span className="h3-font-size font-weight-bold">
                  {result.uid}
                </span>
              </span>
            </div>
            <div className="d-flex flex-row align-items-center mt-1">
              <span className="h3-font-size mr-4">
                Subtotal:{' '}
                <span className="h3-font-size font-weight-bold">
                  <FormattedNumber
                    value={result.subtotal_value}
                    style="currency"
                    currency={'usd'}
                  />
                </span>
              </span>
              <span className="h3-font-size mr-4">
                Transit:{' '}
                <span className="h3-font-size font-weight-bold">
                  <FormattedNumber
                    value={result.transit_value}
                    style="currency"
                    currency={'usd'}
                  />
                </span>
              </span>
              <span className="h3-font-size mr-4">
                Total:{' '}
                <span className="h3-font-size font-weight-bold">
                  <FormattedNumber
                    value={result.total_value}
                    style="currency"
                    currency={'usd'}
                  />
                </span>
              </span>
            </div>
          </div>
        ))
      : this.noResults('Bids');
  };

  registryFeeds = () => {
    const { org_equipment_list } = this.props;
    return org_equipment_list && org_equipment_list.length > 0
      ? org_equipment_list.map((result, index) => (
          <RegistryListItem
            key={index}
            result={result}
            handleChange={this.handleRegistryChange.bind(this)}
          />
        ))
      : this.noResults('Registry');
  };

  usersFeeds = () => {
    const { sub_users } = this.props;
    return (
      <div className="d-flex flex-column justify-content-center border border-grey rounded-lg p-3">
        {sub_users &&
          sub_users.length > 0 &&
          sub_users.map((result, index) => (
            <div
              key={index}
              className="d-flex flex-row align-items-center justify-content-between border-bottom border-grey p-3"
            >
              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <div className="d-flex flex-column">
                    <span className="h3-font-size">{result.full_name}</span>
                    <span className="h3-font-size text-grey">
                      {result.email}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="d-flex align-items-center h-100">
                    <span className="h3-font-size text-grey">
                      Active since:{' '}
                      <FormattedDate
                        value={new Date(result.datetime_created)}
                      />
                    </span>
                  </div>
                </Grid>
              </Grid>
              <i
                className="zmdi zmdi-delete zmdi-hc-2x text-grey pointer"
                onClick={() => {}}
              />
            </div>
          ))}
        <div className="w-100 d-flex justify-content-end mt-5">
          <Button
            className="jr-btn bg-white border"
            onClick={() => this.setState({ Link: '/sub-account' })}
          >
            <span className="text-secondary">Add new user</span>
          </Button>
        </div>
      </div>
    );
  };

  feeds = () => {
    const { feeds } = this.props;
    return feeds && feeds !== '' ? <div>{feeds}</div> : this.noResults('feeds');
  };

  noResults = name => {
    return (
      <div className="d-flex justify-content-center w-100">
        <h2 className="mt-5">{`No ${name}.`}</h2>
      </div>
    );
  };

  render() {
    const { Link, status } = this.state;
    const { location, loader, feeds } = this.props;

    if (Link) return <Redirect to={Link} />;

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
                  pathname={location.pathname}
                  setStatus={this.setStatus.bind(this)}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                {loader ? (
                  <div className="d-flex justify-content-center align-items-center w-100 p-5">
                    <CircularProgress size={80} className="text-secondary" />
                  </div>
                ) : status === 'RFQs' ? (
                  this.rfqFeeds()
                ) : status === 'Bids' ? (
                  this.bidFeeds()
                ) : status === 'Registry' || status === 'Posts' ? (
                  this.registryFeeds()
                ) : status === 'Users' ? (
                  this.usersFeeds()
                ) : (
                  status === 'feeds' && this.feeds()
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ content }) => {
  const {
    loader,
    error,
    feeds,
    rfqs,
    bid_rfq_items,
    bids,
    org_equipment_list,
    buy_equip_details,
    sub_users,
    id_bid,
  } = content;
  return {
    loader,
    error,
    feeds,
    rfqs,
    bid_rfq_items,
    bids,
    org_equipment_list,
    buy_equip_details,
    sub_users,
    id_bid,
  };
};

export default connect(
  mapStateToProps,
  {
    getFeed,
    getRfqs,
    getBidBasket,
    getBids,
    getOrgEquip,
    getBuyEquip,
    getUsers,
    getIdBid,
    userSignOut,
  },
)(Account);

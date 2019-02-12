import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Filter from 'components/Filter';
import SideView from './SideView';
import ListView from 'containers/RentSearchResults/ListView';

class BidBasket extends React.Component {
  constructor() {
    super();
    this.state = { Link: undefined };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.equip_details) {
      this.setState({
        Link: `/equipment-profile/${nextProps.equip_details.uid}`,
      });
    }
  }

  render() {
    const { Link } = this.state;
    const { location, bid_rfq_items } = this.props;

    if (Link) return <Redirect to={Link} />;

    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={7} md={8} className="app-logo-content">
              <ListView pathname={location.pathname} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              className="app-login-content d-flex justify-content-center"
            >
              <SideView location={location} bid_rfq_items={bid_rfq_items} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { equip_details, bid_rfq_items } = content;
  return {
    equip_details,
    bid_rfq_items,
  };
};

export default connect(mapStateToProps)(BidBasket);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import ReactStars from 'react-stars';
import NameList from 'components/SideViewComponents/NameList';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  leftView = () => {
    const { user_profile } = this.props;
    return (
      <div>
        <NameList
          title="Location:"
          name={`${user_profile.user_place.city}, ${
            user_profile.user_place.country
          }`}
          style="ml-2"
        />
        <NameList title="Email:" name={user_profile.user_email} style="ml-2" />
        <NameList
          title="Phone:"
          name={user_profile.user_phone_number}
          style="ml-2"
        />
        <NameList
          title="Name:"
          name={user_profile.user_full_name}
          style="ml-2"
        />
      </div>
    );
  };

  render() {
    const { user_profile } = this.props;
    return (
      <div className="side-view-width">
        <div className="bg-grey lighten-3 mb-4">
          <div className="double-line d-flex flex-row justify-content-between align-items-center p-2">
            <span className="font-weight-bold">{user_profile.org_name}</span>
            <i className={`zmdi zmdi-edit zmdi-hc-2x pointer`} />
          </div>
          <div className="p-3">{this.leftView()}</div>
        </div>
        <div className="bg-grey lighten-3 mb-4 p-3">
          <h2 className="font-weight-bold">My Ratings</h2>
          <div className="d-flex flex-row justify-content-between align-items-center mt-2">
            <img
              src={
                user_profile.is_org_legit
                  ? 'assets/images/trophy_selected.png'
                  : 'assets/images/trophy.png'
              }
              width="38"
              height="auto"
            />
            <i
              className={`zmdi zmdi-shield-check zmdi-hc-3x ${
                user_profile.is_biz_account ? 'text-primary' : 'text-secondary'
              }`}
            />
            <ReactStars
              count={5}
              value={user_profile.org_rating}
              size={34}
              color1={'#000000'}
              color2={'#FEC40E'}
              className="mt-2"
              edit={false}
            />
          </div>
        </div>
        <Button
          variant="raised"
          fullWidth
          className="jr-btn bg-secondary"
          component={Link}
          to="/post-item"
        >
          <span className="text-white font-weight-bold">List New Asset</span>
        </Button>
      </div>
    );
  }
}

export default connect(null)(SideView);

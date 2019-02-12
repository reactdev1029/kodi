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
import AutoComplete from 'components/AutoComplete';
import GoogleAutoComplete from 'components/GoogleAutoComplete';
import Filter from 'components/Filter';
import SideView from './SideView';
import MainView from './MainView';
import { setInitUrl } from 'actions/Auth';
import { getUserProfile } from 'actions/Content';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.setInitUrl(this.props.location.pathname);
    this.props.getUserProfile();
  }

  render() {
    const { location, asset, user_profile } = this.props;
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
                {user_profile && <SideView user_profile={user_profile} />}
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <MainView asset={asset} />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { asset, user_profile } = content;
  return {
    asset,
    user_profile,
  };
};

export default connect(
  mapStateToProps,
  { setInitUrl, getUserProfile },
)(UserProfile);

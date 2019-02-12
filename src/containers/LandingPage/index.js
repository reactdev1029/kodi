import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import SideView from './SideView';
import ListView from './ListView';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { location } = this.props;

    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <Grid container spacing={16}>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              className="d-flex justify-content-center"
            >
              <SideView />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <ListView pathname={location.pathname} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(null)(LandingPage);

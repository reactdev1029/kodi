import React from 'react';
import Grid from '@material-ui/core/Grid';

const AppDownload = ({}) => {
  return (
    <div className="mt-5">
      <h2 className="font-weight-bold font-italic text-white text-shadow mb-3">
        Now available as a mobile app:
      </h2>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div className="app-download text-center">
            <img
              src={'assets/images/apple.png'}
              alt={'Download from the iTunes store'}
              title={'Download from the iTunes store'}
              className="pointer rounded-xl"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="app-download text-center">
            <img
              src={'assets/images/google.png'}
              alt={'Download from Google play'}
              title={'Download from Google play'}
              className="pointer rounded-xl"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppDownload;

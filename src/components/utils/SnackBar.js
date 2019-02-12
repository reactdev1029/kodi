import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from 'components/SnackbarContent';

const SnackBar = props => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    autoHideDuration={3000}
    open={props.open}
    onClose={props.snackbarClose}
  >
    <SnackbarContentWrapper
      onClose={props.snackbarClose}
      variant={props.variant}
      message={props.error}
    />
  </Snackbar>
);

export default SnackBar;

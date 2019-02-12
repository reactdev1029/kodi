import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChangePasswordForm = ({
  handleChange,
  changePassword,
  btnFlag,
  loader,
}) => {
  return (
    <div className="app-download-width d-flex flex-column align-items-center shadow-xl rounded-lg p-4 opacity animated slideInUpTiny animation-duration-3">
      <i className={`zmdi zmdi-account zmdi-hc-5x mt-3`} />
      <h2 className="font-weight-bold mt-1">Change Password</h2>
      <div className="">
        <TextField
          type="password"
          label="Old password"
          fullWidth
          onChange={handleChange('old_password')}
          margin="dense"
        />
        <TextField
          type="password"
          label="New password"
          fullWidth
          onChange={handleChange('new_password')}
          margin="dense"
        />
        <TextField
          type="password"
          label="Confirm new password"
          fullWidth
          onChange={handleChange('confirm_password')}
          margin="dense"
        />
      </div>
      <div className="mt-5 mb-2 w-100 d-flex align-items-center">
        <Button
          onClick={changePassword}
          fullWidth
          variant="raised"
          className="jr-btn text-uppercase bg-primary-1"
          disabled={btnFlag}
        >
          {loader ? (
            <CircularProgress size={16} className="text-secondary" />
          ) : (
            <span>Change Password</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

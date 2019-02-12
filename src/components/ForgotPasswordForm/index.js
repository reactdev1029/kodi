import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';

const ForgotPasswordForm = ({
  handleChange,
  resetPassword,
  btnFlag,
  loader,
}) => {
  return (
    <div className="app-download-width d-flex flex-column align-items-center shadow-xl rounded-lg p-4 opacity animated slideInUpTiny animation-duration-3">
      <i className={`zmdi zmdi-account zmdi-hc-5x mt-3`} />
      <h2 className="font-weight-bold mt-1">Forgot Password</h2>
      <div className="w-100 d-flex flex-row align-items-center">
        <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
          <i className={`zmdi zmdi-email zmdi-hc-2x`} />
        </div>
        <TextField
          id="email"
          label={<IntlMessages id="appModule.email" />}
          fullWidth
          onChange={handleChange}
          margin="normal"
        />
      </div>
      <div className="mt-4 w-100 d-flex align-items-center">
        <Button
          onClick={resetPassword}
          fullWidth
          variant="raised"
          className="jr-btn text-uppercase bg-primary-1"
          disabled={btnFlag}
        >
          {loader ? (
            <CircularProgress size={16} className="text-secondary" />
          ) : (
            <span>Reset Password</span>
          )}
        </Button>
      </div>
      <div className="w-100 mt-4 d-flex flex-row justify-content-center">
        <span>Remember now?</span>
        <div className="text-blue ml-3 pointer">Login</div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

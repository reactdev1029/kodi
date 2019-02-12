import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';

const LogInForm = ({
  handleChange,
  userSignIn,
  btnFlag,
  loader,
  handleModalClose,
}) => {
  return (
    <div className="app-download-width d-flex flex-column align-items-center p-4 opacity">
      <i className={`zmdi zmdi-account zmdi-hc-5x mt-3`} />
      <h2 className="font-weight-bold mt-1">Sign In</h2>
      <div className="w-100 d-flex flex-row align-items-center">
        <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
          <i className={`zmdi zmdi-email zmdi-hc-2x`} />
        </div>
        <TextField
          id="email"
          label={<IntlMessages id="appModule.email" />}
          fullWidth
          onChange={handleChange('email')}
          margin="normal"
        />
      </div>
      <div className="w-100 d-flex flex-row align-items-center">
        <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
          <i className={`zmdi zmdi-lock zmdi-hc-2x`} />
        </div>
        <TextField
          type="password"
          label={<IntlMessages id="appModule.password" />}
          fullWidth
          onChange={handleChange('password')}
          margin="normal"
        />
      </div>
      <div className="mt-5 w-100 d-flex align-items-center">
        <Button
          onClick={userSignIn}
          fullWidth
          variant="raised"
          className="jr-btn text-uppercase bg-primary-1"
          disabled={btnFlag}
        >
          {loader ? (
            <CircularProgress size={16} className="text-secondary" />
          ) : (
            <IntlMessages id="appModule.signIn" />
          )}
        </Button>
      </div>
      <Link to="/forgot-password" className="text-blue mt-3">
        <div onClick={() => handleModalClose('login_open', false)}>
          Forgot password ?
        </div>
      </Link>
      <div className="w-100 mt-4 d-flex flex-row justify-content-center">
        <span>Don 't have an account?</span>
        <div
          className="text-blue ml-3 pointer"
          onClick={() => handleModalClose('register_open', true)}
        >
          Register
        </div>
      </div>
    </div>
  );
};

export default LogInForm;

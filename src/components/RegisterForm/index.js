import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import GoogleAutoComplete from 'components/GoogleAutoComplete';

const RegisterForm = ({
  handleChange,
  toggle,
  org_address,
  handleSelect,
  addressChange,
  checked,
  activeTab,
  btnFlag,
  organization_name,
  passFlag,
  loader,
  userSignUp,
  handleModalClose,
}) => {
  return (
    <div className="register-box-width d-flex flex-column align-items-center p-4 opacity">
      <i className={`zmdi zmdi-account-add zmdi-hc-5x mt-3`} />
      <h2 className="font-weight-bold mt-1">Sign Up</h2>
      <Nav tabs className="w-100">
        <NavItem className="w-50">
          <NavLink
            className={classnames(
              {
                active: activeTab === '1',
              },
              {
                'tab-active-color': activeTab === '1',
              },
            )}
            onClick={() => toggle('1')}
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <i className={`zmdi zmdi-account zmdi-hc-2x mr-3`} />
              <span className="h3-font-size d-none d-sm-block">Individual</span>
            </div>
          </NavLink>
        </NavItem>
        <NavItem className="w-50">
          <NavLink
            className={classnames(
              {
                active: activeTab === '2',
              },
              {
                'tab-active-color': activeTab === '2',
              },
            )}
            onClick={() => toggle('2')}
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <i className={`zmdi zmdi-accounts zmdi-hc-2x mr-3`} />
              <span className="h3-font-size d-none d-sm-block">Business</span>
            </div>
          </NavLink>
        </NavItem>
      </Nav>
      <Grid container className="px-3">
        <Grid item xs={12} sm={6}>
          <div className="mr-sm-4">
            {activeTab === '2' && (
              <TextField
                label="Organization Name"
                fullWidth
                onChange={handleChange('organization_name')}
                margin="normal"
                value={organization_name}
              />
            )}
            <TextField
              label={activeTab === '1' ? 'Full Name' : 'Admin Name'}
              fullWidth
              onChange={handleChange('admin_name')}
              margin="normal"
            />
            <TextField
              id="email"
              label={activeTab === '1' ? 'Email' : 'Admin Email'}
              fullWidth
              onChange={handleChange('email')}
              margin="normal"
            />
            <TextField
              id="phone_number"
              label="Phone Number"
              fullWidth
              onChange={handleChange('phone_number')}
              margin="normal"
            />
            <div className="mt-3">
              <GoogleAutoComplete
                address={org_address}
                addressChange={addressChange}
                handleSelect={handleSelect}
                label="Physical Address"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="ml-sm-3 mr-sm-2">
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={handleChange('password')}
              margin="normal"
            />
            <TextField
              type="password"
              label="Confirm Password"
              fullWidth
              onChange={handleChange('confirm_password')}
              margin="normal"
              error={passFlag}
            />
          </div>
          <div className="d-flex w-100 flex-column align-items-center mt-5">
            <FormControlLabel
              control={
                <Checkbox
                  className="text-primary"
                  checked={checked}
                  onChange={handleChange('checked')}
                  value="checked"
                />
              }
              label="I agree to the Terms & Conditions"
            />
            <div className="w-75 mt-1">
              <Button
                onClick={userSignUp}
                variant="raised"
                fullWidth
                className="jr-btn text-uppercase bg-primary-1"
                disabled={!btnFlag}
              >
                {loader ? (
                  <CircularProgress size={16} className="text-secondary" />
                ) : (
                  'Register'
                )}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="w-100 mt-3 p-3 d-flex flex-row">
        <span>Already have an account?</span>
        <div
          className="text-blue ml-3 pointer"
          onClick={() => handleModalClose('login_open', true)}
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

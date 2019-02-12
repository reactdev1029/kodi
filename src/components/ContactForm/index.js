import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const ContactForm = ({ handleChange, sendMessage, btnFlag, loader }) => {
  return (
    <div className="register-box-width d-flex flex-column align-items-center shadow-xl rounded-lg p-4 opacity animated slideInUpTiny animation-duration-3">
      <i className={`zmdi zmdi-email zmdi-hc-5x mt-3`} />
      <h2 className="font-weight-bold mt-1">Contact</h2>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div className="w-100 d-flex flex-row align-items-center">
            <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
              <i className={`zmdi zmdi-account zmdi-hc-2x`} />
            </div>
            <TextField
              id="name"
              label="Name"
              fullWidth
              onChange={handleChange('name')}
              margin="dense"
            />
          </div>
          <div className="w-100 d-flex flex-row align-items-center">
            <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
              <i className={`zmdi zmdi-email zmdi-hc-2x`} />
            </div>
            <TextField
              id="email"
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={handleChange('email')}
              margin="dense"
            />
          </div>
          <div className="w-100 d-flex flex-row align-items-center">
            <div className="icon-width d-flex flex-row justify-content-center mr-3 mt-4">
              <i className={`zmdi zmdi-phone zmdi-hc-2x`} />
            </div>
            <TextField
              id="phone"
              label="Phone number"
              fullWidth
              onChange={handleChange('phone')}
              margin="dense"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="message"
            label="Message"
            fullWidth
            multiline
            rows="7"
            onChange={handleChange('message')}
            margin="dense"
          />
        </Grid>
      </Grid>
      <div className="mt-5 mb-2 btn-width d-flex align-items-center">
        <Button
          onClick={sendMessage}
          fullWidth
          variant="raised"
          className="jr-btn text-uppercase bg-primary-1"
          disabled={btnFlag}
        >
          {loader ? (
            <CircularProgress size={16} className="text-secondary" />
          ) : (
            <span>Send</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;

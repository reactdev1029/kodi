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
import { Line } from 'rc-progress';

const HelpText = ({ text }) => (
  <div className="mt-3">
    <span>{text}</span>
  </div>
);

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="side-view-width">
        <Button
          variant="raised"
          fullWidth
          className="jr-btn bg-secondary mb-4"
          onClick={() => this.props.publishRFQ()}
        >
          {this.props.loader ? (
            <CircularProgress size={16} className="text-white" />
          ) : (
            <span className="text-white font-weight-bold">Publish RFQ</span>
          )}
        </Button>
        <div className="bg-grey lighten-3 mb-4 p-4">
          <Line
            percent="70"
            strokeWidth="4"
            trailWidth="4"
            strokeColor="#FEC40E"
          />
          <div className="d-flex flex-row justify-content-between">
            <span>0%</span>
            <span>100%</span>
          </div>
          <HelpText
            text={
              '1) Please tell us the location of your project (i.e. where will shipper deliver equipment to).'
            }
          />
          <HelpText
            text={
              '2) Enter the equipment type (e.g. Excavator), quantity, and dates you need the equipment.'
            }
          />
          <HelpText
            text={
              '3) Use the options to filter out equipment according to manufacture date and machine hours logged. You can also filter according to the model and manufacturer you prefer.'
            }
          />
        </div>
      </div>
    );
  }
}

export default connect(null)(SideView);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedNumber, FormattedDate } from 'react-intl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactStars from 'react-stars';
import NameList from 'components/SideViewComponents/NameList';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { screenSize, selectedInbox, inbox } = this.props;

    return (
      <div className="side-view-width">
        <div className="bg-grey lighten-3">
          <div className="d-flex flex-row align-items-center border-width-2 border-primary p-2">
            <span className="font-weight-bold">Messages</span>
          </div>
          <div
            className="max-height d-flex flex-column horizontal-scroll"
            style={{ height: screenSize.height - 280 }}
          >
            {inbox && inbox.count > 0 ? (
              inbox.results.map((item, index) => (
                <div
                  key={index}
                  className={`d-flex flex-column justify-content-center p-2 border-bottom pointer ${selectedInbox &&
                    selectedInbox.uid === item.uid &&
                    'border-left-2'}`}
                  onClick={() => this.props.inboxClick(item)}
                >
                  <span className="h3-font-size font-weight-bold">
                    {item.title}
                  </span>
                  <span className="h3-font-size font-weight-bold mt-3">
                    <FormattedDate value={new Date(item.datetime_created)} />
                  </span>
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center mt-3">
                <span className="h3-font-size font-weight-bold">
                  No messages
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(SideView);

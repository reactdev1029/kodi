import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedNumber, FormattedDate } from 'react-intl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import ReactStars from 'react-stars';
import Geocode from 'react-geocode';
import { getAsset } from 'actions/Content';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { messages, selectedInbox, loader, screenSize, message } = this.props;

    let align = true;
    let date_state = true;

    if (selectedInbox) {
      return (
        <div style={{ height: screenSize.height - 280 }}>
          <div className="bg-grey lighten-3 p-2">
            <div className="d-flex flex-row align-items-center border-width-2 border-primary px-2">
              <span className="font-weight-bold">{selectedInbox.title}</span>
            </div>
            <div
              className="bg-white d-flex flex-column horizontal-scroll mt-2 p-2"
              style={{ height: screenSize.height - 420 }}
            >
              {messages &&
                messages.count > 0 &&
                messages.results.map((item, index) => {
                  let date = moment(item.datetime_created).format(
                    'dddd, MMMM DD, YYYY',
                  );
                  if (
                    index !== 0 &&
                    item.creator !== messages.results[index - 1].creator
                  ) {
                    align = !align;
                  }
                  if (index !== 0) {
                    if (
                      date !==
                      moment(
                        messages.results[index - 1].datetime_created,
                      ).format('dddd, MMMM DD, YYYY')
                    ) {
                      date_state = true;
                    } else {
                      date_state = false;
                    }
                  } else {
                    date_state = true;
                  }

                  return (
                    <div
                      key={index}
                      className={`d-flex flex-column p-3 justify-content-center align-items-${
                        align ? 'start' : 'end'
                      }`}
                    >
                      {date_state && (
                        <div className="d-flex w-100 flex-row align-items-center justify-content-center py-2">
                          <div
                            className="border-bottom mr-3"
                            style={{ width: screenSize.width / 5 }}
                          />
                          <span className="h3-font-size font-weight-bold text-grey">
                            {date}
                          </span>
                          <div
                            className="border-bottom ml-3"
                            style={{ width: screenSize.width / 5 }}
                          />
                        </div>
                      )}
                      {align ? (
                        <div className="d-flex flex-row">
                          <span className="h3-font-size font-weight-bold">
                            {item.creator}
                          </span>
                          <span className="h3-font-size ml-4">
                            {moment(item.datetime_created).format('hh:mm A')}
                          </span>
                        </div>
                      ) : (
                        <div className="d-flex flex-row">
                          <span className="h3-font-size mr-4">
                            {moment(item.datetime_created).format('hh:mm A')}
                          </span>
                          <span className="h3-font-size font-weight-bold">
                            {item.creator}
                          </span>
                        </div>
                      )}
                      <span className="h3-font-size mt-1">{item.message}</span>
                    </div>
                  );
                })}
            </div>
            <div
              className="border-top-4 bg-white mt-2 px-1"
              style={{ height: 80 }}
            >
              <Input
                id="message"
                margin="dense"
                fullWidth
                multiline
                rowsMax="3"
                disableUnderline={true}
                placeholder="Type something..."
                value={message}
                onChange={this.props.messageChange('message')}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end w-100 mt-2 mb-3">
            <Button
              className="jr-btn bg-primary"
              onClick={() => this.props.handleChange(selectedInbox.uid)}
              style={{ width: 160 }}
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
    }

    return null;
  }
}

export default MainView;

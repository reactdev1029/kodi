import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SideView from './SideView';
import MainView from './MainView';
import { getInbox, getMessages, postMessage } from 'actions/Content';

class Messages extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedInbox: undefined,
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { inbox } = nextProps;
    const { selectedInbox } = this.state;
    if (inbox && inbox.count > 0 && !selectedInbox) {
      this.setState({ selectedInbox: inbox.results[0] });
      this.props.getMessages(inbox.results[0].uid);
    }
  }

  componentDidMount() {
    this.props.getInbox();
  }

  inboxClick = item => {
    this.setState({ selectedInbox: item });
    this.props.getMessages(item.uid);
  };

  messageChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChange = uid => {
    const { message } = this.state;
    var data = new FormData();
    data.append('conversation_uid', uid);
    data.append('message', message);
    data.append('attachment', null);
    this.props.postMessage(data);
    this.setState({ message: '' });
  };

  render() {
    const { location, screenSize, inbox, messages, loader } = this.props;
    const { selectedInbox, message } = this.state;
    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <Grid container spacing={16}>
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                className="d-flex justify-content-center"
              >
                <SideView
                  screenSize={screenSize}
                  selectedInbox={selectedInbox}
                  inbox={inbox}
                  inboxClick={this.inboxClick.bind(this)}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <MainView
                  screenSize={screenSize}
                  messages={messages}
                  selectedInbox={selectedInbox}
                  loader={loader}
                  messageChange={this.messageChange.bind(this)}
                  message={message}
                  handleChange={this.handleChange.bind(this)}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content, settings }) => {
  const { loader, error, inbox, messages } = content;
  const { screenSize } = settings;
  return {
    loader,
    error,
    inbox,
    screenSize,
    messages,
  };
};

export default connect(
  mapStateToProps,
  { getInbox, getMessages, postMessage },
)(Messages);

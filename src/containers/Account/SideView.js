import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { pathname } = this.props;
    let activity = ['RFQs', 'Bids', 'Posts', 'Registry'];
    let settings = ['Profile', 'Users', 'Change password', 'Logout'];

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          <span className={`h3-font-size`}>Activity</span>
          <div className="equipment-details border-grey mt-2">
            {activity.map((item, index) => (
              <div
                key={index}
                className={`ml-2 py-2 pointer ${
                  index === activity.length - 1 ? '' : 'border-bottom'
                }`}
                onClick={() => this.props.setStatus(item)}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-grey rounded-lg p-3 mt-3">
          <span className={`h3-font-size`}>Account settings</span>
          <div className="equipment-details border-grey mt-2">
            {settings.map((item, index) => (
              <div
                key={index}
                className={`ml-2 py-2 pointer ${
                  index === settings.length - 1 ? '' : 'border-bottom'
                }`}
                onClick={() => this.props.setStatus(item)}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(SideView);

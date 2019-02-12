import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber, FormattedDate } from 'react-intl';

class ListItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { result } = this.props;

    return (
      <div
        className="d-flex flex-row align-items-center pointer border border-grey rounded-lg p-2 mb-3"
        onClick={() => this.props.handleChange(result.url)}
      >
        <div className="d-flex flex-column justify-content-center border-right border-grey p-1 pr-4 mr-4">
          <h3 className="font-weight-bold">{result.place.country}</h3>
          <span className="h3-font-size">{result.purpose}</span>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex flex-row align-items-center">
            <span className="h3-font-size mr-4">
              Date posted:{' '}
              <span className="h3-font-size font-weight-bold">
                <FormattedDate value={new Date(result.datetime_created)} />
              </span>
            </span>
            <span className="h3-font-size">
              Duration:{' '}
              <span className="h3-font-size font-weight-bold">
                <FormattedDate value={new Date(result.datetime_start)} />
                {' - '}
                <FormattedDate value={new Date(result.datetime_end)} />
              </span>
            </span>
          </div>
          <span className="h3-font-size mt-1">
            <span className="h2-font-size font-weight-bold">
              <FormattedNumber value={result.num_items} />
            </span>{' '}
            machines requested: Excavator, Bulldozer, Crane
          </span>
        </div>
      </div>
    );
  }
}

export default connect(null)(ListItem);

import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import ReactStars from 'react-stars';

class ListItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { result } = this.props;

    return (
      <div
        className="d-flex flex-row border rounded-lg p-2 mb-3 pointer"
        onClick={() => this.props.handleChange(result)}
      >
        <Grid container spacing={16}>
          <Grid item xs={12} lg={3}>
            <div className="d-flex flex-column justify-content-center h-100">
              <span className="h4-font-size font-weight-bold">
                {result.manufacturer}
              </span>
              <span className="h3-font-size font-weight-bold">{`${
                result.quip_type
                  ? result.quip_type
                  : result.type
                  ? result.type
                  : ''
              } ${result.model}`}</span>
              <div className="d-flex flex-row align-items-center mt-2">
                {result.org_rating && (
                  <ReactStars
                    count={5}
                    value={Number(result.org_rating)}
                    size={30}
                    color1={'#000000'}
                    color2={'#FEC40E'}
                    edit={false}
                  />
                )}
                {result.is_verified && (
                  <i
                    className={`zmdi zmdi-shield-check zmdi-hc-3x ml-3 ${
                      result.is_verified ? 'text-primary' : 'text-secondary'
                    }`}
                  />
                )}
                {result.is_org_legit && (
                  <img
                    src={
                      result.is_org_legit
                        ? 'assets/images/trophy_selected.png'
                        : 'assets/images/trophy.png'
                    }
                    width="36"
                    height="36"
                    className="ml-3"
                  />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={3}>
            <div className="d-flex flex-column justify-content-center h-100">
              <h1 className="">
                <FormattedNumber
                  value={result.purchase_price}
                  style="currency"
                  currency={result.currency ? result.currency : 'usd'}
                />
              </h1>
              <h2 className="">
                <FormattedNumber
                  value={result.rental_price}
                  style="currency"
                  currency={result.currency ? result.currency : 'usd'}
                />
                {` / day`}
              </h2>
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
            <div className="d-flex flex-row align-items-center">
              <div className="mr-4 d-none d-md-block">
                <img
                  src={result.thumbnail_url ? result.thumbnail_url : ''}
                  className="most-img-width rounded-lg pointer"
                />
              </div>
              {result.place &&
                result.manufacture_date &&
                result.machine_hours &&
                result.machine_distance && (
                  <div className="d-flex flex-column justify-content-center h-100">
                    <span className="h3-font-size font-weight-bold">
                      {`${result.place.city}, ${result.place.country}`}
                    </span>
                    <span className="h3-font-size font-weight-bold">
                      Cool Parts LTD
                    </span>
                    <span className="h3-font-size font-weight-bold">
                      <FormattedDate
                        value={new Date(result.manufacture_date)}
                      />
                    </span>
                    <span className="h3-font-size font-weight-bold">
                      <FormattedNumber value={result.machine_hours} />
                      {` hrs / `}
                      <FormattedNumber value={result.machine_distance} />
                      {' km'}
                    </span>
                  </div>
                )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null)(ListItem);

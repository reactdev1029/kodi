import React from 'react';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class DetailsView extends React.Component {
  constructor() {
    super();
    this.state = { metric: '1', idx: 0, open: false };
  }

  handleChange = name => {
    this.setState({ metric: name });
  };

  handleChangeIndex(idx) {
    this.setState({ idx }, () => this.dotView(idx));
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  dotView = idx => {
    const { result } = this.props;
    return (
      <div className="dot-view-width p-3 d-flex flex-row justify-content-center">
        {result.images &&
          result.images.length > 0 &&
          result.images.map((image, index) => (
            <div
              key={index}
              className={`dot-view ${
                idx === index ? 'bg-primary-1' : 'bg-grey lighten-1'
              } mx-2`}
            />
          ))}
      </div>
    );
  };

  slideView = idx => {
    const { result } = this.props;
    return (
      <div className="slider-content">
        <AutoPlaySwipeableViews
          enableMouseEvents
          autoplay={true}
          index={idx}
          interval={6000}
          onChangeIndex={idx => this.handleChangeIndex(idx)}
          className="type-thumbnail-width rounded-xl"
        >
          {result.images &&
            result.images.length > 0 &&
            result.images.map((image, index) => (
              <img key={index} src={image} className="img-thumbnail-width" />
            ))}
        </AutoPlaySwipeableViews>
        <i
          className={`zmdi zmdi-zoom-in zmdi-hc-3x text-gray zoom-icon pointer d-none d-md-block`}
          onClick={() => this.setState({ open: true })}
        />
      </div>
    );
  };

  slideModalView = idx => {
    const { result } = this.props;
    return (
      <div className="slider-content">
        <AutoPlaySwipeableViews
          enableMouseEvents
          autoplay={true}
          index={idx}
          interval={6000}
          onChangeIndex={idx => this.handleChangeIndex(idx)}
          className="type-thumbnail-modal-width"
        >
          {result.images &&
            result.images.length > 0 &&
            result.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="img-thumbnail-modal-width"
              />
            ))}
        </AutoPlaySwipeableViews>
        <i
          className={`zmdi zmdi-close zmdi-hc-3x text-gray close-icon pointer d-none d-md-block`}
          onClick={() => this.setState({ open: false })}
        />
      </div>
    );
  };

  render() {
    const { metric, idx, open } = this.state;
    const { result } = this.props;

    return (
      <div className="equipment-details border-grey mb-4 py-3">
        <Grid container spacing={16}>
          <Grid
            item
            xs={12}
            md={5}
            className="d-flex d-md-block flex-column align-items-center"
          >
            <h2 className="font-weight-bold">{result.manufacturer}</h2>
            <h3 className="font-weight-bold">
              {result.quip_type} {result.model}
            </h3>
            {result.images && result.images.length > 0 && this.slideView(idx)}
            {result.images && result.images.length > 0 && this.dotView(idx)}
          </Grid>
          <Grid item xs={12} md={7}>
            <div className="d-flex flex-row align-items-center px-2">
              <div className="border-right border-grey">
                <span className="h3-font-size font-weight-bold mr-3">
                  <FormattedNumber
                    value={result.purchase_price}
                    style="currency"
                    currency={result.currency}
                  />{' '}
                  {result.currency.toUpperCase()}
                </span>
              </div>
              <span className="h3-font-size font-weight-bold ml-3">
                <FormattedNumber
                  value={result.rental_price}
                  style="currency"
                  currency={result.currency}
                />
                {' / day'}
              </span>
            </div>
            <div className="d-flex flex-row px-2 mt-3">
              <h3 className="w-50">Serial Number</h3>
              <h3 className="w-50">{result.serial_number}</h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Available Fittings</h3>
              <h3 className="w-50">{result.fittings}</h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Manufacture Date</h3>
              <h3 className="w-50">
                <FormattedDate value={new Date(result.manufacture_date)} />
              </h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Machine Hours</h3>
              <h3 className="w-50">
                <FormattedNumber
                  value={result.machine_hours ? result.machine_hours : 0}
                />
                {' hrs'}
              </h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Machine Distance</h3>
              <h3 className="w-50">
                <FormattedNumber
                  value={result.machine_distance ? result.machine_distance : 0}
                />
                {' km'}
              </h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Net Power (kW)</h3>
              <h3 className="w-50">
                <FormattedNumber
                  value={result.net_power_kw ? result.net_power_kw : 0}
                />
              </h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Operating Weight (kg)</h3>
              <h3 className="w-50">
                <FormattedNumber
                  value={
                    result.operating_weight_kg ? result.operating_weight_kg : 0
                  }
                />
              </h3>
            </div>
            <div className="d-flex flex-row px-2">
              <h3 className="w-50">Max Reach/Depth (m)</h3>
              <h3 className="w-50">
                <FormattedNumber
                  value={result.max_reach_m ? result.max_reach_m : 0}
                />
                {' / '}
                <FormattedNumber
                  value={result.max_depth_m ? result.max_depth_m : 0}
                />
              </h3>
            </div>
            {/*<div className="d-flex flex-row mt-2 w-50 rounded-lg btn-border bg-primary-1">
              <div
                className={`w-50 d-flex justify-content-center align-items-center ${
                  metric === '1' ? 'bg-primary-1' : 'bg-white'
                } p-1 btn-left-radius pointer`}
                onClick={() => this.handleChange('1')}
              >
                <span className="font-weight-bold">Metric</span>
              </div>
              <div
                className={`w-50 d-flex justify-content-center align-items-center ${
                  metric === '2' ? 'bg-primary-1' : 'bg-white'
                } p-1 btn-right-radius pointer`}
                onClick={() => this.handleChange('2')}
              >
                <span className="font-weight-bold">Imperial</span>
              </div>
              </div>*/}
          </Grid>
        </Grid>
        <Dialog open={open} onClose={this.handleRequestClose} maxWidth={'md'}>
          {result.images &&
            result.images.length > 0 &&
            this.slideModalView(idx)}
        </Dialog>
      </div>
    );
  }
}

export default DetailsView;

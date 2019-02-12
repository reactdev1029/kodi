import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ReactStars from 'react-stars';
import NameList from 'components/SideViewComponents/NameList';
import SnackBar from 'components/utils/SnackBar';
import { postBuy, errorClear } from 'actions/Content';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {
      bid_price: '',
      checked: false,
      open: false,
      error: '',
      variant: '',
      nextLink: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rfq !== undefined && nextProps.rfq === '') {
      this.setState({ nextLink: '/account' });
      this.props.errorClear();
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Error!',
        variant: 'error',
      });
    }
  }

  handleChange() {
    const { authUser, result } = this.props;
    const { bid_price } = this.state;
    if (authUser) {
      let data = {
        asset_uid: result.uid,
        price: Number(bid_price),
        currency: result.currency,
      };
      this.props.postBuy(data);
    } else {
      this.setState({ nextLink: '/login' });
    }
  }

  handlePriceChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  snackbarClose = () => {
    this.setState({ open: false });
  };

  leftView = () => {
    const { result } = this.props;
    let leftView = [];
    leftView.push(
      <NameList
        key={0}
        title="Provider:"
        name={'Cool Parts LTD'}
        style="w-50"
      />,
    );
    if (result.quip_type) {
      leftView.push(
        <NameList key={1} title="Type:" name={result.quip_type} style="w-50" />,
      );
    }
    if (result.manufacturer) {
      leftView.push(
        <NameList
          key={2}
          title="Manufacturer:"
          name={result.manufacturer}
          style="w-50"
        />,
      );
    }
    if (result.model) {
      leftView.push(
        <NameList key={3} title="Model:" name={result.model} style="w-50" />,
      );
    }
    if (result.place) {
      leftView.push(
        <NameList
          key={4}
          title="Location:"
          name={
            result.place.city
              ? `${result.place.city}, ${result.place.country}`
              : result.place.country
          }
          style="w-50"
        />,
      );
    }
    return leftView;
  };

  render() {
    const { bid_price, checked, open, error, variant, nextLink } = this.state;
    const { result, pathname, loader } = this.props;

    if (nextLink) return <Redirect to={nextLink} />;

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          <div className="p-2">{this.leftView()}</div>
          <div className="d-flex flex-row justify-content-between align-items-center mt-2">
            <img
              src={
                result.is_org_legit
                  ? 'assets/images/trophy_selected.png'
                  : 'assets/images/trophy.png'
              }
              width="38"
              height="auto"
            />
            <i
              className={`zmdi zmdi-shield-check zmdi-hc-3x ${
                result.is_verified ? 'text-primary' : 'text-secondary'
              }`}
            />
            <ReactStars
              count={5}
              value={result.org_rating ? Number(result.org_rating) : 0}
              size={34}
              color1={'#000000'}
              color2={'#FEC40E'}
              className="mt-2"
              edit={false}
            />
          </div>
        </div>
        {pathname === `/buy-equipment-profile/${result.uid}` && (
          <div className="d-flex flex-column align-items-center p-3 w-100">
            <FormControlLabel
              control={
                <Checkbox
                  className="text-primary"
                  checked={checked}
                  onChange={(e, checked) => this.setState({ checked })}
                  value={'checked'}
                />
              }
              className="my-2"
              label={
                <span className="h3-font-size font-weight-bold">
                  I have read and accept KODI's{' '}
                  <Link to={'/'}>Terms & Conditions</Link>
                </span>
              }
            />
            <Button
              className={`jr-btn bg-grey ${
                !checked ? 'lighten-1' : 'darken-3'
              }`}
              onClick={() => {}}
              fullWidth
              disabled={!checked}
            >
              {loader ? (
                <CircularProgress size={16} className="text-white mx-4" />
              ) : (
                <span className="text-white">Contact Provider</span>
              )}
            </Button>
          </div>
        )}
        <SnackBar
          open={open}
          error={error}
          variant={variant}
          snackbarClose={() => this.snackbarClose()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, content }) => {
  const { authUser } = auth;
  const { loader, rfq, error } = content;
  return {
    authUser,
    loader,
    rfq,
    error,
  };
};

export default connect(
  mapStateToProps,
  { postBuy, errorClear },
)(SideView);

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import SnackBar from 'components/utils/SnackBar';
import RegisterForm from 'components/RegisterForm';
import { userSignUp, setInitUrl } from 'actions/Auth';

class Register extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      organization_name: '',
      admin_name: '',
      phone_number: '',
      email: '',
      password: '',
      confirm_password: '',
      activeTab: '1',
      checked: false,
      org_address: '',
      city: '',
      country: '',
      address: '',
      latitude: null,
      longitude: null,
      initURL: undefined,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleChange = name => (event, checked) => {
    if (name === 'checked') {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  addressChange = address => {
    this.setState({ org_address: address, city: '', country: '', address: '' });

    this.getAddress(address);
  };

  handleSelect = address => {
    this.setState({ org_address: address, city: '', country: '', address: '' });

    this.getAddress(address);

    //  geocodeByAddress(address).then(results => this.autoCompleted(results[0]));

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({ latitude: latLng.lat, longitude: latLng.lng }),
      )
      .catch(error => console.error('Error', error));
  };

  getAddress(address) {
    let res = address.split(', ');
    if (res.length === 1) {
      this.setState({ country: res[0] });
    } else if (res.length === 2) {
      this.setState({ country: res[1], city: res[0] });
    } else if (res.length === 3) {
      this.setState({ country: res[2], city: res[0] });
    } else if (res.length === 4) {
      this.setState({
        country: res[3],
        city: res[1],
        address: res[0],
      });
    } else if (res.length >= 5) {
      this.setState({
        country: res[res.length - 1],
        city: res[res.length - 3],
        address: res[res.length - 5] + ', ' + res[res.length - 4],
      });
    }
  }

  userSignUp() {
    const {
      organization_name,
      admin_name,
      phone_number,
      email,
      password,
      activeTab,
      city,
      country,
      address,
      latitude,
      longitude,
    } = this.state;

    let data = {
      is_business_account: activeTab === '1' ? false : true,
      organization_name,
      admin_name,
      email,
      phone_number,
      password,
      place: {
        city,
        country,
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
      },
      language: 'en',
      currency: 'USD',
    };

    this.props.userSignUp(data);
  }

  render() {
    const { loader, authUser, modal_open } = this.props;
    const {
      organization_name,
      admin_name,
      phone_number,
      confirm_password,
      email,
      password,
      activeTab,
      checked,
      org_address,
    } = this.state;

    let btnFlag = true;

    if (activeTab === '1') {
      btnFlag =
        (admin_name &&
          phone_number &&
          email &&
          password &&
          confirm_password &&
          org_address) !== '' &&
        password === confirm_password &&
        password.length >= 8 &&
        checked;
    } else {
      btnFlag =
        (organization_name &&
          admin_name &&
          phone_number &&
          email &&
          password &&
          confirm_password &&
          org_address) !== '' &&
        password === confirm_password &&
        password.length >= 8 &&
        checked;
    }

    return (
      <Dialog
        open={modal_open}
        onClose={() => this.props.handleModalClose('register_open', false)}
        maxWidth={'md'}
      >
        <div
          style={{ height: activeTab === '1' ? 578 : 647, overflowX: 'auto' }}
        >
          <RegisterForm
            toggle={this.toggle.bind(this)}
            handleChange={this.handleChange.bind(this)}
            addressChange={this.addressChange.bind(this)}
            handleSelect={this.handleSelect.bind(this)}
            org_address={org_address}
            checked={checked}
            activeTab={activeTab}
            btnFlag={btnFlag}
            organization_name={organization_name}
            passFlag={password !== confirm_password}
            loader={loader}
            userSignUp={() => this.userSignUp()}
            handleModalClose={(name, status) =>
              this.props.handleModalClose(name, status)
            }
          />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, authUser, error } = auth;
  return { loader, authUser, error };
};

export default connect(
  mapStateToProps,
  { userSignUp, setInitUrl },
)(Register);

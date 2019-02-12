import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SnackBar from 'components/utils/SnackBar';
import ChangePasswordForm from 'components/ChangePasswordForm';
import { changePassword } from 'actions/Auth';

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      old_password: '',
      new_password: '',
      confirm_password: '',
      open: false,
      error: '',
      variant: '',
      link: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.changedPassword !== undefined &&
      nextProps.changedPassword === ''
    ) {
      this.setState({
        open: true,
        error: 'Success!',
        variant: 'success',
      });
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Error!',
        variant: 'error',
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  snackbarClose = () => {
    const { changedPassword } = this.props;
    this.setState({ open: false });
    if (changedPassword !== undefined && changedPassword === '') {
      this.setState({ link: '/login' });
    }
  };

  changePassword() {
    const { old_password, new_password } = this.state;
    const { state } = this.props.location;
    let data = {
      email: state ? state.email : '',
      old_password,
      new_password,
    };
    this.props.changePassword(data);
  }

  render() {
    const {
      old_password,
      new_password,
      confirm_password,
      open,
      error,
      variant,
      link,
    } = this.state;
    const { location } = this.props;
    const { loader } = this.props;

    if (link)
      return (
        <Redirect
          to={{
            pathname: link,
            state: { email: location.state ? location.state.email : '' },
          }}
        />
      );

    return (
      <div className="app-wrapper max-height">
        <div className="app-logo-content h-100 d-inline-block d-flex justify-content-center align-items-center">
          <ChangePasswordForm
            handleChange={this.handleChange.bind(this)}
            changePassword={() => this.changePassword()}
            btnFlag={
              (old_password && new_password && confirm_password) === '' ||
              new_password !== confirm_password ||
              new_password.length < 8 ||
              confirm_password.length < 8 ||
              old_password.length < 8
            }
            loader={loader}
          />
        </div>
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

const mapStateToProps = ({ auth }) => {
  const { loader, changedPassword, error } = auth;
  return { loader, changedPassword, error };
};

export default connect(
  mapStateToProps,
  { changePassword },
)(ChangePassword);

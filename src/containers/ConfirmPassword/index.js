import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SnackBar from 'components/utils/SnackBar';
import ConfirmPasswordForm from 'components/ConfirmPasswordForm';
import { confirmPassword } from 'actions/Auth';

class ConfirmPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmation_code: '',
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
      nextProps.confirmedPassword !== undefined &&
      nextProps.confirmedPassword === ''
    ) {
      this.setState({
        open: true,
        error: 'Success!',
        variant: 'success',
      });
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Code expired. Please reset password again',
        variant: 'error',
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  snackbarClose = () => {
    this.setState({ open: false });
    if (
      this.props.confirmedPassword !== undefined &&
      this.props.confirmedPassword === ''
    ) {
      this.setState({
        link: '/login',
      });
    } else if (this.props.error) {
      this.setState({
        link: '/forgot-password',
      });
    }
  };

  confirmPassword() {
    const { confirmation_code, new_password } = this.state;
    let data = {
      email: localStorage.getItem('forgot_email'),
      confirmation_code,
      new_password,
    };
    this.props.confirmPassword(data);
  }

  render() {
    const {
      confirmation_code,
      new_password,
      confirm_password,
      open,
      error,
      variant,
      link,
    } = this.state;
    const { loader } = this.props;

    if (link) return <Redirect to={link} />;

    return (
      <div className="app-wrapper max-height">
        <div className="app-logo-content h-100 d-inline-block d-flex justify-content-center align-items-center">
          <ConfirmPasswordForm
            handleChange={this.handleChange.bind(this)}
            confirmPassword={() => this.confirmPassword()}
            btnFlag={
              (confirmation_code && new_password && confirm_password) === '' ||
              new_password !== confirm_password ||
              new_password.length < 8 ||
              confirm_password.length < 8
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
  const { loader, confirmedPassword, error } = auth;
  return { loader, confirmedPassword, error };
};

export default connect(
  mapStateToProps,
  { confirmPassword },
)(ConfirmPassword);

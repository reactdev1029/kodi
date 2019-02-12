import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SnackBar from 'components/utils/SnackBar';
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import { postForgotPassword } from 'actions/Auth';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      open: false,
      error: '',
      variant: '',
      link: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.forgotPassword !== undefined &&
      nextProps.forgotPassword === ''
    ) {
      this.setState({
        open: true,
        error: 'Check your email for a password reset confirmation code',
        variant: 'success',
      });
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Unable to reset password',
        variant: 'error',
      });
    }
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  postForgotPassword() {
    const { email } = this.state;
    this.props.postForgotPassword({ email });
  }

  snackbarClose = () => {
    this.setState({ open: false });
    if (
      this.props.forgotPassword !== undefined &&
      this.props.forgotPassword === ''
    ) {
      this.setState({ link: '/confirm-password' });
    }
  };

  render() {
    const { email, open, error, variant, link } = this.state;
    const { loader } = this.props;

    if (link) {
      return <Redirect to={link} />;
    }

    return (
      <div className="app-wrapper max-height">
        <div className="app-logo-content h-100 d-inline-block d-flex justify-content-center align-items-center">
          <ForgotPasswordForm
            handleChange={this.handleChange.bind(this)}
            resetPassword={() => this.postForgotPassword()}
            btnFlag={email === ''}
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
  const { loader, forgotPassword, error } = auth;
  return { loader, forgotPassword, error };
};

export default connect(
  mapStateToProps,
  { postForgotPassword },
)(ForgotPassword);

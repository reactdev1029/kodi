import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import SnackBar from 'components/utils/SnackBar';
import LogInForm from 'components/LogInForm';
import { userSignIn, setInitUrl } from 'actions/Auth';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      initURL: undefined,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email, password, initURL } = this.state;
    const { loader, modal_open } = this.props;

    if (initURL) {
      return (
        <Redirect
          to={{
            pathname: initURL,
            state: { email },
          }}
        />
      );
    }

    return (
      <Dialog
        open={modal_open}
        onClose={() => this.props.handleModalClose('login_open', false)}
        maxWidth={'md'}
      >
        <div style={{ height: 495, overflowX: 'auto', alignItems: 'center' }}>
          <LogInForm
            handleChange={this.handleChange.bind(this)}
            userSignIn={() => this.props.userSignIn({ email, password })}
            btnFlag={(email && password) === '' || password.length < 8}
            loader={loader}
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
  const { loader, authUser, error, initURL } = auth;
  return { loader, authUser, error, initURL };
};

export default connect(
  mapStateToProps,
  { userSignIn, setInitUrl },
)(LogIn);

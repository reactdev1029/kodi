import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SnackBar from 'components/utils/SnackBar';
import SubAccountForm from 'components/SubAccountForm';
import { addSubAccount, setInitUrl } from 'actions/Auth';

class SubAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      full_name: '',
      open: false,
      error: '',
      variant: '',
      initURL: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addedAccount !== undefined && nextProps.addedAccount === '') {
      this.setState({ initURL: '/login' });
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

  addSubAccount = () => {
    const { full_name, email } = this.state;
    var data = new FormData();
    data.append('full_name', full_name);
    data.append('email', email);
    this.props.addSubAccount(data);
  };

  snackbarClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { email, full_name, open, error, variant, initURL } = this.state;
    const { loader } = this.props;

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
      <div className="app-wrapper max-height">
        <div className="app-logo-content h-100 d-inline-block d-flex justify-content-center align-items-center">
          <SubAccountForm
            handleChange={this.handleChange.bind(this)}
            addSubAccount={() => this.addSubAccount()}
            btnFlag={(email && full_name) === ''}
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
  const { loader, authUser, error, initURL, addedAccount } = auth;
  return { loader, authUser, error, initURL, addedAccount };
};

export default connect(
  mapStateToProps,
  { addSubAccount, setInitUrl },
)(SubAccount);

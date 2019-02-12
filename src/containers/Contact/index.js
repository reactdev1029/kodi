import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SnackBar from 'components/utils/SnackBar';
import ContactForm from 'components/ContactForm';
import { postContact } from 'actions/Auth';

class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      open: false,
      error: '',
      variant: '',
      link: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contact !== undefined && nextProps.contact === '') {
      this.setState({ link: '/' });
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Failed. Please check carefully.',
        variant: 'error',
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  snackbarClose = () => {
    this.setState({ open: false });
  };

  postContact() {
    const { name, email, phone, message } = this.state;
    let data = {
      name,
      email,
      phone,
      message,
    };
    this.props.postContact(data);
  }

  render() {
    const {
      name,
      email,
      phone,
      message,
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
          <ContactForm
            handleChange={this.handleChange.bind(this)}
            sendMessage={() => this.postContact()}
            btnFlag={(name && email && phone && message) === ''}
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
  const { loader, contact, error } = auth;
  return { loader, contact, error };
};

export default connect(
  mapStateToProps,
  { postContact },
)(Contact);

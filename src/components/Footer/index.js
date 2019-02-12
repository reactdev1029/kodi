import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { switchLanguage, switchCurrency } from 'actions/Setting';
import LanguageSwitcher from 'components/LanguageSwitcher/index';
import CurrencySwitcher from 'components/CurrencySwitcher/index';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      langSwitcher: false,
      currencySwitcher: false,
    };
  }

  onLangSwitcherSelect = event => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget,
    });
  };

  onCurrencySwitcherSelect = event => {
    this.setState({
      currencySwitcher: !this.state.currencySwitcher,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      currencySwitcher: false,
    });
  };
  render() {
    const { locale, currency } = this.props;
    return (
      <footer className="app-footer">
        <div className="d-flex flex-row align-items-center mt-1 justify-content-between">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="app-logo mr-2 d-sm-block">
              <img src={'assets/images/logo1.png'} />
            </div>
            <span>&copy; KODI, LTD.</span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <Dropdown
              direction="up"
              isOpen={this.state.currencySwitcher}
              toggle={this.onCurrencySwitcherSelect.bind(this)}
            >
              <DropdownToggle
                className="d-inline-block d-flex flex-row justify-content-center"
                tag="span"
                data-toggle="dropdown"
              >
                <div className="d-flex align-items-center pointer">
                  <div className="mr-2">{currency.icon}</div>
                  <div className="d-none d-sm-block">{currency.name}</div>
                  <i className="zmdi zmdi-chevron-down zmdi-hc-lg ml-2 align-middle" />
                </div>
              </DropdownToggle>
              <DropdownMenu right className="w-50">
                <CurrencySwitcher
                  switchCurrency={this.props.switchCurrency}
                  handleRequestClose={this.handleRequestClose}
                />
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              className="ml-4"
              direction="up"
              isOpen={this.state.langSwitcher}
              toggle={this.onLangSwitcherSelect.bind(this)}
            >
              <DropdownToggle
                className="d-inline-block d-flex flex-row justify-content-center"
                tag="span"
                data-toggle="dropdown"
              >
                <div className="d-flex align-items-center pointer">
                  <i className={`flag flag-24 flag-${locale.icon} mr-2`} />
                  <div className="d-none d-sm-block">{locale.name}</div>
                  <i className="zmdi zmdi-chevron-down zmdi-hc-lg ml-2 align-middle" />
                </div>
              </DropdownToggle>
              <DropdownMenu right className="w-50">
                <LanguageSwitcher
                  switchLanguage={this.props.switchLanguage}
                  handleRequestClose={this.handleRequestClose}
                />
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, locale, currency } = settings;
  return {
    drawerType,
    locale,
    currency,
  };
};

export default connect(
  mapStateToProps,
  { switchCurrency, switchLanguage },
)(Footer);

import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss';
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';
import Header from 'components/Header/index';
import Footer from 'components/Footer';
import HamburgerSwitcher from 'components/HamburgerSwitcher';
import SnackBar from 'components/utils/SnackBar';
import LogIn from 'containers/LogIn';
import Register from 'containers/Register';
import { switchHamburger, updateWindowWidth } from 'actions/Setting';
import {
  getTypes,
  getManufacturer,
  getModels,
  setSearchType,
  getCountries,
  getMansModels,
  getCategory,
  getFittings,
  getBuySearch,
  getFeed,
  getRfqs,
  getBids,
  getOrgEquip,
  getUsers,
} from 'actions/Content';
import { setInitUrl, userSignOut, refreshToken } from 'actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';

let jwtDecode = require('jwt-decode');

const RestrictedRoute = ({ component: Component, rest, authUser }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends Component {
  state = {
    searchLink: undefined,
    open: false,
    error: '',
    variant: '',
    login_open: false,
    register_open: false,
  };

  componentDidUpdate() {
    this.getRefreshToken();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchLink: undefined });

    const { authUser, error, location } = nextProps;

    if (error) {
      if (error.organization_name) {
        this.setState({
          open: true,
          error: 'Organization Name may not be blank.',
          variant: 'error',
        });
      } else if (error.address) {
        this.setState({
          open: true,
          error: 'Address may not be blank.',
          variant: 'error',
        });
      } else if (error.error) {
        this.setState({
          open: true,
          error: error.error,
          variant: 'error',
        });
      }
    } else if (authUser) {
      this.setState({ login_open: false, register_open: false });
      if (location.state && location.state.from) {
        this.setState({ searchLink: location.state.from.pathname });
      }
    }

    if (
      !authUser &&
      location.state &&
      location.state.from &&
      location.state.from.pathname !== '/'
    ) {
      this.setState({ login_open: true });
    }

    this.getRefreshToken();
  }

  componentDidMount() {
    this.props.getTypes();
    this.props.getManufacturer();
    this.props.getModels();
    this.props.setSearchType('rent');
    this.props.getCountries();
    this.props.getMansModels();
    this.props.getCategory();
    this.props.getFittings();

    const { authUser } = this.props;

    if (authUser) {
      this.props.getFeed();
      this.props.getRfqs();
      this.props.getBids();
      this.props.getOrgEquip();
      this.props.getUsers();
    }

    window.addEventListener('resize', () => {
      this.props.updateWindowWidth({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    this.getRefreshToken();
  }

  getRefreshToken() {
    if (this.props.authUser && localStorage.getItem('user_id')) {
      if (jwtDecode(this.props.authUser).exp < Date.now() / 1000) {
        this.props.refreshToken();
      }
    }
  }

  switchHamburger(status) {
    if (status.name === 'Logout') {
      this.props.userSignOut();
    }
    setTimeout(() => {
      this.props.switchHamburger(false);
    }, 100);
  }

  setSearchLink = searchLink => {
    this.setState({ searchLink });
  };

  snackbarClose = () => {
    const { error } = this.props;
    this.setState({ open: false });
    if (error && error.error === 'password_change_required') {
      this.setState({ searchLink: '/change-password' });
    }
  };

  handleModalClose = (name, status) => {
    this.setState({ [name]: status });
    if (name === 'login_open') {
      this.setState({ register_open: false });
    } else {
      this.setState({ login_open: false });
    }
  };

  render() {
    const {
      match,
      location,
      locale,
      isDirectionRTL,
      hamSwitcher,
      authUser,
      initURL,
    } = this.props;
    const {
      searchLink,
      open,
      error,
      variant,
      login_open,
      register_open,
    } = this.state;

    const applyTheme = createMuiTheme(defaultTheme);

    //localStorage.removeItem('user_id');

    if (authUser && !initURL) {
      if (location.pathname === '/login' || location.pathname === '/register') {
        return <Redirect to={'/'} />;
      }
    }
    if (searchLink && searchLink !== location.pathname)
      return <Redirect to={searchLink} />;

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main app-container">
                <div className="app-main-container">
                  <Header
                    location={location}
                    setSearchLink={this.setSearchLink.bind(this)}
                    handleModalClose={this.handleModalClose.bind(this)}
                  />
                  <main className="app-main-content-wrapper">
                    <div className="app-main-content">
                      <div
                        className={hamSwitcher ? `d-block d-sm-none` : `d-none`}
                      >
                        <HamburgerSwitcher
                          handleRequestClose={data =>
                            this.switchHamburger(data)
                          }
                          authUser={authUser}
                        />
                      </div>
                      <Switch>
                        <Route
                          exact
                          path="/"
                          component={asyncComponent(() =>
                            import('./LandingPage'),
                          )}
                        />
                        <RestrictedRoute
                          path="/equipment-profile/:id"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./EquipmentProfile'),
                          )}
                        />
                        <RestrictedRoute
                          path="/buy-equipment-profile/:id"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./EquipmentProfile'),
                          )}
                        />
                        <RestrictedRoute
                          path="/user-profile"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./UserProfile'),
                          )}
                        />
                        <RestrictedRoute
                          path="/request-quotation"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./RequestQuo'),
                          )}
                        />
                        <RestrictedRoute
                          path="/post-item"
                          authUser={authUser}
                          component={asyncComponent(() => import('./PostItem'))}
                        />
                        <RestrictedRoute
                          path="/rent-summary"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./RentSummary'),
                          )}
                        />
                        <RestrictedRoute
                          path="/sub-account"
                          authUser={authUser}
                          component={asyncComponent(() =>
                            import('./SubAccount'),
                          )}
                        />
                        <RestrictedRoute
                          path="/account"
                          authUser={authUser}
                          component={asyncComponent(() => import('./Account'))}
                        />
                        <RestrictedRoute
                          path="/inbox"
                          authUser={authUser}
                          component={asyncComponent(() => import('./Messages'))}
                        />
                        <Route
                          path="/forgot-password"
                          component={asyncComponent(() =>
                            import('./ForgotPassword'),
                          )}
                        />
                        <Route
                          path="/confirm-password"
                          component={asyncComponent(() =>
                            import('./ConfirmPassword'),
                          )}
                        />
                        <Route
                          path="/change-password"
                          component={asyncComponent(() =>
                            import('./ChangePassword'),
                          )}
                        />
                        <Route
                          path="/contact"
                          component={asyncComponent(() => import('./Contact'))}
                        />
                        <Route
                          path="/rent-search-results"
                          component={asyncComponent(() =>
                            import('./RentSearchResults'),
                          )}
                        />
                        <Route
                          path="/rent-basket"
                          component={asyncComponent(() =>
                            import('./RentBasket'),
                          )}
                        />
                        <Route
                          path="/bid-search-results"
                          component={asyncComponent(() =>
                            import('./BidSearchResults'),
                          )}
                        />
                        <Route
                          path="/bid-basket"
                          component={asyncComponent(() =>
                            import('./BidBasket'),
                          )}
                        />
                        <Route
                          path="/bid-owner-summary"
                          component={asyncComponent(() =>
                            import('./BidBasket'),
                          )}
                        />
                        <Route
                          path="/bid-renter-summary"
                          component={asyncComponent(() =>
                            import('./BidBasket'),
                          )}
                        />
                        <Route
                          path="/buy-search-results"
                          component={asyncComponent(() =>
                            import('./BuySearchResults'),
                          )}
                        />
                        <Route
                          component={asyncComponent(() =>
                            import('components/Error404'),
                          )}
                        />
                      </Switch>
                      <LogIn
                        modal_open={login_open}
                        handleModalClose={this.handleModalClose.bind(this)}
                      />
                      <Register
                        modal_open={register_open}
                        handleModalClose={this.handleModalClose.bind(this)}
                      />
                      <SnackBar
                        open={open}
                        error={error}
                        variant={variant}
                        snackbarClose={() => this.snackbarClose()}
                      />
                    </div>
                  </main>
                  <Footer />
                </div>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { sideNavColor, locale, isDirectionRTL, hamSwitcher } = settings;
  const { authUser, initURL, error } = auth;
  return {
    sideNavColor,
    locale,
    isDirectionRTL,
    hamSwitcher,
    authUser,
    initURL,
    error,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      switchHamburger,
      updateWindowWidth,
      getTypes,
      getManufacturer,
      getModels,
      setInitUrl,
      userSignOut,
      setSearchType,
      getCountries,
      refreshToken,
      getMansModels,
      getCategory,
      getFittings,
      getBuySearch,
      getFeed,
      getRfqs,
      getBids,
      getOrgEquip,
      getUsers,
    },
  )(App),
);

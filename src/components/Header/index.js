import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FormattedNumber } from 'react-intl';
import SnackBar from 'components/utils/SnackBar';
import SearchBox from 'components/SearchBox';
import Filter from 'components/Filter';
import HamburgerSwitcher from 'components/HamburgerSwitcher/index';
import { switchHamburger } from 'actions/Setting';
import { userSignOut, errorClear } from 'actions/Auth';
import { getKeyword, getBuySearch, getBidSearch } from 'actions/Content';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      error: '',
      variant: '',
      searchBox: false,
      searchBtn: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buy_search && this.state.searchBtn) {
      this.setState({ searchBtn: false });
      nextProps.setSearchLink('/buy-search-results');
    } else if (nextProps.error && nextProps.error.detail) {
      this.setState({
        open: true,
        error: nextProps.error.detail,
        variant: 'error',
      });
    }
  }

  snackbarClose = () => {
    this.setState({ open: false });
    this.props.errorClear();
  };

  switchHamburger(status) {
    if (typeof status === 'object') {
      if (status.name === 'Logout') {
        this.props.userSignOut();
      }
      setTimeout(() => {
        this.props.switchHamburger(false);
      }, 100);
    } else {
      setTimeout(() => {
        this.props.switchHamburger(status);
      }, 100);
    }
  }

  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox,
    });
  };

  handleChange() {
    const {
      selectedType,
      ordering,
      selectedCategory,
      selectedCountry,
      manufacturersStatus,
      location,
      max_quip_hours,
      min_rating,
      is_quip_verified,
      is_legit,
      min_man_year,
      max_quip_distance,
      order,
      keywords,
      availability,
      selectedSubCategory,
      countriesStatus,
      fittingsStatus,
      modelsStatus,
    } = this.props;

    let o_countries = '';
    if (countriesStatus) {
      Object.keys(countriesStatus).map(country => {
        if (countriesStatus[country]) {
          o_countries += `${country},`;
        }
      });
      o_countries = o_countries.slice(0, -1);
    }

    if (location.pathname === '/bid-search-results') {
      let params = {
        ordering: order,
        countries: o_countries,
        for_rent: availability.for_rent,
        for_sale: availability.for_sale,
      };
      this.props.getBidSearch(params);
    } else {
      if (
        ordering !== '' &&
        selectedCategory !== '' &&
        selectedCountry !== '' &&
        manufacturersStatus !== {}
      ) {
        let mans_models = '';
        if (location.pathname === '/buy-search-results') {
          Object.keys(manufacturersStatus).map(manu => {
            if (manufacturersStatus[manu]) {
              mans_models += `${manu}:all-`;
            }
          });
        } else {
          Object.keys(manufacturersStatus).map(manu => {
            mans_models += `${manu}:all-`;
          });
        }
        mans_models = mans_models.slice(0, -1);

        let fittingsValue = '';
        if (fittingsStatus) {
          Object.keys(fittingsStatus).map(fit => {
            if (fittingsStatus[fit]) {
              fittingsValue += `${fit},`;
            }
          });
          fittingsValue = fittingsValue.slice(0, -1);
        }

        let params = {
          min_rating,
          min_year: min_man_year,
          max_distance: max_quip_distance,
          max_hours: max_quip_hours,
          is_legit,
          is_quip_verified,
          o_countries,
          mans_models,
          quip_cat: escape(selectedCategory.toLowerCase()),
          country: selectedCountry,
          order,
          keywords,
          for_sale:
            location.pathname === '/buy-search-results'
              ? availability.for_sale
              : ordering === 'for_sale'
              ? true
              : false,
          for_rent:
            location.pathname === '/buy-search-results'
              ? availability.for_rent
              : ordering === 'for_rent'
              ? true
              : false,
          fittings: fittingsValue,
          landing: location.pathname === '/buy-search-results' ? true : false,
        };
        this.props.getBuySearch(params);
        this.setState({ searchBtn: true });
      }
    }
  }

  render() {
    const { open, error, variant, searchBox } = this.state;
    const {
      hamSwitcher,
      authUser,
      searchType,
      rfq_items,
      bid_rfq_items,
      searchLoader,
      typesList,
      selectedType,
      getKeyword,
      location,
      keywords,
    } = this.props;

    let status = false;
    if (searchType === 'rent') {
      status = rfq_items.length > 0;
    } else if (searchType === 'bid') {
      status =
        bid_rfq_items &&
        bid_rfq_items.rfq_items &&
        bid_rfq_items.rfq_items.length > 0;
    }

    return (
      <AppBar className={`app-main-header`}>
        <Toolbar className="app-toolbar" disableGutters={false}>
          <Link className="app-logo mr-2 d-sm-block" to="/">
            <img src={'assets/images/logo.png'} alt={'KODI'} title={'KODI'} />
          </Link>
          <SearchBox
            styleName="d-none d-md-block"
            getKeyword={getKeyword}
            keywords={keywords}
            handleChange={() => this.handleChange()}
            searchLoader={searchLoader}
          />
          <ul className="header-notifications list-inline ml-auto d-md-flex flex-row">
            <li className="list-inline-item">
              <Link to="/post-item">
                <div className="d-flex flex-row align-items-center justify-content-center pointer rounded-lg px-3 py-2 bg-grey darken-3 border-2">
                  <i className="zmdi zmdi-plus-circle-o zmdi-hc-2x text-primary" />
                  <div className="px-4 d-none d-lg-block">
                    <span className="text-white h3-font-size">Post</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="list-inline-item">
              <div className="d-flex flex-row align-items-center justify-content-center pointer rounded-lg px-3 py-2 bg-primary border-2">
                <i className="zmdi zmdi-info-outline zmdi-hc-2x text-black" />
                <div className="px-4 d-none d-lg-block">
                  <span className="text-black h3-font-size">Dealer?</span>
                </div>
              </div>
            </li>
            {/*  {status && (
              <li className="list-inline-item">
                <Link to={`/${searchType}-basket`}>
                  <div className="menu-div d-flex align-items-center justify-content-center pointer pt-1">
                    <span className="text-white badge-number">
                      <FormattedNumber
                        value={
                          searchType === 'rent'
                            ? rfq_items.length
                            : searchType === 'bid'
                            ? bid_rfq_items.rfq_items.length
                            : 0
                        }
                      />
                    </span>
                    <i className="zmdi zmdi-shopping-cart zmdi-hc-2x text-white" />
                  </div>
                </Link>
              </li>
            )}
            <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                isOpen={hamSwitcher}
                toggle={() => this.switchHamburger(!hamSwitcher)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <div className="menu-div d-flex align-items-center justify-content-center pointer pt-1">
                    <i className="zmdi zmdi-account zmdi-hc-2x text-white" />
                  </div>
                </DropdownToggle>
                <DropdownMenu right className="w-50 d-none d-sm-block">
                  <HamburgerSwitcher
                    handleRequestClose={data => this.switchHamburger(data)}
                    authUser={authUser}
                  />
                </DropdownMenu>
              </Dropdown>
                      </li> */}
            <li className="d-inline-block d-md-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn size-30">
                    <i className="zmdi zmdi-search zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle>
                <DropdownMenu right className="p-0 btn-right-radius">
                  <SearchBox
                    styleName="search-dropdown"
                    getKeyword={getKeyword}
                    handleChange={() => this.handleChange()}
                    keywords={keywords}
                    searchLoader={searchLoader}
                  />
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </Toolbar>
        <Filter
          pathname={location.pathname}
          searchBtnClick={state => this.setState({ searchBtn: state })}
          handleModalClose={(name, status) =>
            this.props.handleModalClose(name, status)
          }
        />
        <SnackBar
          open={open}
          error={error}
          variant={variant}
          snackbarClose={() => this.snackbarClose()}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings, auth, content }) => {
  const { hamSwitcher } = settings;
  const { authUser, error } = auth;
  const {
    searchType,
    rfq_items,
    bid_rfq_items,
    searchLoader,
    typesList,
    selectedType,
    ordering,
    selectedCategory,
    selectedCountry,
    manufacturersStatus,
    buy_search,
    max_quip_hours,
    min_rating,
    is_quip_verified,
    countries,
    mans_models,
    is_legit,
    min_man_year,
    max_quip_distance,
    order,
    keywords,
    availability,
    category,
    categoryList,
    selectedSubCategory,
    countriesStatus,
    fittings,
    fittingsStatus,
    modelsStatus,
  } = content;
  return {
    hamSwitcher,
    authUser,
    error,
    searchType,
    rfq_items,
    bid_rfq_items,
    searchLoader,
    typesList,
    selectedType,
    ordering,
    selectedCategory,
    selectedCountry,
    manufacturersStatus,
    buy_search,
    max_quip_hours,
    min_rating,
    is_quip_verified,
    countries,
    mans_models,
    is_legit,
    min_man_year,
    max_quip_distance,
    order,
    keywords,
    availability,
    category,
    categoryList,
    selectedSubCategory,
    countriesStatus,
    fittings,
    fittingsStatus,
    modelsStatus,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      switchHamburger,
      userSignOut,
      errorClear,
      getKeyword,
      getBuySearch,
      getBidSearch,
    },
  )(Header),
);

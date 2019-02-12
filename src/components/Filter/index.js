import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import BrowseSwitcher from './BrowseSwitcher';
import ToolsSwitcher from './ToolsSwitcher';
import { getSelectedCategory, getBuySearch } from 'actions/Content';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      browseOpen: false,
      toolsOpen: false,
    };
  }

  onBrowseSelect = event => {
    this.setState({
      browseOpen: !this.state.browseOpen,
      anchorEl: event.currentTarget,
    });
  };

  onToolsSelect = event => {
    this.setState({
      toolsOpen: !this.state.toolsOpen,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      browseOpen: false,
      toolsOpen: false,
    });
  };

  handleChange = selectedCategory => {
    const {
      ordering,
      keywords,
      selectedManufacturer,
      selectedCountry,
    } = this.props;

    this.props.getSelectedCategory(selectedCategory);

    if (
      ordering !== '' &&
      selectedCountry !== '' &&
      selectedManufacturer !== ''
    ) {
      let params = {
        mans_models: `${selectedManufacturer}:all`,
        quip_cat: escape(selectedCategory.toLowerCase()),
        country: selectedCountry,
        keywords,
        [ordering]: true,
        landing: false,
      };
      this.props.getBuySearch(params);
      this.props.searchBtnClick(true);
    }
  };

  render() {
    const { browseOpen, toolsOpen } = this.state;
    const { authUser, categoryList } = this.props;

    return (
      <div className="d-flex double-line p-2 bg-primary lighten-5">
        <div className="d-flex flex-row w-100 px-3">
          <div className="border-right-1" />
          <Dropdown isOpen={browseOpen} toggle={this.onBrowseSelect.bind(this)}>
            <DropdownToggle
              className="d-inline-block"
              tag="span"
              data-toggle="dropdown"
            >
              <div className="option-bar-width d-flex flex-row align-items-center justify-content-center pointer px-2 py-1 border-right-1">
                <i className="zmdi zmdi-dot-circle-alt zmdi-hc-2x" />
                <span className="h3-font-size ml-2 d-none d-md-block">
                  BROWSE
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ width: 180 }}>
              <BrowseSwitcher
                browseData={categoryList}
                handleRequestClose={this.handleRequestClose}
                handleChange={this.handleChange.bind(this)}
              />
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={toolsOpen} toggle={this.onToolsSelect.bind(this)}>
            <DropdownToggle
              className="d-inline-block"
              tag="span"
              data-toggle="dropdown"
            >
              <div className="option-bar-width d-flex flex-row align-items-center justify-content-center pointer px-2 py-1 border-right-1">
                <i className="zmdi zmdi-wrench zmdi-hc-2x" />
                <span className="h3-font-size ml-2 d-none d-md-block">
                  TOOLS
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ width: 180 }}>
              <ToolsSwitcher handleRequestClose={this.handleRequestClose} />
            </DropdownMenu>
          </Dropdown>
          {authUser ? (
            <Link to="/account" className="text-secondary">
              <div className="option-bar-width d-flex flex-row align-items-center justify-content-center pointer px-2 py-1 border-right-1">
                <i className="zmdi zmdi-account zmdi-hc-2x" />
                <span className="h3-font-size ml-2 d-none d-md-block">
                  ACCOUNT
                </span>
              </div>
            </Link>
          ) : (
            <div className="d-flex flex-row">
              <div
                className="option-bar-width d-flex flex-row align-items-center justify-content-center pointer px-2 py-1 border-right-1"
                onClick={() => this.props.handleModalClose('login_open', true)}
              >
                <i className="zmdi zmdi-account zmdi-hc-2x" />
                <span className="h3-font-size ml-2 d-none d-md-block">
                  LOGIN
                </span>
              </div>
              <div
                className="option-bar-width d-flex flex-row align-items-center justify-content-center pointer px-2 py-1 border-right-1"
                onClick={() =>
                  this.props.handleModalClose('register_open', true)
                }
              >
                <i className="zmdi zmdi-account-add zmdi-hc-2x" />
                <span className="h3-font-size ml-2 d-none d-md-block">
                  REGISTER
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, content }) => {
  const { authUser } = auth;
  const {
    categoryList,
    ordering,
    selectedType,
    selectedManufacturer,
    selectedCountry,
    buy_search,
    keywords,
  } = content;
  return {
    authUser,
    categoryList,
    ordering,
    selectedType,
    selectedManufacturer,
    selectedCountry,
    buy_search,
    keywords,
  };
};

export default connect(
  mapStateToProps,
  { getSelectedCategory, getBuySearch },
)(Filter);

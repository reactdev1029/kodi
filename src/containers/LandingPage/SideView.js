import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import { Link, Redirect } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/lab/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {
  getSort,
  getSelectedCategory,
  getSelectedSubCategory,
  getSelectedType,
  getSelectedManufacturer,
  getSelectedCountry,
  getBuySearch,
} from 'actions/Content';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {
      subCategoryList: [],
      searchLink: undefined,
      searchBtn: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buy_search && this.state.searchBtn) {
      this.setState({ searchBtn: false, searchLink: '/buy-search-results' });
    }
  }

  componentDidMount() {
    const { selectedCategory } = this.props;
    if (selectedCategory !== '') {
      this.getSubCategory(selectedCategory);
    }
  }

  getSelectedCategory = event => {
    let value = event.target.value;
    this.getSubCategory(value);
    this.props.getSelectedCategory(value);
  };

  getSubCategory = value => {
    const { category } = this.props;
    let subCategoryList = Object.keys(category[value]).map(suggestion => ({
      value: suggestion,
      label: suggestion,
    }));
    this.setState({ subCategoryList });
  };

  handleChange = () => {
    const {
      ordering,
      selectedCategory,
      keywords,
      selectedManufacturer,
      selectedCountry,
    } = this.props;

    if (
      ordering !== '' &&
      selectedCategory !== '' &&
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
      this.setState({ searchBtn: true });
    }
  };

  render() {
    const {
      ordering,
      category,
      categoryList,
      selectedCategory,
      selectedSubCategory,
      typesList,
      selectedType,
      searchLoader,
      manufacturersList,
      selectedManufacturer,
      countriesList,
      selectedCountry,
    } = this.props;
    const { subCategoryList, searchLink } = this.state;

    let sortList = [
      { name: 'For Sale', value: 'for_sale' },
      { name: 'For Rent', value: 'for_rent' },
    ];

    if (searchLink) return <Redirect to={searchLink} />;

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          <h2>Search</h2>
          <FormControl className="w-100 my-3">
            <InputLabel htmlFor="for_rent">For Rent/For Sale</InputLabel>
            <Select
              value={ordering}
              onChange={event => this.props.getSort(event.target.value)}
              input={<Input id="for_rent" className="text-primary" />}
            >
              {sortList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-100 mb-3">
            <InputLabel htmlFor="for_rent">Equipment Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={this.getSelectedCategory.bind(this)}
              input={<Input id="sort" className="text-primary" />}
            >
              {categoryList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-100 mb-3">
            <InputLabel htmlFor="for_rent">Equipment Sub-Category</InputLabel>
            <Select
              value={selectedSubCategory}
              onChange={event =>
                this.props.getSelectedSubCategory(event.target.value)
              }
              input={<Input id="sort" className="text-primary" />}
            >
              {subCategoryList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-100 mb-3">
            <InputLabel htmlFor="for_rent">Equipment Type</InputLabel>
            <Select
              value={selectedType}
              onChange={event => this.props.getSelectedType(event.target.value)}
              input={<Input id="sort" className="text-primary" />}
            >
              {typesList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-100 mb-3">
            <InputLabel htmlFor="for_rent">Manufacturer(s)</InputLabel>
            <Select
              value={selectedManufacturer}
              onChange={event =>
                this.props.getSelectedManufacturer(event.target.value)
              }
              input={<Input id="sort" className="text-primary" />}
            >
              {manufacturersList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-100 mb-4">
            <InputLabel htmlFor="for_rent">Location(s)</InputLabel>
            <Select
              value={selectedCountry}
              onChange={event =>
                this.props.getSelectedCountry(event.target.value)
              }
              input={<Input id="sort" className="text-primary" />}
            >
              {countriesList.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex justify-content-center mb-4 px-2">
            <Button
              className={`jr-btn bg-grey ${false ? 'lighten-1' : 'darken-3'}`}
              onClick={() => this.handleChange()}
              disabled={false}
              fullWidth
            >
              {searchLoader ? (
                <CircularProgress size={16} className="text-white mx-4" />
              ) : (
                <span className="text-white">Search</span>
              )}
            </Button>
          </div>
          <div className="w-100 pt-3 d-flex flex-column justify-content-center border-top">
            <span>Can't find the equipment you're looking for?</span>
            <Link to="/request-quotation" className="text-blue mt-2">
              Request Quotations
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const {
    searchLoader,
    ordering,
    category,
    categoryList,
    selectedCategory,
    selectedSubCategory,
    typesList,
    selectedType,
    manufacturersList,
    selectedManufacturer,
    countriesList,
    selectedCountry,
    buy_search,
    keywords,
  } = content;
  return {
    searchLoader,
    ordering,
    category,
    categoryList,
    selectedCategory,
    selectedSubCategory,
    typesList,
    selectedType,
    manufacturersList,
    selectedManufacturer,
    countriesList,
    selectedCountry,
    buy_search,
    keywords,
  };
};

export default connect(
  mapStateToProps,
  {
    getSort,
    getSelectedCategory,
    getSelectedSubCategory,
    getSelectedType,
    getSelectedManufacturer,
    getSelectedCountry,
    getBuySearch,
  },
)(SideView);

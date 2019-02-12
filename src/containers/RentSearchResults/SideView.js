import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/lab/Slider';
import ReactStars from 'react-stars';
import {
  getRating,
  getVerified,
  getWorkingHours,
  getLegit,
  getMinManYear,
  getMaxDistance,
  getOrder,
  getKeyword,
  getAvailability,
  getSelectedCategory,
  getSelectedSubCategory,
  getSelectedType,
  getCountriesStatus,
  getFittingsStatus,
  getManufacturerStatus,
  getModelStatus,
  getBuySearch,
} from 'actions/Content';

class SideView extends React.Component {
  constructor() {
    super();
    this.state = {
      subCategoryList: [],
      fittingsList: [],
    };
  }

  componentDidMount() {
    this.setInitialState();
  }

  setInitialState() {
    const { selectedCategory, selectedType } = this.props;
    if (selectedCategory !== '') {
      this.getSubCategory(selectedCategory);
    }

    if (selectedType !== '') {
      this.getFittingsList(selectedType);
    }
  }

  getSelectedCategory = event => {
    let value = event.target.value;
    this.getSubCategory(value);
    this.props.getSelectedCategory(value);
    this.handleSearch('quip_cat', value);
  };

  getSubCategory = value => {
    const { category } = this.props;
    let subCategoryList = Object.keys(category[value]).map(suggestion => ({
      value: suggestion,
      label: suggestion,
    }));
    this.setState({ subCategoryList });
  };

  getFittingsList = value => {
    const { fittings } = this.props;
    let fittingsList = fittings.find(fit => fit.name === value).fittings;
    let fittingsStatus = {};
    for (var i = 0; i < fittingsList.length; i++) {
      fittingsStatus[fittingsList[i]] = false;
    }
    this.props.getFittingsStatus(fittingsStatus);
    this.setState({ fittingsList });
  };

  handleCountryCheckChange = name => (event, checked) => {
    const { countriesStatus } = this.props;
    this.props.getCountriesStatus({ ...countriesStatus, [name]: checked });
    this.handleSearch('o_countries', { ...countriesStatus, [name]: checked });
  };

  handleMansCheckChange = name => (event, checked) => {
    const { manufacturersStatus } = this.props;
    this.props.getManufacturerStatus({
      ...manufacturersStatus,
      [name]: checked,
    });
    this.handleSearch('mans_models', {
      ...manufacturersStatus,
      [name]: checked,
    });
  };

  handleModelsCheckChange = (name, model) => (event, checked) => {
    const { modelsStatus } = this.props;
    this.props.getModelStatus({
      ...modelsStatus,
      [name]: {
        ...modelsStatus[name],
        [model]: checked,
      },
    });
  };

  availabilityChange = name => (event, checked) => {
    const { availability } = this.props;
    this.props.getAvailability({ ...availability, [name]: checked });
    this.handleSearch(name, checked);
  };

  handleFittingsCheckChange = name => (event, checked) => {
    const { fittingsStatus } = this.props;
    this.props.getFittingsStatus({ ...fittingsStatus, [name]: checked });
    this.handleSearch('fittings', { ...fittingsStatus, [name]: checked });
  };

  cupChange = () => {
    this.props.getLegit(!this.props.is_legit);
    this.handleSearch('is_legit', !this.props.is_legit);
  };

  verifiedChange = () => {
    const { is_quip_verified } = this.props;
    this.props.getVerified(!is_quip_verified);
    this.handleSearch('is_quip_verified', !is_quip_verified);
  };

  ratingChanged = rating => {
    this.props.getRating(rating);
    this.handleSearch('min_rating', rating);
  };

  handleSearch = (name, value) => {
    const {
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
    if (name === 'o_countries') {
      Object.keys(value).map(country => {
        if (value[country]) {
          o_countries += `${country},`;
        }
      });
      o_countries = o_countries.slice(0, -1);
    } else {
      if (countriesStatus) {
        Object.keys(countriesStatus).map(country => {
          if (countriesStatus[country]) {
            o_countries += `${country},`;
          }
        });
        o_countries = o_countries.slice(0, -1);
      }
    }

    if (
      selectedCategory !== '' &&
      selectedCountry !== '' &&
      manufacturersStatus !== {}
    ) {
      let mans_models = '';
      if (name === 'mans_models') {
        Object.keys(value).map(manu => {
          if (value[manu]) {
            mans_models += `${manu}:all-`;
          }
        });
        mans_models = mans_models.slice(0, -1);
      } else {
        Object.keys(manufacturersStatus).map(manu => {
          if (manufacturersStatus[manu]) {
            mans_models += `${manu}:all-`;
          }
        });
        mans_models = mans_models.slice(0, -1);
      }

      let fittingsValue = '';
      if (name === 'fittings') {
        Object.keys(value).map(fit => {
          if (value[fit]) {
            fittingsValue += `${fit},`;
          }
        });
        fittingsValue = fittingsValue.slice(0, -1);
      } else {
        if (fittingsStatus) {
          Object.keys(fittingsStatus).map(fit => {
            if (fittingsStatus[fit]) {
              fittingsValue += `${fit},`;
            }
          });
          fittingsValue = fittingsValue.slice(0, -1);
        }
      }

      let params = {
        min_rating: name === 'min_rating' ? value : min_rating,
        min_year: name === 'min_man_year' ? value : min_man_year,
        max_distance: name === 'max_quip_distance' ? value : max_quip_distance,
        max_hours: name === 'max_quip_hours' ? value : max_quip_hours,
        is_legit: name === 'is_legit' ? value : is_legit,
        is_quip_verified:
          name === 'is_quip_verified' ? value : is_quip_verified,
        o_countries,
        mans_models,
        quip_cat:
          name === 'quip_cat'
            ? escape(value.toLowerCase())
            : escape(selectedCategory.toLowerCase()),
        country: selectedCountry,
        order: name === 'order' ? value : order,
        keywords: name === 'keywords' ? value : keywords,
        for_sale: name === 'for_sale' ? value : availability.for_sale,
        for_rent: name === 'for_rent' ? value : availability.for_rent,
        fittings: fittingsValue,
        landing: true,
      };
      this.props.getBuySearch(params);
    }
  };

  render() {
    const {
      min_rating,
      is_quip_verified,
      countries,
      max_quip_hours,
      mans_models,
      is_legit,
      min_man_year,
      max_quip_distance,
      country_state,
      model_name_state,
      model_all_state,
      model_state,
      pathname,
      order,
      keywords,
      availability,
      categoryList,
      selectedCategory,
      selectedSubCategory,
      typesList,
      selectedType,
      countriesStatus,
      fittingsStatus,
      manufacturersStatus,
      modelsStatus,
    } = this.props;
    const { subCategoryList, fittingsList } = this.state;

    let sortList = [
      { name: 'Rating', value: '-rating' },
      { name: 'Name', value: 'name' },
      { name: 'Date', value: 'date' },
      { name: 'File size', value: 'file-size' },
    ];

    return (
      <div className="side-view-width">
        <div className="border border-grey rounded-lg p-3">
          {pathname === '/buy-search-results' && (
            <div className="mb-3">
              <span className="font-weight-bold">Order by</span>
              <FormControl className="w-100 mb-2">
                <Select
                  value={order}
                  onChange={event => {
                    this.props.getOrder(event.target.value);
                    this.handleSearch('order', event.target.value);
                  }}
                  input={<Input id="sort" className="text-primary" />}
                >
                  {sortList.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div className="mb-3">
            <span className="font-weight-bold">Keyword</span>
            <TextField
              id="keyword"
              margin="none"
              fullWidth
              value={keywords}
              onChange={event => {
                this.props.getKeyword(event.target.value);
                this.handleSearch('keywords', event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <span className="font-weight-bold">Availability</span>
            <div className="d-flex flex-row align-items-center justify-content-between px-2">
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={availability.for_sale}
                    onChange={this.availabilityChange('for_sale')}
                    value={'for_sale'}
                  />
                }
                label={'For Sale'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    className="text-primary"
                    checked={availability.for_rent}
                    onChange={this.availabilityChange('for_rent')}
                    value={'for_rent'}
                  />
                }
                label={'For Rent'}
              />
            </div>
          </div>
          <div className="mb-3">
            <span className="font-weight-bold">Equipment Category</span>
            <FormControl className="w-100">
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
          </div>
          <div className="mb-3">
            <span className="font-weight-bold">Equipment Sub-category</span>
            <FormControl className="w-100">
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
          </div>
          <div className="mb-3">
            <span className="font-weight-bold">Equipment Type</span>
            <FormControl className="w-100">
              <Select
                value={selectedType}
                onChange={event => {
                  this.props.getSelectedType(event.target.value);
                  this.getFittingsList(event.target.value);
                }}
                input={<Input id="sort" className="text-primary" />}
              >
                {typesList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="">
            <span className="font-weight-bold">Min owner rating</span>
            <ReactStars
              count={5}
              value={min_rating}
              onChange={this.ratingChanged.bind(this)}
              size={34}
              color1={'#000000'}
              color2={'#FEC40E'}
            />
          </div>
          <div className="mt-2">
            <span className="font-weight-bold">Owner awards</span>
            <div className="d-flex flex-row align-items-center mt-1">
              <img
                src={
                  is_legit
                    ? 'assets/images/trophy_selected.png'
                    : 'assets/images/trophy.png'
                }
                width="38"
                height="auto"
                className="pointer"
                onClick={this.cupChange.bind(this)}
              />
              <i
                className={`zmdi zmdi-shield-check zmdi-hc-3x ml-4 ${
                  is_quip_verified ? 'text-primary' : 'text-secondary'
                } pointer`}
                onClick={this.verifiedChange.bind(this)}
              />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-weight-bold">Origin Country</span>
            <Grid container spacing={0}>
              {countries &&
                countries.map((country, index) => (
                  <Grid key={index} item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="text-primary"
                          checked={countriesStatus.country}
                          onChange={this.handleCountryCheckChange(country.name)}
                          value={country.name}
                        />
                      }
                      label={country.name}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
          <div className="mt-2">
            <span className="font-weight-bold">Min manufacture year</span>
            <div className="d-flex flex-column justify-content-center align-items-center p-2">
              <span>{min_man_year}</span>
              <Slider
                value={min_man_year}
                min={1980}
                max={new Date().getFullYear()}
                step={1}
                onChange={(event, value) => {
                  this.props.getMinManYear(value);
                  this.handleSearch('min_man_year', value);
                }}
                className="py-3"
              />
            </div>
          </div>
          <div className="mt-2">
            <span className="font-weight-bold">Max machine distance</span>
            <div className="d-flex flex-column justify-content-center align-items-center p-2">
              <span>
                <FormattedNumber value={max_quip_distance} /> km
              </span>
              <Slider
                value={max_quip_distance}
                min={100}
                max={150000}
                step={100}
                onChange={(event, value) => {
                  this.props.getMaxDistance(value);
                  this.handleSearch('max_quip_distance', value);
                }}
                className="py-3"
              />
            </div>
          </div>
          <div className="mt-2">
            <span className="font-weight-bold">Max machine hours</span>
            <div className="d-flex flex-column justify-content-center align-items-center p-2">
              <span>
                <FormattedNumber value={max_quip_hours} /> hours
              </span>
              <Slider
                value={max_quip_hours}
                min={100}
                max={150000}
                step={100}
                onChange={(event, value) => {
                  this.props.getWorkingHours(value);
                  this.handleSearch('max_quip_hours', value);
                }}
                className="py-3"
              />
            </div>
          </div>
          {fittingsList.length > 0 && (
            <div className="my-3 border-bottom">
              <span className="font-weight-bold">Fittings</span>
              <Grid container spacing={0}>
                {fittingsList.map((fitting, index) => (
                  <Grid key={index} item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="text-primary"
                          checked={fittingsStatus.fitting}
                          onChange={this.handleFittingsCheckChange(fitting)}
                          value={fitting}
                        />
                      }
                      label={fitting}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
          <div className="my-2 border-bottom">
            <span className="font-weight-bold">Manufacturers</span>
            {mans_models &&
              mans_models.map((model, index) => (
                <div key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="text-primary"
                        checked={manufacturersStatus[model.name]}
                        onChange={this.handleMansCheckChange(model.name)}
                        value={model.name}
                      />
                    }
                    label={`${model.name} (${model.models.length})`}
                  />
                </div>
              ))}
          </div>
          <div className="mt-3 mb-1">
            <span className="font-weight-bold">Models</span>
            <Grid container spacing={0}>
              {mans_models &&
                mans_models.map(item =>
                  item.models.map(
                    (model, index) =>
                      manufacturersStatus[item.name] && (
                        <Grid key={index} item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="text-primary"
                                checked={modelsStatus.model}
                                onChange={this.handleModelsCheckChange(
                                  item.name,
                                  model,
                                )}
                                value={model}
                              />
                            }
                            label={model}
                          />
                        </Grid>
                      ),
                  ),
                )}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const {
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
    selectedCategory,
    selectedSubCategory,
    typesList,
    selectedType,
    countriesStatus,
    fittings,
    fittingsStatus,
    manufacturersStatus,
    modelsStatus,
    selectedCountry,
  } = content;
  return {
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
    selectedCategory,
    selectedSubCategory,
    typesList,
    selectedType,
    countriesStatus,
    fittings,
    fittingsStatus,
    manufacturersStatus,
    modelsStatus,
    selectedCountry,
  };
};

export default connect(
  mapStateToProps,
  {
    getRating,
    getVerified,
    getWorkingHours,
    getLegit,
    getMinManYear,
    getMaxDistance,
    getOrder,
    getKeyword,
    getAvailability,
    getSelectedCategory,
    getSelectedSubCategory,
    getSelectedType,
    getCountriesStatus,
    getFittingsStatus,
    getManufacturerStatus,
    getModelStatus,
    getBuySearch,
  },
)(SideView);

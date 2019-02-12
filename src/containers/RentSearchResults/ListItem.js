import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactStars from 'react-stars';
import { getManufacturerStatus, getModelStatus } from 'actions/Content';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategoryList: [],
      update: true,
    };
  }

  componentDidMount() {
    const { result } = this.props;
    this.getSubCategory(result.category);
  }

  getSelected = (name, index) => event => {
    let value = event.target.value;
    this.props.getSelected(name, index, value);
    if (name === 'category') {
      this.getSubCategory(value);
    }
    this.setState({ update: true });
  };

  getSubCategory = value => {
    const { category } = this.props;
    let subCategoryList = Object.keys(category[value]).map(suggestion => ({
      value: suggestion,
      label: suggestion,
    }));
    this.setState({ subCategoryList });
  };

  handleMansCheckChange = (name, index) => (event, checked) => {
    this.props.handleMansCheckChange(name, index, checked);
  };

  handleModelsCheckChange = (name, model, index) => (event, checked) => {
    this.props.handleModelsCheckChange(name, model, index, checked);
  };

  handleTextChange = (name, index) => event => {
    let value = event.target.value;
    this.props.handleTextChange(name, index, value);
    this.setState({ update: true });
  };

  render() {
    const {
      result,
      pathname,
      index,
      org_equipment_list,
      categoryList,
      typesList,
      mans_models,
      manufacturersStatus,
      modelsStatus,
    } = this.props;
    const { subCategoryList } = this.state;

    let manufacturers_check = [];
    let models_check = [];
    result.manufacturers_models.split(';').map(mans => {
      let mans_split = mans.split(':');
      manufacturers_check.push(mans_split[0]);
      mans_split[1] &&
        mans_split[1].split(',').map(mods => {
          models_check.push(mods);
        });
    });

    let equipState = false;
    if (org_equipment_list && org_equipment_list.length > 0) {
      equipState =
        org_equipment_list.find(equip => result.type === equip.type) !==
        undefined;
    }

    return (
      <div className="">
        {pathname === '/rent-search-results' && (
          <div className="d-flex flex-row align-items-center">
            <span className="h2-font-size font-weight-bold">
              <FormattedNumber value={result.num_machines} />
            </span>
            <span className="h3-font-size ml-1">machines available</span>
          </div>
        )}
        <div className="d-flex flex-column border border-grey rounded-lg p-2 mb-2">
          <Grid container spacing={16}>
            <Grid item xs={12} lg={4}>
              <div className="d-flex flex-column justify-content-center h-100">
                <FormControl className="w-100 mb-3">
                  <InputLabel htmlFor="for_rent" required>
                    Equipment Category
                  </InputLabel>
                  <Select
                    value={result.category}
                    onChange={this.getSelected('category', index)}
                    input={<Input id="sort" className="text-primary" />}
                    disabled={pathname === '/rent-basket' ? false : true}
                  >
                    {categoryList.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="w-100 mb-3">
                  <InputLabel htmlFor="for_rent" required>
                    Equipment Sub-Category
                  </InputLabel>
                  <Select
                    value={result.subcategory}
                    onChange={this.getSelected('subcategory', index)}
                    input={<Input id="sort" className="text-primary" />}
                    disabled={pathname === '/rent-basket' ? false : true}
                  >
                    {subCategoryList.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="w-100">
                  <InputLabel htmlFor="for_rent" required>
                    Equipment Type
                  </InputLabel>
                  <Select
                    value={result.type}
                    onChange={this.getSelected('type', index)}
                    input={<Input id="sort" className="text-primary" />}
                    disabled={
                      pathname === '/rent-basket' || pathname === '/bid-basket'
                        ? false
                        : true
                    }
                  >
                    {typesList.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} lg={5}>
              <div className="d-flex flex-row align-item-center w-100">
                <div className="w-50 px-1">
                  <span>Manufacturers</span>
                  <div
                    className="d-flex flex-column horizontal-scroll"
                    style={{ height: 180 }}
                  >
                    {mans_models &&
                      mans_models.map((model, idx) => (
                        <div key={idx}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="text-primary"
                                checked={manufacturers_check.includes(
                                  model.name,
                                )}
                                onChange={this.handleMansCheckChange(
                                  model.name,
                                  index,
                                )}
                                value={model.name}
                              />
                            }
                            label={model.name}
                            disabled={
                              pathname === '/rent-basket' ? false : true
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-50 px-1">
                  <span>Models</span>
                  <div
                    className="d-flex flex-column horizontal-scroll"
                    style={{ height: 180 }}
                  >
                    {mans_models &&
                      mans_models.map(item =>
                        item.models.map(
                          (model, idx) =>
                            manufacturers_check.includes(item.name) && (
                              <div key={idx}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      className="text-primary"
                                      checked={models_check.includes(model)}
                                      onChange={this.handleModelsCheckChange(
                                        item.name,
                                        model,
                                        index,
                                      )}
                                      value={model}
                                    />
                                  }
                                  label={model}
                                  disabled={
                                    pathname === '/rent-basket' ? false : true
                                  }
                                />
                              </div>
                            ),
                        ),
                      )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={3}>
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <TextField
                  id="max_hours"
                  margin="dense"
                  type="number"
                  label="Max. Hours"
                  fullWidth
                  value={result.max_hours}
                  onChange={this.handleTextChange('max_hours', index)}
                  disabled={pathname === '/rent-basket' ? false : true}
                />
                <TextField
                  id="max_distance"
                  margin="dense"
                  type="number"
                  label="Max. KM"
                  fullWidth
                  value={result.max_distance}
                  onChange={this.handleTextChange('max_distance', index)}
                  disabled={pathname === '/rent-basket' ? false : true}
                />
                <TextField
                  id="min_year"
                  margin="dense"
                  type="number"
                  label="Min. Manufacture Year"
                  fullWidth
                  value={result.min_year}
                  onChange={this.handleTextChange('min_year', index)}
                  disabled={pathname === '/rent-basket' ? false : true}
                />
                {pathname !== '/rent-basket' && result.quantity ? (
                  <div className="d-flex flex-row justify-content-end align-items-center w-100 mt-2">
                    <h3 className="font-weight-bold">{`${
                      result.quantity
                    }x`}</h3>
                  </div>
                ) : (
                  <div className="d-flex flex-row align-items-center mt-1">
                    <i
                      className="zmdi zmdi-plus zmdi-hc-2x text-grey pointer"
                      onClick={() => {
                        this.props.handleQuaChange(index, '+');
                        this.setState({ update: true });
                      }}
                    />
                    <span className="h2-font-size text-gery ml-3">
                      {result.quantity}
                    </span>
                    <i
                      className="zmdi zmdi-minus zmdi-hc-2x text-grey pointer ml-3"
                      onClick={() => {
                        this.props.handleQuaChange(index, '-');
                        this.setState({ update: true });
                      }}
                    />
                    <i
                      className="zmdi zmdi-delete zmdi-hc-2x text-grey pointer mr-2 ml-4"
                      onClick={() => this.props.handleChange(index, null)}
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          {(pathname === '/bid-basket' ||
            pathname === '/bid-owner-summary' ||
            pathname === '/bid-renter-summary') && (
            <div className="d-flex flex-row justify-content-center align-items-center border-top border-grey m-1 p-2">
              <TextField
                id="price_offer"
                margin="dense"
                type="number"
                label="Price offer"
                value={result.price_offer ? result.price_offer : ''}
                onChange={this.handleTextChange('price_offer', index)}
                disabled={pathname === '/bid-basket' ? false : true}
              />
              <Button
                className={`jr-btn ml-4 ${
                  equipState &&
                  result.equip_items &&
                  result.equip_items.length > 0
                    ? 'bg-white border'
                    : 'bg-grey darken-3'
                }`}
                disabled={!equipState}
                onClick={() => this.props.handleRequestOpen(result, index)}
              >
                <span
                  className={
                    equipState &&
                    result.equip_items &&
                    result.equip_items.length > 0
                      ? 'text-secondary'
                      : 'text-white'
                  }
                >
                  {pathname === '/bid-basket'
                    ? equipState &&
                      result.equip_items &&
                      result.equip_items.length > 0
                      ? 'Edit equipment'
                      : 'Add equipment'
                    : 'View equipment'}
                </span>
              </Button>
              {/*<Grid container spacing={16}>
                <Grid item xs={12} md={8}>
                  {result.equip_items.map((item, index) => (
                    <li key={index} className="ml-3 mb-2">
                      <span
                        className="pointer"
                        onClick={() => this.props.handleEquipSelect(item.url)}
                      >{`${item.type} (${item.manufacturer} ${item.model}): ${
                        item.serial_number
                      }`}</span>
                    </li>
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
                  {pathname === '/bid-basket' && (
                    <div className="w-100 d-flex justify-content-end">
                      <Button
                        className="jr-btn bg-white border"
                        onClick={() =>
                          this.props.handleRequestOpen(result, index)
                        }
                      >
                        <span className="text-secondary">Edit equipment</span>
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
              ) : ( pathname === '/bid-basket' && (
              <Button
                className="jr-btn bg-grey darken-3"
                onClick={() => this.props.handleRequestOpen(result, index)}
              >
                <span className="text-white">Add equipment</span>
              </Button>
              ) ) */}
            </div>
          )}
        </div>
        {pathname !== '/rent-summary' && (
          <div className="d-flex justify-content-end mr-2 mb-3">
            {pathname === '/rent-search-results' && (
              <Button
                className="jr-btn bg-grey darken-3"
                onClick={() => this.props.handleChange(null, result)}
              >
                <span className="text-white">Add to RFQ</span>
              </Button>
            )}
          </div>
        )}
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
    mans_models,
    manufacturersStatus,
    modelsStatus,
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
    mans_models,
    manufacturersStatus,
    modelsStatus,
  };
};

export default connect(
  mapStateToProps,
  { getManufacturerStatus, getModelStatus },
)(ListItem);

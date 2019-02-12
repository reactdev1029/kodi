import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Dropzone from 'react-dropzone';
import { DatePicker } from 'material-ui-pickers';
import AutoComplete from 'components/AutoComplete';

const TextInput = ({ label, id, type, value, handleTextChange }) => (
  <div className="d-flex flex-row align-items-center">
    <span className="font-weight-bold w-50">{label}</span>
    <TextField
      id={id}
      margin="normal"
      type={type}
      fullWidth
      value={value}
      onChange={event => handleTextChange(event)}
    />
  </div>
);

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
    };
  }

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  render() {
    const { category } = this.state;
    const {
      typesList,
      manufacturersList,
      modelsList,
      data,
      handleChange,
      handleTextChange,
      photoUpload,
      photo1,
      publish,
      categoryList,
      subCategoryList,
    } = this.props;

    return (
      <div className="border border-grey rounded-lg p-2">
        <Grid container spacing={16}>
          <Grid item xs={12} md={5}>
            <div className="px-3">
              <h2 className="font-weight-bold mt-2">
                Add Equipment to Registry
              </h2>
              <div className="d-flex">
                {photo1 ? (
                  <div className="d-flex justify-content-center align-items-center border-dashed rounded-lg dropzone-width">
                    <img src={photo1.preview} className="dropzone-width" />
                  </div>
                ) : (
                  <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={(accepted, rejected) => photoUpload(accepted[0])}
                    className="d-flex justify-content-center align-items-center border-dashed rounded-lg bg-grey lighten-3 dropzone-width"
                  >
                    <i className="zmdi zmdi-upload zmdi-hc-4x" />
                  </Dropzone>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center mt-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      className="text-primary"
                      checked={publish}
                      onChange={this.props.handlePublishCheckChange('publish')}
                      value={'publish'}
                    />
                  }
                  label={'Publish this posting?'}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className="px-3">
              <div className="d-flex flex-row align-items-center py-2 mb-2">
                <span className="font-weight-bold w-50">Category</span>
                <AutoComplete
                  placeholder=""
                  suggestions={categoryList}
                  handleChange={handleChange('category')}
                  value={data.category}
                  type="single"
                />
              </div>
              <div className="d-flex flex-row align-items-center py-2 my-2">
                <span className="font-weight-bold w-50">Sub-Category</span>
                <AutoComplete
                  placeholder=""
                  suggestions={subCategoryList}
                  handleChange={this.handleChange('category')}
                  value={category}
                  type="single"
                />
              </div>
              <div className="d-flex flex-row align-items-center py-2 my-2">
                <span className="font-weight-bold w-50">Type</span>
                <AutoComplete
                  placeholder=""
                  suggestions={typesList}
                  handleChange={handleChange('type')}
                  value={data.type}
                  type="single"
                />
              </div>
              <div className="d-flex flex-row align-items-center py-2 my-2">
                <span className="font-weight-bold w-50">Manufacturer</span>
                <AutoComplete
                  placeholder=""
                  suggestions={manufacturersList}
                  handleChange={handleChange('manufacturer')}
                  value={data.manufacturer}
                  type="single"
                />
              </div>
              <div className="d-flex flex-row align-items-center py-2 mt-2">
                <span className="font-weight-bold w-50">Model/Name</span>
                <AutoComplete
                  placeholder=""
                  suggestions={modelsList}
                  handleChange={handleChange('model')}
                  value={data.model}
                  type="single"
                />
              </div>
              <div className="d-flex flex-row align-items-center py-2 mt-2">
                <span className="font-weight-bold w-50">
                  Date of Manufacture
                </span>
                <DatePicker
                  fullWidth
                  value={data.manufacture_date}
                  format="MMM DD, YYYY"
                  placeholder=""
                  onChange={handleChange('manufacture_date')}
                  animateYearScrolling={false}
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                />
              </div>
              <TextInput
                label="Machine Hours"
                id="machine-hours"
                type="number"
                value={data.machine_hours}
                handleTextChange={handleTextChange('machine_hours')}
              />
              <TextInput
                label="Machine Distance (km)"
                id="machine-distance"
                type="number"
                value={data.machine_distance}
                handleTextChange={handleTextChange('machine_distance')}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { typesList, manufacturersList, categoryList } = content;
  return {
    typesList,
    manufacturersList,
    categoryList,
  };
};

export default connect(mapStateToProps)(MainView);

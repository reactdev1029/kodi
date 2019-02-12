import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import AutoComplete from 'components/AutoComplete';

const ItemView = ({
  index,
  typesList,
  manufacturersList,
  modelsList,
  itemData,
  handleChange,
  handleNumberChange,
  handleClose,
}) => {
  return (
    <div className="mt-4">
      <span>Item #{index + 1}</span>
      <Grid container spacing={16} className="bg-grey lighten-3 p-2 mt-1">
        <Grid item xs={12} md={4}>
          <div className="p-2">
            <AutoComplete
              placeholder="Equipment Type"
              suggestions={typesList}
              handleChange={handleChange('type', index)}
              value={itemData.type}
              type="single"
            />
          </div>
          <div className="p-2">
            <TextField
              id="quantity"
              type="number"
              value={itemData.quantity}
              fullWidth
              margin="none"
              placeholder="Quantity"
              onChange={handleNumberChange('quantity', index)}
            />
          </div>
          <div className="p-2">
            <AutoComplete
              placeholder="Manufacturer"
              suggestions={manufacturersList}
              handleChange={handleChange('manufacturer', index)}
              value={itemData.manufacturer}
              type="single"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="p-2">
            <DatePicker
              fullWidth
              value={itemData.datetime_start}
              format="MMM DD, YYYY"
              placeholder="Start Date"
              onChange={handleChange('datetime_start', index)}
              animateYearScrolling={false}
              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
            />
          </div>
          <div className="p-2">
            <TextField
              id="year_min"
              type="number"
              value={itemData.year_min}
              fullWidth
              margin="none"
              placeholder="Oldest Year Manufacturer"
              onChange={handleNumberChange('year_min', index)}
            />
          </div>
          <div className="p-2">
            <AutoComplete
              placeholder="Model"
              suggestions={modelsList}
              handleChange={handleChange('model', index)}
              value={itemData.model}
              type="single"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="p-2">
            <DatePicker
              fullWidth
              value={itemData.datetime_end}
              format="MMM DD, YYYY"
              placeholder="End Date"
              onChange={handleChange('datetime_end', index)}
              animateYearScrolling={false}
              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
            />
          </div>
          <div className="p-2">
            <TextField
              id="hours_max"
              type="number"
              value={itemData.hours_max}
              fullWidth
              margin="none"
              placeholder="Max Machine Hours"
              onChange={handleNumberChange('hours_max', index)}
            />
          </div>
          {index > 0 && (
            <div className="p-1 d-flex justify-content-end">
              <i
                className="zmdi zmdi-close zmdi-hc-2x pointer mt-3"
                onClick={() => handleClose(index)}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemView;

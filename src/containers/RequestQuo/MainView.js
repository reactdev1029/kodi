import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AutoComplete from 'components/AutoComplete';
import GoogleAutoComplete from 'components/GoogleAutoComplete';
import ItemView from './ItemView';

class MainView extends React.Component {
  render() {
    const {
      typesList,
      manufacturersList,
      modelsList,
      address,
      rfq_items,
    } = this.props;

    return (
      <div className="">
        <div className="py-2">
          <h2 className="font-weight-bold">
            Complete your request for quotations (RFQ) below.
          </h2>
        </div>
        <h3>
          Reminder: The more detailed your request, the more accurate suppliers
          can meet your needs.
        </h3>
        <div className="d-flex flex-row p-3">
          <i className="zmdi zmdi-pin zmdi-hc-2x mt-2" />
          <div className="ml-4 dot-view-width">
            <GoogleAutoComplete
              address={address}
              addressChange={address => this.props.addressChange(address)}
              handleSelect={address => this.props.handleSelect(address)}
              placeholder="Project Location"
            />
          </div>
        </div>
        {rfq_items.length > 0 &&
          rfq_items.map((itemData, index) => (
            <ItemView
              key={index}
              index={index}
              typesList={typesList}
              manufacturersList={manufacturersList}
              modelsList={modelsList}
              itemData={itemData}
              handleChange={(name, index) =>
                this.props.handleChange(name, index)
              }
              handleNumberChange={(name, index) =>
                this.props.handleNumberChange(name, index)
              }
              handleClose={index => this.props.handleClose(index)}
            />
          ))}
        <div className="d-flex justify-content-end mt-3">
          <Button className="jr-btn" onClick={() => this.props.addEquipment()}>
            <i className="zmdi zmdi-chevron-right zmdi-hc-lg" />
            <span>Add Equipment</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { typesList, manufacturersList, modelsList } = content;
  return {
    typesList,
    manufacturersList,
    modelsList,
  };
};

export default connect(mapStateToProps)(MainView);

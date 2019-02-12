import React from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ListItem from 'containers/RentSearchResults/ListItem';

class AddEquipModal extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    const { result, org_equipment_list } = this.props;
    org_equipment_list
      .filter(equip => result.type === equip.type)
      .map(filter => {
        if (result.equip_items && result.equip_items.length > 0) {
          if (result.equip_items.find(equip => equip.uid === filter.uid)) {
            this.setState({ [filter.uid]: true });
          }
        }
      });
  }

  handleChange = uid => (event, checked) => {
    this.setState({ [uid]: checked });
  };

  equipSave = () => {
    const { result, org_equipment_list, index } = this.props;
    let rfq_items = [];
    org_equipment_list
      .filter(equip => result.type === equip.type)
      .map(filter => {
        if (this.state[filter.uid]) {
          rfq_items.push(filter);
        }
      });
    this.props.equipSave(rfq_items, index);
  };

  render() {
    const { result, org_equipment_list, pathname } = this.props;

    const filter_result = org_equipment_list.filter(
      equip => result.type === equip.type,
    );

    return (
      <div className="p-2">
        <ListItem result={result} pathname={'/modal'} />
        <div className="py-2 px-3">
          <h2 className="text-grey">Select which assets you'd like to use</h2>
        </div>
        <div className="d-flex flex-column px-4">
          {filter_result.map((filters, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  className="text-primary"
                  checked={this.state[filters.uid] ? true : false}
                  onChange={this.handleChange(filters.uid)}
                  value={filters.uid}
                />
              }
              label={`${filters.type} (${filters.manufacturer} ${
                filters.model
              }): ${filters.serial_number}`}
            />
          ))}
        </div>
        <div className="d-flex flex-row justify-content-center w-100 mt-4 p-3">
          <Button
            variant="raised"
            className="bg-grey darken-3 mr-4"
            onClick={() => this.props.handleRequestClose()}
          >
            <span className="text-white">Cancel</span>
          </Button>
          <Button
            variant="raised"
            color="primary"
            disabled={pathname === '/bid-basket' ? false : true}
            onClick={() => this.equipSave()}
          >
            <span className="text-white">Save</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null)(AddEquipModal);

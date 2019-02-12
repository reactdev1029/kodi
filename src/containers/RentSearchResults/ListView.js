import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedNumber, FormattedDate } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import ListItem from './ListItem';
import AddEquipModal from 'containers/BidBasket/AddEquipModal';
import {
  addToRfq,
  getOrgEquip,
  getBidBasketSuccess,
  getEquipDetails,
} from 'actions/Content';

class ListView extends React.Component {
  constructor() {
    super();
    this.state = {
      Link: undefined,
      rfq_items: [],
      open: false,
      selected_equip: undefined,
      selected_index: null,
    };
  }

  componentDidMount() {
    const { rfq_items, authUser } = this.props;
    this.setState({ rfq_items });
  }

  handleChange = (index, item) => {
    let { bid_rfq_items, rfq_items, datetime_start, datetime_end } = this.props;
    if (item) {
      let update_item = {
        ...item,
        datetime_start,
        datetime_end,
        quantity: 2,
      };
      rfq_items.push(update_item);
    } else {
      bid_rfq_items.rfq_items.splice(index, 1);
    }
    this.props.getBidBasketSuccess(bid_rfq_items);

    // this.props.addToRfq(rfq_items);
    this.setState({ rfq_items });
  };

  handleQuaChange = (index, symbol) => {
    let { bid_rfq_items } = this.props;
    if (symbol === '-') {
      if (bid_rfq_items.rfq_items[index].quantity > 1) {
        bid_rfq_items.rfq_items[index].quantity--;
      }
    } else {
      bid_rfq_items.rfq_items[index].quantity++;
    }
    this.props.getBidBasketSuccess(bid_rfq_items);
    this.setState({ open: false });

    // this.props.addToRfq(rfq_items);
    // this.setState({ rfq_items, Link: '/rent-basket' });
  };

  handleRequestOpen = (selected_equip, selected_index) => {
    this.setState({ open: true, selected_equip, selected_index });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  equipSave = (equip_items, index) => {
    let { bid_rfq_items } = this.props;
    bid_rfq_items.rfq_items[index].equip_items = equip_items;
    this.props.getBidBasketSuccess(bid_rfq_items);
    this.setState({ open: false });
  };

  handleEquipSelect = url => {
    this.props.getEquipDetails(url);
  };

  getSelected = (name, index, value) => {
    let { bid_rfq_items } = this.props;
    bid_rfq_items.rfq_items[index][name] = value;
    this.props.getBidBasketSuccess(bid_rfq_items);
  };

  handleTextChange = (name, index, value) => {
    let { bid_rfq_items } = this.props;
    bid_rfq_items.rfq_items[index][name] = value;
    this.props.getBidBasketSuccess(bid_rfq_items);
  };

  handleMansCheckChange = (name, index, checked) => {
    let { bid_rfq_items, mans_models } = this.props;
    let man_models_split = bid_rfq_items.rfq_items[
      index
    ].manufacturers_models.split(';');
    let manufacturers_models = '';
    man_models_split.map((mans, idx) => {
      let mans_split = mans.split(':');
      if (mans && name !== mans_split[0]) {
        manufacturers_models += `${mans};`;
      }
    });
    if (checked) {
      manufacturers_models += `${name}:`;
      let models = mans_models.find(mans => mans.name === name).models;
      models.map((model, ix) => {
        if (ix === models.length - 1) {
          manufacturers_models += model;
        } else {
          manufacturers_models += `${model},`;
        }
      });
      manufacturers_models += `;`;
    }
    bid_rfq_items.rfq_items[
      index
    ].manufacturers_models = manufacturers_models.slice(0, -1);
    this.props.getBidBasketSuccess(bid_rfq_items);
    this.setState({ open: false });
  };

  handleModelsCheckChange = (name, model, index, checked) => {
    let { bid_rfq_items } = this.props;

    let manufacturers_models = '';

    let man_models_split = bid_rfq_items.rfq_items[
      index
    ].manufacturers_models.split(';');

    man_models_split.map((mans, idx) => {
      let mans_split = mans.split(':');
      if (name === mans_split[0]) {
        if (checked) {
          manufacturers_models += `${mans},${model};`;
        } else {
          manufacturers_models += `${mans};`;
          if (mans_split[1].split(',').length === 1) {
            manufacturers_models = manufacturers_models.replace(
              `${name}:${model};`,
              '',
            );
          } else {
            manufacturers_models = manufacturers_models.replace(
              `,${model}`,
              '',
            );
          }
        }
      } else {
        manufacturers_models += `${mans};`;
      }
    });

    bid_rfq_items.rfq_items[
      index
    ].manufacturers_models = manufacturers_models.slice(0, -1);
    this.props.getBidBasketSuccess(bid_rfq_items);
    this.setState({ open: false });
  };

  noResults = () => {
    return (
      <div className="d-flex justify-content-center w-100">
        <h2 className="mt-5">
          {this.props.pathname === '/rent-search-results'
            ? 'No results match your search.'
            : 'No added items.'}
        </h2>
      </div>
    );
  };

  render() {
    const {
      Link,
      rfq_items,
      open,
      selected_equip,
      selected_index,
    } = this.state;
    const {
      rent_search,
      searchLoader,
      pathname,
      bid_rfq_items,
      org_equipment_list,
    } = this.props;

    let list_value = [];
    if (pathname === '/rent-search-results') {
      if (
        rent_search &&
        rent_search.length > 0 &&
        rent_search[0].rfq_item_details
      ) {
        list_value = [rent_search[0].rfq_item_details];
      }
    } else {
      if (
        bid_rfq_items &&
        bid_rfq_items.rfq_items &&
        bid_rfq_items.rfq_items.length > 0
      ) {
        list_value = bid_rfq_items.rfq_items;
      }
    }

    if (Link) return <Redirect to={Link} />;

    return (
      <div className="">
        {searchLoader && pathname === '/rent-search-results' ? (
          <div className="d-flex justify-content-center align-items-center w-100 p-5">
            <CircularProgress size={80} className="text-secondary" />
          </div>
        ) : list_value.length > 0 ? (
          list_value.map((result, index) => (
            <ListItem
              key={index}
              index={index}
              pathname={pathname}
              result={result}
              handleChange={this.handleChange.bind(this)}
              handleQuaChange={this.handleQuaChange.bind(this)}
              org_equipment_list={org_equipment_list}
              handleRequestOpen={this.handleRequestOpen.bind(this)}
              handleEquipSelect={this.handleEquipSelect.bind(this)}
              getSelected={this.getSelected.bind(this)}
              handleTextChange={this.handleTextChange.bind(this)}
              handleMansCheckChange={this.handleMansCheckChange.bind(this)}
              handleModelsCheckChange={this.handleModelsCheckChange.bind(this)}
            />
          ))
        ) : (
          this.noResults()
        )}
        {/*
          <div className="d-flex justify-content-end w-100">
            <ReactPaginate
              previousLabel={
                width > 768 ? (
                  'previous'
                ) : (
                  <i className="zmdi zmdi-skip-previous zmdi-hc-fw" />
                )
              }
              nextLabel={
                width > 768 ? (
                  'next'
                ) : (
                  <i className="zmdi zmdi-skip-next zmdi-hc-fw" />
                )
              }
              breakLabel={''}
              pageCount={Math.ceil(asset.count / 10)}
              marginPagesDisplayed={width > 1199 ? 2 : 1}
              pageRangeDisplayed={width > 1199 ? 2 : 1}
              onPageChange={this.onChangePage.bind(this)}
              containerClassName={'pagination mb-0'}
              subContainerClassName={'pages pagination'}
              activeClassName={'actived'}
              pageClassName={'page-item'}
              nextClassName={'page-item'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              forcePage={page}
            />
          </div>
            */}
        {bid_rfq_items && (
          <div className="d-flex justify-content-end w-100">
            <span className="h3-font-size mt-2">
              <span className="h3-font-size font-weight-bold">
                <FormattedNumber
                  value={bid_rfq_items.rfq_items.reduce(
                    (a, { quantity }) => a + quantity,
                    0,
                  )}
                />
              </span>
              {` machines requested`}
            </span>
          </div>
        )}
        <Dialog open={open} onClose={this.handleRequestClose} maxWidth={'md'}>
          <AddEquipModal
            result={selected_equip}
            index={selected_index}
            org_equipment_list={org_equipment_list}
            handleRequestClose={this.handleRequestClose.bind(this)}
            equipSave={this.equipSave.bind(this)}
            pathname={pathname}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, content, auth }) => {
  const { width } = settings;
  const { authUser } = auth;
  const {
    rent_search,
    searchLoader,
    rfq_items,
    datetime_start,
    datetime_end,
    bid_rfq_items,
    org_equipment_list,
    mans_models,
  } = content;
  return {
    width,
    rent_search,
    searchLoader,
    rfq_items,
    datetime_start,
    datetime_end,
    bid_rfq_items,
    authUser,
    org_equipment_list,
    mans_models,
  };
};

export default connect(
  mapStateToProps,
  { addToRfq, getOrgEquip, getBidBasketSuccess, getEquipDetails },
)(ListView);

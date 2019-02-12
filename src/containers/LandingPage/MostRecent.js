import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import ReactStars from 'react-stars';
import { getSort, getBuyEquip } from 'actions/Content';

class MostRecent extends React.Component {
  constructor() {
    super();
    this.state = {
      Link: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.buy_equip_details &&
      nextProps.buy_search &&
      nextProps.pathname === '/'
    ) {
      this.setState({
        Link: `/buy-equipment-profile/${nextProps.buy_equip_details.uid}`,
      });
    }
  }

  render() {
    const { Link } = this.state;
    const { ordering, buy_search } = this.props;
    let sortList = [
      { name: 'For Sale', value: 'for_sale' },
      { name: 'For Rent', value: 'for_rent' },
    ];

    if (Link) return <Redirect to={Link} />;

    return (
      <div>
        <div className="d-flex justify-content-between mb-1">
          <span className="h3-font-size font-weight-bold">Most Recent</span>
          <div className="d-flex justify-content-end align-items-center h-100">
            {sortList.map((type, index) => (
              <div
                key={index}
                className={`d-flex border-width-2 search-type-width justify-content-center ${
                  ordering === type.value ? 'border-primary' : 'border-white'
                } pointer`}
                onClick={() => this.props.getSort(type.value)}
              >
                <span className={`h3-font-size`}>{type.name}</span>
              </div>
            ))}
          </div>
        </div>
        {buy_search && buy_search.count > 0 && (
          <div className="d-flex align-items-center justify-content-center border border-grey rounded-lg p-2">
            <Grid container spacing={16} className="mt-1">
              {buy_search.results.map(
                (item, index) =>
                  index < 4 && (
                    <Grid key={index} item xs={6} lg={3}>
                      <div className="d-flex flex-column justify-content-center">
                        <img
                          src={item.thumbnail_url ? item.thumbnail_url : ''}
                          className="most-img-width rounded-lg pointer"
                          onClick={() => this.props.getBuyEquip(item.url)}
                        />
                        <span className="font-weight-bold mt-2">{`${
                          item.quip_type
                        } ${item.model}`}</span>
                        <span>{item.manufacturer}</span>
                        <span>
                          <FormattedDate
                            value={new Date(item.manufacture_date)}
                          />
                        </span>
                        <span>
                          <FormattedNumber
                            value={item.purchase_price}
                            style="currency"
                            currency={item.currency}
                          />
                        </span>
                      </div>
                    </Grid>
                  ),
              )}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { searchLoader, buy_equip_details } = content;
  return {
    searchLoader,
    buy_equip_details,
  };
};

export default connect(
  mapStateToProps,
  { getSort, getBuyEquip },
)(MostRecent);

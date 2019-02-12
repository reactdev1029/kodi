import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from './ListItem';
import { getBuyEquip } from 'actions/Content';

class ListView extends React.Component {
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
      nextProps.pathname === '/buy-search-results'
    ) {
      this.setState({
        Link: `/buy-equipment-profile/${nextProps.buy_equip_details.uid}`,
      });
    }
  }

  handleChange = result => {
    this.props.getBuyEquip(result.url);
  };

  noResults = () => {
    return (
      <div className="d-flex justify-content-center w-100">
        <h2 className="mt-5">No results match your search.</h2>
      </div>
    );
  };

  render() {
    const { Link } = this.state;
    const { searchLoader, buy_search } = this.props;

    if (Link) return <Redirect to={Link} />;

    let buy_search_list = [];
    if (buy_search) {
      buy_search_list = buy_search.results ? buy_search.results : buy_search;
    }

    return (
      <div className="">
        {searchLoader ? (
          <div className="d-flex justify-content-center align-items-center w-100 p-5">
            <CircularProgress size={80} className="text-secondary" />
          </div>
        ) : buy_search_list.length > 0 ? (
          buy_search_list.map((result, index) => (
            <ListItem
              key={index}
              result={result}
              handleChange={this.handleChange.bind(this)}
            />
          ))
        ) : (
          this.noResults()
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { buy_search, searchLoader, buy_equip_details } = content;
  return {
    buy_search,
    searchLoader,
    buy_equip_details,
  };
};

export default connect(
  mapStateToProps,
  { getBuyEquip },
)(ListView);

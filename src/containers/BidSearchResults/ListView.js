import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from 'components/utils/SnackBar';
import ListItem from './ListItem';
import { getBidBasket, errorClear } from 'actions/Content';

class ListView extends React.Component {
  constructor() {
    super();
    this.state = {
      Link: undefined,
      open: false,
      error: '',
      variant: '',
    };
  }

  componentDidMount() {
    this.props.errorClear();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.bid_rfq_items &&
      nextProps.bid_rfq_items.rfq_items &&
      nextProps.bid_rfq_items.rfq_items.length > 0
    ) {
      this.setState({ Link: `/bid-basket` });
    } else if (nextProps.error) {
      this.setState({
        open: true,
        error: 'Error!',
        variant: 'error',
      });
    }
  }

  handleChange = url => {
    this.props.getBidBasket(url);
  };

  snackbarClose = () => {
    this.setState({ open: false });
  };

  noResults = () => {
    return (
      <div className="d-flex justify-content-center w-100">
        <h2 className="mt-5">No results match your search.</h2>
      </div>
    );
  };

  render() {
    const { Link, open, error, variant } = this.state;
    const { searchLoader, bid_search, pathname } = this.props;

    if (Link) return <Redirect to={Link} />;

    return (
      <div className="">
        {searchLoader && pathname === '/bid-search-results' ? (
          <div className="d-flex justify-content-center align-items-center w-100 p-5">
            <CircularProgress size={80} className="text-secondary" />
          </div>
        ) : bid_search && bid_search.count > 0 ? (
          bid_search.results.map((result, index) => (
            <ListItem
              key={index}
              result={result}
              handleChange={this.handleChange.bind(this)}
            />
          ))
        ) : (
          this.noResults()
        )}
        <SnackBar
          open={open}
          error={error}
          variant={variant}
          snackbarClose={() => this.snackbarClose()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, content }) => {
  const { width } = settings;
  const { bid_search, searchLoader, loader, bid_rfq_items, error } = content;
  return {
    width,
    bid_search,
    searchLoader,
    loader,
    bid_rfq_items,
    error,
  };
};

export default connect(
  mapStateToProps,
  { getBidBasket, errorClear },
)(ListView);

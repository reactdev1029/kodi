import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from 'components/utils/SnackBar';
import { getBidBasket, errorClear } from 'actions/Content';
import BrowseButtons from './BrowseButtons';
import MostRecent from './MostRecent';

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
    const {
      searchLoader,
      bid_search,
      pathname,
      categoryList,
      ordering,
      buy_search,
    } = this.props;

    if (Link) return <Redirect to={Link} />;

    return (
      <div className="">
        <BrowseButtons categoryList={categoryList} buy_search={buy_search} />
        <MostRecent
          ordering={ordering}
          buy_search={buy_search}
          pathname={pathname}
        />
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
  const {
    bid_search,
    searchLoader,
    loader,
    bid_rfq_items,
    error,
    categoryList,
    ordering,
    buy_search,
  } = content;
  return {
    width,
    bid_search,
    searchLoader,
    loader,
    bid_rfq_items,
    error,
    categoryList,
    ordering,
    buy_search,
  };
};

export default connect(
  mapStateToProps,
  { getBidBasket, errorClear },
)(ListView);

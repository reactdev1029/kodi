import React from 'react';
import { connect } from 'react-redux';
import { FormattedNumber, FormattedDate } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Link, Redirect } from 'react-router-dom';
import { getSelectedCategory, getBuySearch } from 'actions/Content';

class BrowseButtons extends React.Component {
  constructor() {
    super();
    this.state = {
      searchLink: undefined,
      searchBtn: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.buy_search && this.state.searchBtn) {
      this.setState({ searchBtn: false, searchLink: '/buy-search-results' });
    }
  }

  handleChange = selectedCategory => {
    const {
      ordering,
      keywords,
      selectedManufacturer,
      selectedCountry,
    } = this.props;

    this.props.getSelectedCategory(selectedCategory);

    if (
      ordering !== '' &&
      selectedCountry !== '' &&
      selectedManufacturer !== ''
    ) {
      let params = {
        mans_models: `${selectedManufacturer}:all`,
        quip_cat: escape(selectedCategory.toLowerCase()),
        country: selectedCountry,
        keywords,
        [ordering]: true,
        landing: false,
      };
      this.props.getBuySearch(params);
      this.setState({ searchBtn: true });
    }
  };

  render() {
    const { categoryList, buy_search } = this.props;
    const { searchLink } = this.state;

    if (searchLink) return <Redirect to={searchLink} />;

    return (
      <div className="mb-4">
        <span className="h2-font-size font-weight-bold">
          <FormattedNumber value={buy_search ? buy_search.count : 0} />
        </span>
        <span className="h3-font-size ml-1">
          machines available on{' '}
          <span className="font-weight-bold">kodi.equipment</span>, the online
          marketplace for heavy-equipment
        </span>
        <Grid container spacing={16} className="mt-1">
          {categoryList.map((category, index) => (
            <Grid item key={index} xs={6} lg={3}>
              <div
                className="d-flex flex-column align-items-center justify-content-center browse-btn-width border border-grey rounded-lg p-2 pointer"
                onClick={() => this.handleChange(category.label)}
              >
                <img
                  src={'assets/images/logo1.png'}
                  className="browse-btn-img-width"
                />
                <span
                  className="font-weight-bold"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {category.label}
                </span>
              </div>
            </Grid>
          ))}
        </Grid>
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
    keywords,
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
    keywords,
  };
};

export default connect(
  mapStateToProps,
  { getSelectedCategory, getBuySearch },
)(BrowseButtons);

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Filter from 'components/Filter';
import SideView from './SideView';
import DetailsView from './DetailsView';
import ListView from 'containers/BuySearchResults/ListView';
import { getSimilarBuy } from 'actions/Content';

class EquipmentProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      Link: undefined,
    };
  }

  componentDidMount() {
    const { buy_equip_details } = this.props;
    if (buy_equip_details) {
      this.props.getSimilarBuy(buy_equip_details.uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.buy_equip_details &&
      nextProps.location.pathname !==
        `/buy-equipment-profile/${nextProps.buy_equip_details.uid}`
    ) {
      this.setState({
        Link: `/buy-equipment-profile/${nextProps.buy_equip_details.uid}`,
      });
    }
  }

  render() {
    const { Link } = this.state;
    const {
      location,
      equip_details,
      buy_equip_details,
      buy_search,
    } = this.props;

    if (Link) return <Redirect to={Link} />;

    let result = undefined;
    if (
      equip_details &&
      location.pathname === `/equipment-profile/${equip_details.uid}`
    ) {
      result = equip_details;
    } else {
      result = buy_equip_details;
    }

    return (
      <div className="max-height bg-white">
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <Grid container spacing={16}>
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                className="d-flex justify-content-center"
              >
                {result && (
                  <SideView result={result} pathname={location.pathname} />
                )}
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                {result && (
                  <div>
                    <DetailsView result={result} pathname={location.pathname} />
                    {location.pathname ===
                      `/buy-equipment-profile/${result.uid}` &&
                      buy_search &&
                      buy_search.results &&
                      buy_search.results.length > 0 && (
                        <div>
                          <h3 className="font-weight-bold mb-3">
                            You May Also Like:
                          </h3>
                          <ListView pathname={location.pathname} />
                        </div>
                      )}
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ content }) => {
  const { equip_details, buy_equip_details, buy_search } = content;
  return {
    equip_details,
    buy_equip_details,
    buy_search,
  };
};

export default connect(
  mapStateToProps,
  { getSimilarBuy },
)(EquipmentProfile);

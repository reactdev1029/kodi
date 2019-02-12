import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Filter from 'components/Filter';
import SideView from 'containers/RentSearchResults/SideView';
import ListView from './ListView';

class BuySearchResults extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.mans_models) {
      this.setInitialState(this.props.mans_models);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mans_models) {
      this.setInitialState(nextProps.mans_models);
    }
  }

  setInitialState(mans_models) {
    mans_models.map(model => {
      if (this.state[model.name] === undefined) {
        this.setState({
          [model.name]: true,
        });
      }
      if (this.state[`${model.name}_all`] === undefined) {
        this.setState({
          [`${model.name}_all`]: true,
          [`${model.name}_value`]: `${model.name}:all`,
        });
      }
      if (model.models) {
        model.models.map(item => {
          if (this.state[item] === undefined) {
            this.setState({ [item]: true });
          }
        });
      }
    });
    let o_countries = '';
    this.props.countries &&
      this.props.countries.map(country => {
        if (this.state[country.name] === undefined) {
          o_countries += `${country.name},`;
          this.setState({ [country.name]: true, o_countries });
        }
      });
  }

  handleCountryCheckChange = name => (event, checked) => {
    this.setState({ [name]: checked });
    if (checked) {
      this.setState({ o_countries: `${this.state.o_countries}${name},` });
    } else {
      this.setState({
        o_countries: this.state.o_countries.replace(`${name},`, ''),
      });
    }
  };

  handleMansCheckChange = name => (event, checked) => {
    this.setState({ [name]: checked });
    if (checked) {
      this.setState({
        [`${name}_value`]: `${name}:all`,
        [`${name}_all`]: true,
      });
    } else {
      this.setState({ [`${name}_value`]: '' });
    }
  };

  handleAllCheckChange = (name, model) => (event, checked) => {
    this.setState({ [name]: checked });
    if (this.state[model.name]) {
      if (checked) {
        this.setState({
          [`${model.name}_value`]: `${model.name}:all`,
        });
      } else {
        let model_value = '';
        model.models &&
          model.models.map(item => {
            if (this.state[item]) {
              model_value += `${item},`;
            }
          });
        if (model_value === '') {
          this.setState({
            [`${model.name}_value`]: '',
          });
        } else {
          this.setState({
            [`${model.name}_value`]: `${model.name}:${model_value}`,
          });
        }
      }
    }
  };

  handleModelsCheckChange = (name, model) => (event, checked) => {
    this.setState({ [name]: checked });
    if (this.state[model.name] && !this.state[`${model.name}_all`]) {
      if (checked) {
        if (this.state[`${model.name}_value`] === '') {
          this.setState({
            [`${model.name}_value`]: `${model.name}:${name},`,
          });
        } else {
          this.setState({
            [`${model.name}_value`]: `${
              this.state[`${model.name}_value`]
            }${name},`,
          });
        }
      } else {
        this.setState({
          [`${model.name}_value`]: this.state[`${model.name}_value`].replace(
            `${name},`,
            '',
          ),
        });
        if (
          this.state[`${model.name}_value`].replace(`${name},`, '') ===
          `${model.name}:`
        ) {
          this.setState({
            [`${model.name}_value`]: '',
          });
        }
      }
    }
  };

  render() {
    const { o_countries } = this.state;
    const { location, countries, mans_models } = this.props;

    let country_state = {};
    countries &&
      countries.map(country => {
        country_state[country.name] = this.state[country.name];
      });

    let model_name_state = {};
    let model_all_state = {};
    let model_state = {};
    let mans_models_value = '';
    mans_models &&
      mans_models.map(model => {
        model_name_state[model.name] = this.state[model.name];
        model_all_state[model.name] = this.state[`${model.name}_all`];
        model.models &&
          model.models.map(item => {
            model_state[item] = this.state[item];
          });

        let mans_models_name = this.state[`${model.name}_value`];
        if (this.state[model.name] && !this.state[`${model.name}_all`]) {
          mans_models_name = this.state[`${model.name}_value`].slice(0, -1);
        }
        if (mans_models_name !== undefined && mans_models_name !== '') {
          mans_models_value += `${mans_models_name}-`;
        }
      });

    let o_countries_value = '';
    if (o_countries !== undefined && o_countries !== '') {
      o_countries_value = o_countries.slice(0, -1);
    }

    let mans_models_final = '';
    if (mans_models_value !== undefined && mans_models_value !== '') {
      mans_models_final = mans_models_value.slice(0, -1);
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
                <SideView
                  country_state={country_state}
                  model_name_state={model_name_state}
                  model_all_state={model_all_state}
                  model_state={model_state}
                  handleCountryCheckChange={this.handleCountryCheckChange.bind(
                    this,
                  )}
                  handleMansCheckChange={this.handleMansCheckChange.bind(this)}
                  handleAllCheckChange={this.handleAllCheckChange.bind(this)}
                  handleModelsCheckChange={this.handleModelsCheckChange.bind(
                    this,
                  )}
                  pathname={location.pathname}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <ListView pathname={location.pathname} />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ content }) => {
  const { countries, mans_models } = content;
  return {
    countries,
    mans_models,
  };
};

export default connect(mapStateToProps)(BuySearchResults);

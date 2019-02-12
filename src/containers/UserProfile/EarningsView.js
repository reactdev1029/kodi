import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const lineChartData = [
  { name: 'J', earning: 2424 },
  { name: 'F', earning: 1812 },
  { name: 'M', earning: 2276 },
  { name: 'A', earning: 1709 },
  { name: 'M', earning: 2552 },
  { name: 'J', earning: 1866 },
  { name: 'J', earning: 2181 },
  { name: 'S', earning: 1498 },
  { name: 'O', earning: 1869 },
  { name: 'N', earning: 2290 },
  { name: 'D', earning: 2531 },
];

class EarningsView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="equipment-details mb-4 py-3">
        <h3 className="font-weight-bold">Earnings</h3>
        <Grid container spacing={16}>
          <Grid item xs={12} md={9}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={lineChartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar
                  type="monotone"
                  dataKey="earning"
                  fill="#fec40e"
                  barSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={3} className="p-3">
            <div>
              <span>Total Earnings</span>
              <h2 className="font-weight-bold">$14,500</h2>
            </div>
            <div>
              <span>Number of contracts</span>
              <h2 className="font-weight-bold">12</h2>
            </div>
            <div>
              <span>Number of clients</span>
              <h2 className="font-weight-bold">5</h2>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null)(EarningsView);

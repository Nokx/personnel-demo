import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import auth from '../../features/auth';
import PageLayout from '../PageLayout';

const { UserTable } = auth.containers;

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

@connect(createStructuredSelector({}))
class UserPage extends Component {
  render() {
    return (
      <PageLayout title="Управление пользователями">
        <Grid container>
          <Grid item xs={12}>
            <UserTable />
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

const styles = () => ({
  commonInfo: {
    marginBottom: 20,
    height: 100,
    padding: 10,
  },
  commonInfoTitle: {
    marginBottom: 10,
  },
  tabPanel: {
    backgroundColor: '#3e566d',
  },
  indicator: {
    backgroundColor: '#009688',
    height: 5,
  },
});

export default withStyles(styles)(UserPage);

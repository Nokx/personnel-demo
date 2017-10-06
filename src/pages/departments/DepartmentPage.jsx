import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import {
  DepartmentTree,
  DepartmentTable,
  DepartmentView,
} from '../../features/department_tree/containers/index';
import department from '../../features/department_tree';
import PageLayout from '../PageLayout';

const { getDepartmentCount } = department.selectors;

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

@connect(
  createStructuredSelector({
    departmentCount: getDepartmentCount,
  }),
)
class DepartmentPage extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <PageLayout title="Управление подразделениями">
        <Paper elevation={4} className={classes.commonInfo}>
          <Typography type="title" component="h3" className={classes.commonInfoTitle}>
            Общая информация
          </Typography>
          <Typography type="body1" component="p">
            Всего подразделений: {this.props.departmentCount}
          </Typography>
        </Paper>

        <Grid container>
          <Grid item xs={12}>
            <AppBar position="static" className={classes.tabPanel}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorClassName={classes.indicator}
              >
                <Tab label="Дерево" />
                <Tab label="Таблица" />
                <Tab label="Просмотр" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <DepartmentTree />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <DepartmentTable />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <DepartmentView />
              </TabContainer>
            )}
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

const styles = theme => ({
  title: {
    marginBottom: 30,
  },
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

export default withStyles(styles)(DepartmentPage);

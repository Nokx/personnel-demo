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
  PositionTree,
  PositionTable,
  PositionView,
} from '../../features/position_tree/containers/index';
import position from '../../features/position_tree';
import PageLayout from '../PageLayout';

const { getPositionCount } = position.selectors;

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

@connect(
  createStructuredSelector({
    positionCount: getPositionCount,
  }),
)
class PositionPage extends Component {
  state = {
    tabIndex: 0,
  };

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { classes } = this.props;
    const { tabIndex } = this.state;

    return (
      <PageLayout title="Управление должностями">
        <Paper elevation={4} className={classes.commonInfo}>
          <Typography type="title" component="h3" className={classes.commonInfoTitle}>
            Общая информация
          </Typography>
          <Typography type="body1" component="p">
            Всего должностей: {this.props.positionCount}
          </Typography>
        </Paper>

        <Grid container>
          <Grid item xs={12}>
            <AppBar position="static" className={classes.tabPanel}>
              <Tabs
                value={tabIndex}
                onChange={this.handleChange}
                indicatorClassName={classes.indicator}
              >
                <Tab label="Дерево" />
                <Tab label="Таблица" />
                <Tab label="Просмотр" />
              </Tabs>
            </AppBar>
            {tabIndex === 0 && (
              <TabContainer>
                <PositionTree />
              </TabContainer>
            )}
            {tabIndex === 1 && (
              <TabContainer>
                <PositionTable />
              </TabContainer>
            )}
            {tabIndex === 2 && (
              <TabContainer>
                <PositionView />
              </TabContainer>
            )}
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

export default withStyles(styles)(PositionPage);

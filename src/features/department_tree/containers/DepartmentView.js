import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Tree from 'react-d3-tree';
import Paper from 'material-ui/Paper';

import { getTreeData, getIsRequestAllProccess } from '../redux/selectors';

const treeStyles = {
  links: {
    stroke: '#3e566d',
  },
  nodes: {
    node: {
      circle: {
        stroke: '#3e566d',
        strokeWidth: 2,
        fill: '#20b2aa',
      },
      name: {
        stroke: '#3e566d',
        fontSize: '12',
      },
    },
    leafNode: {
      circle: {
        stroke: '#3e566d',
        strokeWidth: 2,
      },
      name: {
        stroke: '#3e566d',
        x: 0,
        y: 0,
        strokeWidth: 1,
        shapeRendering: 'crispEdges',
        fontSize: '12',
      },
    },
  },
};

@connect(
  createStructuredSelector({
    treeData: getTreeData,
    isRequestAllProccess: getIsRequestAllProccess,
  }),
)
class DepartmentView extends Component {
  render() {
    const { classes, treeData } = this.props;
    const showTree = treeData && !!treeData.length;
    return (
      <Paper className={classes.paper} style={{ height: 1000 }}>
        {showTree && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 500, y: 50 }}
            collapsible
            pathFunc="straight"
            styles={treeStyles}
            separation={{ siblings: 2 }}
          />
        )}
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const wrappedPositionTable = withStyles(styles)(DepartmentView);
export { wrappedPositionTable as DepartmentView };

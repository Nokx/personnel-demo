import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableRowDetail,
  DragDropContext,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  LocalSorting,
  PagingState,
  LocalPaging,
  FilteringState,
  LocalFiltering,
  RowDetailState,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';

const actionColumnMetadata = {
  name: 'actions',
  title: 'Действия',
};

class CommonTable extends Component {
  componentWillMount() {
    const { columns, columnOrder, showActions } = this.props;
    this.setState({
      columns: showActions ? [...columns, actionColumnMetadata] : [...columns],
      columnOrder: showActions ? [...columnOrder, actionColumnMetadata.name] : [...columnOrder],
    });
  }

  renderFilter = ({ row, column }) => {
    const { classes, showActions, renderFilters } = this.props;
    if (column.name === actionColumnMetadata.name) {
      if (showActions) {
        return (
          <TableCell className={classes.cell}>
            <div />
          </TableCell>
        );
      }
    } else if (renderFilters) {
      return renderFilters(row);
    }
    return undefined;
  };

  renderColumns = ({ row, column }) => {
    const { renderActions, renderColumns, showActions } = this.props;
    if (column.name === actionColumnMetadata.name) {
      if (showActions) {
        return renderActions(row);
      }
    } else if (renderColumns) {
      return renderColumns({ row, column });
    }
    return undefined;
  };

  render() {
    const { classes, tableData, handleAdd, renderDetail, filters } = this.props;
    const { columns, columnOrder } = this.state;
    return (
      <div>
        <Button fab className={classes.addButton} onClick={handleAdd}>
          <AddIcon />
        </Button>
        <Grid rows={tableData} columns={columns}>
          <ColumnOrderState defaultOrder={columnOrder} />
          <DragDropContext />
          {renderDetail && <RowDetailState />}
          <FilteringState defaultFilters={filters} />
          <LocalFiltering />
          <PagingState defaultCurrentPage={0} pageSize={8} />
          <LocalPaging />
          <SortingState />
          <LocalSorting />
          <TableView tableCellTemplate={this.renderColumns} />
          <TableHeaderRow allowSorting />
          <PagingPanel />
          <TableFilterRow filterCellTemplate={this.renderFilter} />
          {renderDetail && <TableRowDetail template={renderDetail} />}
        </Grid>
      </div>
    );
  }
}

const styles = () => ({
  addButton: {
    margin: '10px 15px',
    backgroundColor: '#009688',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#20b2aa',
    },
  },
});

const wrappedCommonTable = withStyles(styles)(CommonTable);
export { wrappedCommonTable as CommonTable };

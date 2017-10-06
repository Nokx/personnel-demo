import React, { Component } from 'react';
import { TableActions } from '../../../components';

class PositionTableActions extends Component {
  handleRemove = () => {
    const { row, handleRemove } = this.props;
    handleRemove(row);
  };
  handleEdit = () => {
    const { row, handleEdit } = this.props;
    handleEdit(row);
  };
  render() {
    const { row } = this.props;
    return (
      <TableActions
        allowDelete={!row.is_department_head}
        onRemoveClick={this.handleRemove}
        onEditClick={this.handleEdit}
      />
    );
  }
}

export { PositionTableActions };

import React, { Component } from 'react';
import { TableActions } from '../../../components';

class UserTableActions extends Component {
  handleRemove = () => {
    const { row, handleRemove } = this.props;
    handleRemove(row);
  };
  handleEdit = () => {
    const { row, handleEdit } = this.props;
    handleEdit(row);
  };
  render() {
    return (
      <TableActions onRemoveClick={this.handleRemove} onEditClick={this.handleEdit} allowDelete />
    );
  }
}

export { UserTableActions };

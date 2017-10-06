import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { submit } from 'redux-form';
import dialog from '../../dialogs';
import { EditDepartmentForm } from '../components';
import * as importedDepartmentActions from '../redux/actions';
import { makeEditSelectedOptions } from '../redux/selectors';

const { CommonFormDialog } = dialog.components;

class EditDepartmentDialog extends Component {
  state = {
    initialValues: {},
    disabledFields: [],
    hiddenFields: [],
  };

  componentWillMount() {
    const { dlgProps: node } = this.props;
    const state = {
      initialValues: {
        parent_id: node.parent_id,
        name: node.title,
      },
    };
    if (!node.parent_id) {
      state.hiddenFields = ['parent_id'];
    }

    this.setState(state);
  }

  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleSubmit = values => {
    const { dlgProps: oldNode, dialogId, dialogActions, departmentActions } = this.props;
    departmentActions.editNodeRequest(oldNode, values);
    dialogActions.hide(dialogId);
  };

  handleUpdate = () => {
    this.props.reduxForm.submit('edit_department');
  };

  render() {
    const { departments } = this.props;
    const { initialValues, hiddenFields } = this.state;
    return (
      <CommonFormDialog
        formTitle="Редактировать подразделение"
        handleClose={this.handleClose}
        handleSave={this.handleCreate}
      >
        <EditDepartmentForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          departments={departments}
          hiddenFields={hiddenFields}
        />
      </CommonFormDialog>
    );
  }
}

const makeMapStateToProps = () => {
  const editSelectedOptions = makeEditSelectedOptions();
  const mapStateToProps = (state, ownProps) => ({
    dlgProps: ownProps,
    departments: editSelectedOptions(state, ownProps),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  departmentActions: bindActionCreators({ ...importedDepartmentActions }, dispatch),
  reduxForm: bindActionCreators({ submit }, dispatch),
});

const styles = () => ({
  paper: {
    width: '80%',
    maxHeight: 500,
  },
});

const wrappedEditDepartmentDialog = withStyles(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(EditDepartmentDialog),
);

export { wrappedEditDepartmentDialog as EditDepartmentDialog };

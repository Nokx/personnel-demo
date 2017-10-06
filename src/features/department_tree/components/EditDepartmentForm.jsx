import React from 'react';
import { Field, reduxForm } from 'redux-form';
import R from 'ramda';
import { renderTextField, renderSelectField } from '../../../helpers/materialui-reduxform-adapters';
import { validateRequired } from '../../../helpers/form-helper';

const getValue = value => (value != null ? value.id : null);

const requiredFields = ['parent_id', 'name'];
const validate = values => validateRequired(requiredFields, values);

let EditDepartmentForm = ({ handleSubmit, departments, disabled, hiddenFields = [] }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        {!R.contains('parent_id', hiddenFields) && (
          <Field
            name="parent_id"
            options={departments}
            component={renderSelectField}
            placeholder="Выберите подразделение..."
            labelKey="title"
            valueKey="id"
            getValue={getValue}
            label="Родительское подразделение"
            disabled={disabled}
          />
        )}
        <Field
          name="name"
          component={renderTextField}
          label="Название подразделения"
          placeholder="Управление"
          type="text"
        />
      </div>
    </form>
  </div>
);

EditDepartmentForm = reduxForm({
  form: 'edit_department',
  validate,
})(EditDepartmentForm);

export { EditDepartmentForm };

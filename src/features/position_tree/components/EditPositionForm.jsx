import React from 'react';
import { Field, reduxForm } from 'redux-form';
import R from 'ramda';
import { renderTextField, renderSelectField } from '../../../helpers/materialui-reduxform-adapters';
import { validateRequired } from '../../../helpers/form-helper';

const getValue = value => (value != null ? value.id : null);

const requiredFields = ['parent_id', 'name'];
const validate = values => validateRequired(requiredFields, values);

let EditPositionForm = ({ handleSubmit, positions, hiddenFields = [], disabledFields = [] }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        {!R.contains('parent_id', hiddenFields) && (
          <Field
            name="parent_id"
            options={positions}
            component={renderSelectField}
            placeholder="Выберите должность..."
            labelKey="title"
            valueKey="id"
            getValue={getValue}
            label="Родительская должность"
            disabled={R.contains('parent_id', disabledFields)}
          />
        )}
        <Field
          name="name"
          component={renderTextField}
          label="Название должности"
          placeholder="Менеджер"
          type="text"
          disabled={R.contains('name', disabledFields)}
        />
      </div>
    </form>
  </div>
);

EditPositionForm = reduxForm({
  form: 'edit_position',
  validate,
})(EditPositionForm);

export { EditPositionForm };

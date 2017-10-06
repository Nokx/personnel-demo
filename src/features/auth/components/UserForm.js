import React from 'react';
import { Field, reduxForm } from 'redux-form';
import R from 'ramda';
import { renderTextField } from '../../../helpers/materialui-reduxform-adapters';
import { validateRequired } from '../../../helpers/form-helper';

const requiredFields = ['email', 'password', 'first_name', 'last_name'];
const validate = values => validateRequired(requiredFields, values);

const UserForm = ({ handleSubmit, disabledFields = [], hiddenFields = [] }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="email"
      component={renderTextField}
      label="Email"
      placeholder="Email"
      type="text"
      disabled={R.contains('email', disabledFields)}
    />
    {!R.contains('password', hiddenFields) && (
      <Field
        name="password"
        component={renderTextField}
        label="Пароль"
        placeholder="Пароль"
        type="password"
      />
    )}
    <Field
      name="first_name"
      component={renderTextField}
      label="Имя"
      placeholder="Иван"
      type="text"
    />
    <Field
      name="last_name"
      component={renderTextField}
      label="Фамилия"
      placeholder="Иванов"
      type="text"
    />
  </form>
);

const wrappedSignInForm = reduxForm({
  form: 'user_form',
  validate,
})(UserForm);

export { wrappedSignInForm as UserForm };

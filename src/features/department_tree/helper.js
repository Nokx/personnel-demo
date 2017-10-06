export const validate = values => {
  const errors = {};
  const requiredFields = ['title'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Поле не может быть пустым';
    }
  });
  return errors;
};

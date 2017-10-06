export const validateRequired = (requiredFields, values) => {
  const errors = {};
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Поле не может быть пустым';
    }
  });
  return errors;
};

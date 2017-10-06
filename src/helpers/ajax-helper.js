export const getError = response => {
  const { body } = response;
  return body.error;
};

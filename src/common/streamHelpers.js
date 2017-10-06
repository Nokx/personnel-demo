import xs from 'xstream';
// import R from 'ramda';
import flattenConcurrently from 'xstream/extra/flattenConcurrently';

const handleResponse = (response$, defaultErrorText) =>
  response$
    .replaceError(err => err.response && err.response.body
        ? xs.of(err.response)
        : xs.of({ body: { error: { message: defaultErrorText } } }))
    .map(response => (response.body ? response : { ...response, body: { error: undefined } }));

export const getHttpSourceEventStream = (httpSource, category, defaultErrorText) =>
  httpSource
    .select(category)
    .map(response$ => handleResponse(response$, defaultErrorText))
    .compose(flattenConcurrently);

// export const handleResponseResult = (result, successHandler, errorHandler) =>
//   R.ifElse(
//     R.has('error'),
//     R.compose(errorHandler, R.prop('error')),
//     R.compose(successHandler, arrToObj))(result);

// function arrToObj( {rows, columns}){
//   return rows.map(row => {
//     return row.reduce((acc, val, index)=>{
//       acc[columns[index]] = val;
//       return acc;
//     }, {});
//   })
// }

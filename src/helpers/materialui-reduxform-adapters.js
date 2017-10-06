import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import ErrorText from '../components/ErrorText';

// const renderTextField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
//   <TextField label={label} {...input} {...custom} fullWidth />
// );

const renderTextField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
  <div>
    <label style={styles.label}>{label}</label>
    <div style={styles.field}>
      <TextField id="name-simple" {...input} {...custom} fullWidth />
      {touched &&
        ((error && <ErrorText errorText={error} />) ||
          (warning && <ErrorText errorText={warning} isWarning />))}
    </div>
  </div>
);

const renderSelectField = props => {
  const { input, label, meta: { touched, error, warning }, getValue, options, ...other } = props;
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <div style={styles.selectField}>
        <Select
          {...other}
          value={input.value}
          onChange={value => input.onChange(getValue ? getValue(value) : value)}
          onBlur={() => input.onBlur(input.value)}
          options={options}
        />
        {touched &&
          ((error && <ErrorText errorText={error} />) ||
            (warning && <ErrorText errorText={warning} isWarning />))}
      </div>
    </div>
  );
};

const styles = {
  label: {
    color: '#424242',
    fontSize: 14,
  },
  field: {
    marginBottom: 15,
  },
  selectField: {
    marginBottom: 15,
    marginTop: 5,
  },
};

export { renderTextField, renderSelectField };

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { renderTextField } from '../../../helpers/materialui-reduxform-adapters';

const validate = values => {
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Поле не может быть пустым';
    }
  });
  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors;
};

class SignInForm extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div style={styles.errorText}>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Grid fluid style={styles.gridMain}>
        <Row center="sm" middle="xs" style={styles.fullHeight}>
          <Col xs={6} md={6}>
            <Paper style={styles.paper} elevation={2}>
              <div style={styles.header}>
                <h3>Система учета персонала</h3>
              </div>
              <form onSubmit={handleSubmit} style={styles.form}>
                {this.renderAlert()}
                <div style={styles.credentialField}>
                  <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                    placeholder="Email"
                    type="text"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    component={renderTextField}
                    label="Пароль"
                    placeholder="Пароль"
                    type="password"
                  />
                </div>
                <Button raised color="primary" type="submit" style={styles.signInButton}>
                  Войти
                </Button>
              </form>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const wrappedSignInForm = reduxForm({
  form: 'signin',
  validate,
})(SignInForm);

export { wrappedSignInForm as SignInForm };

const styles = {
  paper: {
    height: 500,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  form: {
    margin: 40,
    position: 'relative',
    top: '40px',
  },
  signInButton: {
    width: '256px',
    marginTop: '40px',
    backgroundColor: '#20b2aa',
  },
  header: {
    color: '#455A64',
    marginTop: '60px',
  },
  gridMain: {
    height: '100vh',
    backgroundColor: '#E0E0E0',
  },
  fullHeight: {
    height: '100%',
  },
  errorText: {
    color: '#f44336',
  },
  credentialField: {
    marginBottom: 10,
  },
};

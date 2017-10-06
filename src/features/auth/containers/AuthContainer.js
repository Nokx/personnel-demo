import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import HomePage from '../../../pages/home/HomePage';
import { SignInForm } from '../components';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';

class AuthContainer extends Component {
  onSubmit = ({ email, password }) => {
    this.props.actions.signinUser(email, password);
  };

  signOut = () => {
    this.props.actions.signoutUser();
  };

  render() {
    const { authenticated, isUserLoading, errorMessage } = this.props;
    return !isUserLoading ? (
      <div style={styles.container}>
        <Route path="/sign_up" component={HomePage} />
        <Route
          path="/sign_in"
          render={renderProps =>
            !authenticated ? (
              <SignInForm errorMessage={errorMessage} onSubmit={this.onSubmit} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: renderProps.location },
                }}
              />
            )}
        />
        <MatchWhenAuthorized
          isAuthenticated={authenticated}
          signOut={this.signOut}
          path="/"
          component={this.props.mainComponent}
        />
      </div>
    ) : null;
  }
}

const MatchWhenAuthorized = ({
  component: ProtectedComponent,
  isAuthenticated,
  signOut,
  ...rest
}) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated ? (
        <ProtectedComponent {...renderProps} signOut={signOut} />
      ) : (
        renderProps.location.pathname !== '/sign_in' && (
          <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: renderProps.location },
            }}
          />
        )
      )}
  />
);

const styles = {
  container: {
    height: '100%',
  },
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectors.getAuthenticated,
  isUserLoading: selectors.getIsUserLoading,
  errorMessage: selectors.getAuthError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

const wrappedAuthContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthContainer),
);

export { wrappedAuthContainer as AuthContainer };

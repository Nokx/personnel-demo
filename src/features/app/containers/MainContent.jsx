/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { MediumAppToolbar } from '../components/app_toolbars/MediumAppToolbar';
import { DesktopAppToolbar } from '../components/app_toolbars/DesktopAppToolbar';

import * as actions from '../redux/actions';
import { getSelectedMenuIndex } from '../redux/selectors';

import DepartmentPage from '../../../pages/departments/DepartmentPage';
import PositionPage from '../../../pages/positions/PositionPage';
import UserPage from '../../../pages/users/UserPage';

import menuConfig from '../components/app_toolbars/app_menu/menuConfig';
import auth from '../../auth';
import PageNotFound from '../../../pages/PageNotFound';

function browserSelector({ browser }) {
  return browser;
}

// для данного компонента не используется декоратор, так как в таком случае
// static contextTypes применяется к уже обернутому компоненту
// (декоратор отрабатывает раньше чем присваивание MainContent.contextTypes. MainContent уже отдекорирован к этому моменту).
// В результате чего случается ошибка получения store и router из this.context
class MainContent extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  };

  handleMenuClick = index => {
    this.context.router.history.push(menuConfig[index].path);
    this.props.actions.selectMenuItem(index);
  };

  handleLogOut = () => {
    this.props.signOut();
  };

  render() {
    const { classes, selectedMenuIndex, browser, currentUser } = this.props;

    let AppToolbar = DesktopAppToolbar;
    if (browser.lessThan.large) {
      AppToolbar = MediumAppToolbar;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppToolbar
            selectedMenuIndex={selectedMenuIndex}
            handleMenuClick={this.handleMenuClick}
            handleLogOut={this.handleLogOut}
            currentUser={currentUser}
          />

          <Switch>
            <Route exact path="/" component={DepartmentPage} />
            <Route path="/departments" component={DepartmentPage} />
            <Route path="/positions" component={PositionPage} />
            <Route path="/users" component={UserPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedMenuIndex: getSelectedMenuIndex,
  browser: browserSelector,
  currentUser: auth.selectors.getCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    overflowY: 'auto',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100%',
    overflow: 'auto',
  },
});

const wrappedMainContent = withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MainContent),
);

export { wrappedMainContent as MainContent };

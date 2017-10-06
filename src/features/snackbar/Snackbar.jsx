import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { createStructuredSelector } from 'reselect';
import { getSnackbar } from './selectors';
import { actions } from './actions';

class DSnackbar extends Component {
  handleRequestClose = () => {
    this.props.actions.hideSnackbar();
  };

  render() {
    return (
      <Snackbar
        open={this.props.snackbar.show}
        message={this.props.snackbar.text}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  snackbar: getSnackbar,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DSnackbar);

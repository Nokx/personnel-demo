import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const ErrorText = ({ classes, errorText, isWarning }) => (
  <Typography className={isWarning ? classes.warning : classes.error} type="body1">
    {errorText}
  </Typography>
);

const styles = theme => ({
  error: {
    color: '#ff0000',
    fontStyle: 'italic',
    fontSize: 12,
  },
  warning: {
    color: '#FFA000',
    fontStyle: 'italic',
    fontSize: 12,
  },
});
export default withStyles(styles)(ErrorText);

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import snackbar from '../features/snackbar';

const PageLayout = ({ children, classes, title }) => (
  <div className={classes.page}>
    <div className={classes.titleContainer}>
      {title && (
        <Typography type="headline" gutterBottom className={classes.title}>
          {title}
        </Typography>
      )}
    </div>
    <div className={classes.content}>{children}</div>
    <snackbar.Snackbar />
  </div>
);

const styles = theme => ({
  titleContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  title: {
    marginLeft: 20,
  },
  content_old: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  page: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
  content: {
    padding: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(PageLayout);

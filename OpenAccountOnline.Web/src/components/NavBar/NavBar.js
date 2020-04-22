// --- Imports --- //
import React from 'react';
import PropTypes from 'prop-types';

// --- Materail Ui Imports --- //
import ToolBar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Styling --- //
const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    marginTop: theme.spacing(2)
  },
  next: {
    textAlign: 'right'
  }
}));

function NavBar(props) {
  const { previous, next, ...rest } = props;
  const classes = useStyles();
  return (
    <ToolBar {...rest} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {previous}
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.next}>
          {next}
        </Grid>
      </Grid>
    </ToolBar>
  );
}

NavBar.propTypes = {
  previous: PropTypes.node,
  next: PropTypes.node
};

// --- Exports --- //
export default NavBar;

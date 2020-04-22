// --- Imports --- //
import React from 'react';

// -- Material Ui Imports --- //
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

// --- Style Imports --- //
import styles from './NavigationStyles';

function Navigation(props) {
  const { children, ...rest } = props;
  return <AppBar {...rest}>{children}</AppBar>;
}

// --- Exports --- //

export default withStyles(styles)(Navigation);

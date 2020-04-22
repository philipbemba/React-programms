// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import makeStyle from '@material-ui/core/styles/makeStyles';

// --- Assets Imports --- //
import logo from './nwcu-logo.png';

// --- Styling --- //
const useStyles = makeStyle(theme => ({
  root: {},
  image: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '85%'
    }
  }
}));
function NwcuLogo(props) {
  const classes = useStyles();
  return (
    <Box mr={2} flex={1} height="100%" alignItems="center">
      <img
        alt="Northwest Community Credit Union Logo"
        src={logo}
        className={classes.image}
      />
    </Box>
  );
}

// --- Exports --- //
export default NwcuLogo;

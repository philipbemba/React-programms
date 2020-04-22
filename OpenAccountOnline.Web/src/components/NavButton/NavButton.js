// --- Imports --- //
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// --- Material Ui Imports --- //
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- React Router Imports --- //
import { Link } from 'react-router-dom';

// --- Styles --- //
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

function NavButton(props) {
  const renderLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <Link {...itemProps} innerRef={ref} />
  ));

  const { children, className, direction, ...rest } = props;
  const classes = useStyles();
  return (
    <Button
      component={!Boolean(props.type) ? renderLink : this}
      className={clsx(className, classes.root)}
      {...rest}
    >
      {direction === 'previous' ? <KeyboardArrowLeftIcon /> : ''}
      {children}
      {direction === 'next' ? <KeyboardArrowRightIcon /> : ''}
    </Button>
  );
}

NavButton.propTypes = {
  direction: PropTypes.oneOf(['next', 'previous', 'none'])
};

NavButton.defaultProps = {
  direction: 'none'
};

// --- Exports --- //
export default NavButton;

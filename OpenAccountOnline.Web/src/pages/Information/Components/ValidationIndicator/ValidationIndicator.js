// --- Import --- //
import React, { useState } from 'react';
// import { useScrollPosition } from '@n8tb1t/use-scroll-position';

// --- Material Ui Imports --- //
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

// --- Custom Imports --- //
import { useScrollPosition } from '../../../../utils/';

// --- Mobile Indicator --- //
const IndicatorButton = withStyles(theme => ({
  root: {
    zIndex: 1,
    position: 'fixed',
    top: '96px',
    [theme.breakpoints.down('xs')]: {
      top: '91px'
    },
    right: 0,
    width: '100%'
  },
  containedPrimary: {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    backgroundColor: theme.palette.brick.main,
    borderColor: theme.palette.brick.main,
    '&:hover, &:active, $visited': {
      backgroundColor: theme.palette.brick.main,
      borderColor: theme.palette.brick.main
    }
  }
}))(Button);

function ValidationIndicator(props) {
  const [isTop, setIsTop] = useState(true);

  const { errors, submitCount } = props;

  const showButton = Boolean(Object.keys(errors).length) && submitCount >= 1;

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y !== 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  });

  /**
   * Scrolls window to top.
   */
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return !isTop && showButton ? (
    <IndicatorButton variant="contained" color="primary" onClick={toTop}>
      Validation Errors
    </IndicatorButton>
  ) : (
    ''
  );
}

export default ValidationIndicator;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/AssignmentInd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundColor: '#486644',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundColor: '#6A9864'
  }
});

function StepIcon(props) {
  const classes = useStyles();
  const { active, completed } = props;

  const icons = {
    1: <AssignmentIcon />,
    2: <PersonIcon />,
    3: <ShoppingCartIcon />,
    4: <AttachMoney />,
    5: <CheckCircle />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active || (active && completed),
        [classes.completed]: completed && !active
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

export default StepIcon;

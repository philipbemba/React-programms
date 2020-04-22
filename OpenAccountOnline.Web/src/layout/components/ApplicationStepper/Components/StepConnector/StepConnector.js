import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';

export default withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundColor: '#486644'
    }
  },
  completed: {
    '& $line': {
      backgroundColor: '#6A9864'
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

// --- Custom Imports --- //
import background from '../../../assets/body-bg.jpg';

export default theme => ({
  root: {
    backgroundColor: '#f1f2ef',
    backgroundImage: `url(${background})`,
    padding: theme.spacing(2)
  }
});

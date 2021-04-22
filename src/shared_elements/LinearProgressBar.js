import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 8,
    },
    colorPrimary: {
      backgroundColor: `#DDDDDD`,
    },
    bar: {
      borderRadius: 8,
      backgroundColor: '#039445',
    },
  }))(LinearProgress);

export default BorderLinearProgress
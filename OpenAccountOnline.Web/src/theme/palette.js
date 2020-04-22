import forest from './Colors/Forest';
import river from './Colors/River';
import brick from './Colors/Brick';

const white = '#ffffff';
const black = '#000000';

export default {
  palette: {
    primary: {
      main: forest[500],
      light: forest[300],
      dark: forest[700]
    },
    secondary: {
      main: river[500],
      light: river[300],
      dark: river[700]
    },
    brick: {
      main: brick[500],
      light: brick[300],
      dark: brick[700]
    },
    black: {
      main: black
    },
    white: {
      main: white
    }
  }
};

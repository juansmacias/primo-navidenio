import { blue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
      primary: {
        main: "#142715",
      },
      secondary: {
        main: '#A11D21',
      },
      error: {
        main: red.A400,
      },
    },
  });

export default theme;
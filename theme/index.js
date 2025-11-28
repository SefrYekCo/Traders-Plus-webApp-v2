import defaultTheme from "./default";
import { faIR } from '@mui/material/locale';

import { createTheme , experimental_sx as sx, } from "@mui/material";

const overrides = {
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },
  },
  
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides ,components:{
    MuiOutlinedInput:{
      styleOverrides:{
        root:{}
      }
    }
  }},
  faIR
  ),
};

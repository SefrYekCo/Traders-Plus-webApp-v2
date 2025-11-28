import tinycolor from "tinycolor2";

const primary = "#ffffff";
const secondary = "#F0F3FA";
const warning = "#131722";
const success = "#3CD4A0";
const info = "#9013FE";

const light = "#ffffff";
const light1 = "#F0F3FA";
const light2 = "#131722";

const dark = "#2D2D2D";
const dark1 = "#2A2E39"
const dark2 = "#535353"

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  direction : 'rtl',
  palette: {
    primary: {
      main: light,
      light: light1,
      text: light2,
    },
    secondary: {
      main: dark,
      light: dark1,
      text: dark2,
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: "#F3F5FF",
    },
    button:{
      primary:"#45B6A3",
      secondary:"#45B6A3",
      dark:"#45B6A3",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },

  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiOutlinedInput:{
      root:{
        backgroundColor:"#F0F3FA",
        border:"none",
        borderRadius:"50px"
      }
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#F3F5FF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        backgroundColor:"#45B6A3",
        "&:hover, &:focus": {
          backgroundColor: "#45B6A3",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
      },
      head: {
        fontSize: "0.95rem",
        textAlign : 'right',
        fontFamily: "Shabnam"
      },
      body: {
        fontSize: "0.95rem",
        textAlign : 'right',
        fontFamily: "Shabnam"
      },
    },
    MuiTypography:{
      root : {
        fontFamily : 'Shabnam !important'
      }
    },
    MuiListItemText:{
      root : {
        textAlign  : 'right'
      }
    },
    MUIDataTable:{
      responsiveStacked:{
        overflowX : 'hidden !important'
      }
    },
    MuiButtonBase:{
      root: {
        fontFamily : 'shabnam !important'
      }
    }
  },
};

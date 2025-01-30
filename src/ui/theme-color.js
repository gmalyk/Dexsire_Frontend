import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  mode: 'light',
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e86c30',
      contrastText: '#fff',
    },
    white: {
      main: '#ffffff',
      contrastText: '#262626',
    },
    black: {
      contrastText: '#ffffff',
      main: '#262626',
    },
    error: {
      main: '#F95D5D',
    },
    warning: {
      main: '#ffa726',
    },
    orange: {
      main: '#F95D5D',
      contrastText: '#fff',
    },
    info: {
      main: '#a4a4a4',
      contrastText: '#fff',
    },
    success: {
      main: '#66bb6a',
    },
    gradient: {
      primary: '#F8474F',
      secondary: '#324FF9',
      contrastText: '#fff',
      background: '#121634',
    },
    lightBlue: {
      main: '#3951FF',
      contrastText: '#fff',
    },
    bgReview: {
      main: '#3A3D51',
    },
    borderBackground: {
      main: '#1F2352',
      contrastText: '#fff',

    },
    colors: {
      white: '#ffffff',
      orange: '#F95D5D',
      black: '#000000',
      lightBlue: '#3951FF',
      grey: '#4C4C4C',
      purple: '#979BCA',
      backgroundgrey: '#F7F7F7',
      lightgrey: '#A4A4A4',
      shadow: 'rgba(255,255,255,.06)',
      lightshadow: 'rgba(112,112,112,.06)'
    }
  },
});  
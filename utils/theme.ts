import { createTheme } from '@mui/material/styles'

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#3F3D56',
      light: '#D0CDE1',
    },
    // secondary: {
    //   main: '#19857b',
    // },
    // error: {
    //   main: red.A400,
    // },
  },
  typography: {
    // eslint-disable-next-line quotes
    fontFamily: '"Inter", sans-serif',
    fontSize: 16,
  },
  // components: {
  //   MuiContainer: {
  //     defaultProps: {
  //       maxWidth: 'md',
  //     },
  //     styleOverrides: {
  //       maxWidthSm: {
  //         maxWidth: '680px',
  //         '@media (min-width: 600px)': {
  //           maxWidth: '680px',
  //         },
  //       },
  //       maxWidthMd: {
  //         maxWidth: '960px',
  //         '@media (min-width: 900px)': {
  //           maxWidth: '960px',
  //         },
  //       },
  //     },
  //   },
  // },
})

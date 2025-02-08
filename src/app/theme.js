'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    typography: {
        fontFamily: 'var(--font-nunito), Arial, sans-serif',
        // fontFamily: 'var(--font-roboto), Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#0066ff',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#ff9900',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme;

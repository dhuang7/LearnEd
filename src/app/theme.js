'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-nunito), Arial, sans-serif',
        // fontFamily: 'var(--font-roboto), Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#0000ffff',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#b715e1',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
    }
});

export default theme;

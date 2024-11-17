import localFont from "next/font/local";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Roboto, Nunito } from 'next/font/google';
import { Typography } from "@mui/material";

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto',
// });

const nunito = Nunito({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
  });

export const metadata = {
    title: "Simply PLC",
    description: "Simply PLC",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={nunito.className}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
        </html>
    );
}

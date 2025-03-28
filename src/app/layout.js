import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Roboto, Nunito } from 'next/font/google';
import Box from "@mui/material/Box";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"


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
    title: "Praxly",
    description: "Praxly",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={nunito.className} style={{margin:0}}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    {/* <Box sx={{width:'100vw', height:'100vh', minWidth:'1000px', minHeight:'700px', overflow:'hidden'}}> */}
                    <Box sx={{width:'100dvw', height:'100dvh'}}>
                        {children}
                        <Analytics />
                        <SpeedInsights />
                    </Box>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
        </html>
    );
}

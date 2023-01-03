'use client'
import './globals.css'
import { usePathname } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function RootLayout({ children }: { chlidren: React.ReactNode; }) {
  const path = usePathname()

  return (
    <html lang='en'>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
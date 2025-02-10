import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { palette } from './palette';
import { button } from './button';

interface ThemeHandlerProps {
  children: React.ReactNode;
}

const ThemeHandler = ({ children }: ThemeHandlerProps) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette,
        shape: { borderRadius: 0 },
        typography: {
          fontFamily: 'Montserrat, sans-serif', // ✅ Set Montserrat globally
          fontWeightRegular: 400,
          fontWeightBold: 600,
        },
        components: {
          MuiButton: button,
          MuiTextField: {
            defaultProps: {
              variant: 'filled',
              fullWidth: true,
              size: 'small',
              color: 'primary',
            },
          },
          MuiTypography: {
            defaultProps: {
              fontFamily: 'Montserrat, sans-serif', // ✅ Ensure Montserrat in Typography
              fontWeight: 400,
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeHandler;

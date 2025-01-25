import React, { useMemo, } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { palette } from "./palette";
import { button } from './button'


interface ThemeHandlerProps {
    children: React.ReactNode
}
const ThemeHandler = ({ children }: ThemeHandlerProps) => {
    const theme = useMemo(() => createTheme({
        palette,
        shape: { borderRadius: 0 },
        // typography: {
        //     "fontFamily": `"Lato", "Montserrat", "Arial", sans-serif`,
        //     "fontSize": 14,
        //     "fontWeightLight": 300,
        //     "fontWeightRegular": 400,
        //     "fontWeightMedium": 500
        // },
        components: {
            MuiButton: button,
            MuiTextField: {
                defaultProps: {
                    variant: 'filled',
                    fullWidth: true,
                    size: 'small',
                    color: 'primary',
                    style: {
                        marginBottom: '10px',
                    }
                },
            },
            MuiTypography: {
                defaultProps: {
                    fontFamily: "Montserrat",
                    fontWeight: 400
                }
            }
        }
    }), [])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeHandler;
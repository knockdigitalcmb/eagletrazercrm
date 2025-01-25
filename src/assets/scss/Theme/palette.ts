import { PaletteColor, PaletteColorOptions, PaletteOptions, darken, lighten } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        colors: {
            primary: string;
            green: string
        }
    }

    interface ThemeOptions {
        colors?: {
            primary: string;
            green: string
        }
    }

    interface TypeBackground {
        default: string;
        paper: string;
        disabled: string;
    }

    interface Palette {
        neutral: PaletteColor,
        green: PaletteColor
    }

    interface PaletteOptions {
        neutral?: PaletteColorOptions,
        green?: PaletteColorOptions
    }
}

const TONAL_OFFSET = 0.1;

export const calculateColor = (color: string) => ({
    light: lighten(color, TONAL_OFFSET),
    main: color,
    dark: darken(color, TONAL_OFFSET)
})

export const palette: PaletteOptions = {
    primary: {
        main: '#fec601'
    },
    secondary: {
        main: '#1a1a1a'
    },
    success: {
        main: '#00FF00'
    },
    error: {
        main: '#FF0000'
    },
    info: {
        main: '#FFA500'
    },
    divider: '#DCDCDC',
    green: calculateColor('#00FF00')
}
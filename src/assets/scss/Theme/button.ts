import { Components } from '@mui/material';
import { Theme as MuiTheme } from '@mui/material';

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
        green: true;
        primary: true;
    }

    interface ButtonPropsVariantOverrides {
        link: true;
    }
}

export const button: Components['MuiButton'] = {
    variants: [
        {
            props: { variant: 'link', color: 'primary' },
            style: ({ theme }: any) => ({
                color: theme.palette.primary,
                fontFamily: 'Lato',
                textDecoration: 'underline',
                '&:hover': {
                    color: theme.palette.secondary,
                    background: 'none',
                    textDecoration: 'underline'
                }
            }),
        },
    ],
    defaultProps: {
        variant: 'outlined',
        disableElevation: true,
        disableRipple: true,
        color: 'primary'
    }
}
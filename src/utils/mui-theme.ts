import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme } from '@mui/material/styles';

export const themeData: any = {
    palette: {
        primary: {
            light: '#9d4edd',
            main: '#7a2cbe',
            dark: '#3c0a6d',
            contrastText: '#fdeeff',
        },
        success: {
            light: '#19B373',
            main: '#138656',
            dark: '#0D5939',
            contrastText: '#E9FCF4',
        },
        error: {
            light: '#F07575',
            main: '#EE5D5D',
            dark: '#EC4646',
            contrastText: '#FCE8E8',
        },
        warning: {
            light: '#F4E98B',
            main: '#F1E574',
            dark: '#F0E15C',
            contrastText: '#453F07',
        },
        info: {
            light: '#0081CC',
            main: '#0071B3',
            dark: '#006199',
            contrastText: '#E6F6FF',
        },
        grey: {
            light: '#5F7686',
            main: '#556977',
            dark: '#4A5C68',
            contrastText: '#F0F3F4',
        },
        text: {
            primary: '#555',
            secondary: '#777',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "10px 20px"
                },
                containedSecondary: {
                    border: "1px solid #7a2cbe",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                        border: "2px solid #7a2cbe",
                        padding: "8.75px 19px"
                    }
                },
            }
        }
    }
}

export const theme = createTheme(themeData)
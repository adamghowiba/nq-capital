import { Box, autocompleteClasses } from '@mui/material';
import { Theme, ThemeOptions, createTheme } from '@mui/material/styles';
import React from 'react';

// thin: 100
// extraLight: 200
// light: 300
// regular: 400
// medium: 500
// semiBold: 600
// bold: 700
// extraBold: 800
// black: 900
// 16px => 1rem

declare module '@mui/material/styles' {
  interface Theme {
    common: {
      line: React.CSSProperties['color'];
      inputBackground: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
      offWhite: React.CSSProperties['color'];
      titleActive: React.CSSProperties['color'];
      body: React.CSSProperties['color'];
      placeholder: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    common?: {
      line: React.CSSProperties['color'];
      inputBackground: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
      offWhite: React.CSSProperties['color'];
      placeholder: React.CSSProperties['color'];
      body: React.CSSProperties['color'];
      titleActive: React.CSSProperties['color'];
    };
  }
  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    body1: true;
    body2: true;
    caption: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export function generateTheme(newTheme?: ThemeOptions): Theme {
  return createTheme({
    palette: {
      ...{
        primary: {
          main: '#000000',
        },
        secondary: {
          main: '#F1F1F1',
        },
        error: {
          main: '#E5484D',
        },
        success: {
          main: '#297C3B',
        },
        warning: {
          main: '#FFBF01',
        },
      },
      ...newTheme?.palette,
    },
    common: {
      ...{
        titleActive: '#333333',
        body: '#333333',
        placeholder: '#F0F0F0',
        line: '#F0F0F0',
        inputBackground: '#FCFCFC',
        background: '#FCFCFC',
        offWhite: '#FFFFFF',
      },
      ...newTheme?.common,
    },
    typography: {
      ...{
        fontFamily: ['Inter', 'sans-serif'].join(','),
        h1: {
          fontSize: '30px',
          letterSpacing: '-0.72px',
          fontWeight: 700,
          color: 'var(--titleActive)',
        },
        h2: {
          fontWeight: 500,
          fontSize: '24px',
          letterSpacing: '-0.72px',
        },
        h3: {
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '-0.42px',
        },
        h4: {
          fontWeight: 600,
          fontSize: '18px',
          letterSpacing: '-0.42px',
        },
        h5: {
          fontWeight: 500,
          fontSize: '16px',
          letterSpacing: '-0.42px',
        },
        h6: {
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '-0.42px',
        },
        body1: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#333333',
        },
        body2: {
          fontSize: '12px',
          fontWeight: 500,
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 300,
        },
        subtitle1: {
          fontSize: '16px',
          color: '#8D8D8D',
          fontWeight: '400',
        },
        subtitle2: {
          fontSize: '14px',
          color: '#8D8D8D',
          fontWeight: '400',
        },
      },
      ...newTheme?.typography,
    },
    breakpoints: {
      values: {
        ...{
          mobile: 0,
          tablet: 744,
          laptop: 992,
          desktop: 1200,
        },
        ...newTheme?.breakpoints?.values,
      },
    },
    components: {
      MuiCard: {
        variants: [
          {
            props: {
              variant: 'outlined',
            },
            style: {
              border: 'none',
              boxShadow: '0px 0px 0px 1px rgba(100, 100, 100, 0.18)',
              borderRadius: '16px',
            },
          },
        ],
      },
      MuiCardHeader: {
        styleOverrides: {
          root: () => {
            return {
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'inherit',
              lineHeight: '1',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            };
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: () => ({
            background: '#00000044',
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'var(--semiBold)',
            lineHeight: '14px',
            '&.MuiButton-colorInherit.MuiButton-outlined ': {
              border: `1px solid ${theme.common.line}`,
              color: theme.common.body,
            },
          }),
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              fontSize: '12px',
              lineHeight: '1',
              padding: '8px 12px',
              height: '28px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              padding: '8px 12px',
              fontSize: '14px',
              height: '34px',
            },
          },
          {
            props: {
              size: 'large',
            },
            style: {
              padding: '12px 20px',
            },
          },
        ],
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            marginBottom: '4px',
            // top: '-8px !important',
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '8px',
            background: theme.common.offWhite,
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.common.line}`,
            },
          }),
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: ({ theme }) => ({
            '.MuiOutlinedInput-root .MuiAutocomplete-input': {
              padding: '0px 6px',
            },
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              padding: '8px 6px',
              paddingRight: '35px',
              height: 'unset',
            }
          }),
        },
        defaultProps: {
          renderOption: (props, option, state, ownerState) => (
            <Box
              sx={{
                [`&.${autocompleteClasses.option}`]: {
                  height: '35px',
                  minHeight: '35px',
                },
              }}
              component="li"
              {...props}
            >
              {ownerState.getOptionLabel(option)}
            </Box>
          ),
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'medium',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            background: theme.common.offWhite,
            '& .MuiOutlinedInput-root': {
              border: 'none',
              borderRadius: '12px',
              background: '#F1F1F1',
              outline: 'none !important',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.common.line}`,
              outline: 'none !important',
              transition: 'border-color 0.15s ease',
            },
            '& .MuiOutlinedInput-root:not(:focus-within):hover .MuiOutlinedInput-notchedOutline':
              {
                borderColor: `${theme.palette.grey[300]}`,
              },
            '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline':
              {
                borderColor: `${theme.palette.grey[300]}`,
              },
          }),
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              '& .MuiInputBase-input': {
                padding: '0px',
              },
              '& .MuiInputBase-root.MuiOutlinedInput-root': {
                padding: '4px 8px',
                fontSize: '12px',
              },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              '& .MuiInputBase-root.MuiOutlinedInput-root': {
                padding: '0px 12px',
                height: '36px',
              },
              '& .MuiInputBase-multiline.MuiOutlinedInput-root': {
                height: 'auto',
                padding: '8px 12px',
                minHeight: '36px',
              },
              '& .MuiInputBase-input': {
                padding: 0,
              },
            },
          },
          {
            props: {
              size: 'large',
            },
            style: {
              '& .MuiInputBase-root.MuiOutlinedInput-root': {
                padding: '12px 12px',
              },
              '& .MuiInputBase-input': {
                padding: 0,
              },
            },
          },
        ],
        // TODO: Old approach for handling input sizes, remove after testing
        // variants: [
        //   {
        //     props: {
        //       size: 'small',
        //     },
        //     style: {
        //       '& .MuiInputBase-input': {
        //         padding: '4px 8px',
        //         fontSize: '12px',
        //       },
        //     },
        //   },
        // {
        //   props: {
        //     size: 'medium',
        //   },
        //   style: {
        //     '& .MuiInputBase-input': {
        //       padding: '8px 12px',
        //     },
        //     '& .MuiInputBase-inputAdornedStart': {
        //       paddingLeft: '0px',
        //     },
        //   },
        // },
        // {
        //   props: {
        //     size: 'large',
        //   },
        //   style: {
        //     '& .MuiInputBase-input': {
        //       padding: '12px 12px',
        //     },
        //   },
        // },
        // ],
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 0,
            backgroundColor: theme.common.background,
          }),
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.MuiDialogTitle-root': {
              ...theme.typography.h1,
              paddingBottom: '24px',
              textAlign: 'center',
            },
          }),
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          spacing: {
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            padding: '8px',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '8px',
            border: `1px solid ${theme.common.line}`,
          }),
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: () => ({
            // '& .MuiPopover-paper': {
            //   backgroundColor: '#202020',
            //   padding: '4px',
            // },
            // '& .MuiPaper-root': {
            //   borderRadius: '12px !important',
            // },
            // '& .MuiBackdrop-root': {
            //   background: 'transparent !important',
            // },
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiPaper-root': {
              borderRadius: '5px',
              boxShadow: 'none',
              border: `1px solid ${theme.common.line}`,
            },
            '& .MuiList-root': {
              padding: 0,
            },
          }),
        },
      },
    },
  });
}

export const theme = generateTheme();

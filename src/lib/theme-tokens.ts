/**
 * Monto Design System Theme Tokens
 * 
 * This file provides TypeScript constants for all design tokens
 * defined in the CSS variables. Use these for programmatic access
 * to theme values.
 */

export const MontoTheme = {
  colors: {
    primary: {
      lighter: '#EFEBFF',
      light: '#BEADFF',
      main: '#7B59FF',
      dark: '#523BAA',
      darker: '#291E55',
      contrastText: '#FFFFFF'
    },
    secondary: {
      lighter: '#E6E7EB',
      light: '#6F768B',
      main: '#1D153B',
      dark: '#181231',
      darker: '#0A0714',
      contrastText: '#FFFFFF'
    },
    grey: {
      0: '#FFFFFF',
      100: '#707C87',
      200: '#F4F6F8',
      300: '#F1F1F3',
      400: '#E6E7EB',
      500: '#8C94A9',
      600: '#818799',
      700: '#586079',
      800: '#38415F',
      900: '#061237'
    },
    semantic: {
      success: {
        main: '#007737',
        background: '#E6F4EA',
        foreground: '#FFFFFF'
      },
      error: {
        main: '#DF1C41',
        background: '#FFEBEE',
        foreground: '#FFFFFF'
      },
      warning: {
        main: '#F2AE40',
        background: '#FFF8E1',
        foreground: '#FFFFFF'
      },
      info: {
        main: '#375DFB',
        background: '#E3F2FD',
        foreground: '#FFFFFF'
      }
    },
    status: {
      success: {
        main: '#007737',
        background: '#E6F4EA'
      },
      error: {
        main: '#DF1C41',
        background: '#FFEBEE'
      },
      warning: {
        main: '#D48806',
        background: '#FFF8E1'
      },
      info: {
        main: '#1750FB',
        background: '#E3F2FD'
      },
      neutral: {
        main: '#9CA3AF',
        background: '#F3F4F6'
      },
      processing: {
        main: '#7B59FF',
        background: '#F3E8FF'
      }
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF'
    },
    divider: 'rgba(140, 148, 169, 0.2)',
    overlay: 'rgba(1, 23, 62, 0.25)'
  },
  
  typography: {
    fontFamily: {
      heading: "'Studio Feixen Sans', 'Inter', ui-sans-serif, system-ui, sans-serif",
      body: "'Studio Feixen Sans', 'Inter', ui-sans-serif, system-ui, sans-serif",
      mono: "'Studio Feixen Sans', 'Inter', ui-monospace, 'SFMono-Regular', 'Consolas', monospace"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xl2: '1.5rem',
      xl3: '1.875rem',
      xl4: '2.25rem',
      xl5: '3rem',
      xl6: '3.75rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },
  
  borderRadius: {
    xs: '0.125rem',
    sm: '0.25rem',
    default: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    xl2: '1.5rem',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    xl2: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem'
      },
      padding: {
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem'
      }
    },
    input: {
      height: '2.5rem',
      paddingX: '0.75rem',
      borderWidth: '1px'
    },
    badge: {
      height: '1.5rem',
      paddingX: '0.5rem',
      fontSize: '0.75rem'
    }
  },
  
  animation: {
    timingFunction: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
} as const;

export type MontoThemeType = typeof MontoTheme;

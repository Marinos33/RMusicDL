//Externals
import { createTheme, responsiveFontSizes, Theme, ThemeOptions } from '@mui/material';
import { THEMES } from '../constants';
import { lightShadows, darkShadows } from './shadows';
import merge from 'lodash/merge';

//Material-UI

interface ThemeConfig {
  theme?: string;
}

const baseOptions: ThemeOptions = {
  direction: 'ltr',
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          height: '100%',
          width: '100%'
        },
        body: {
          height: '100%'
        },
        '#root': {
          height: '100%'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    overline: {
      fontWeight: 600
    }
  }
};

const themesOptions: Record<string, ThemeOptions> = {
  [THEMES.LIGHT]: {
    palette: {
      background: {
        default: '#fffef5',
        paper: '#f5f0e4'
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#0a0a0a',
        main: '#a1a1a1'
      },
      secondary: {
        main: '#dbd5c3',
        contrastText: '#0a0a0a'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#262626',
        secondary: '#676767'
      },
      icon: {
        primary: '#0a0a0a'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      },
      sideBar: {
        backgroundColor: {
          primary: '#b8a163'
        }
      }
    },
    shadows: lightShadows,
    shape: {
      borderRadius: 5
    }
  },
  [THEMES.BLUE]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      background: {
        default: '#171c24',
        paper: '#222b36'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#ffffff',
        main: '#688eff'
      },
      secondary: {
        main: '#253047',
        contrastText: '#ffffff'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#919eab'
      },
      icon: {
        primary: '#688eff'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      },
      sideBar: {
        backgroundColor: {
          primary: '#263566'
        }
      }
    },
    shadows: darkShadows,
    shape: {
      borderRadius: 5
    }
  },
  [THEMES.DARK]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      background: {
        default: '#0a0a0a',
        paper: '#262626'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#000000',
        main: '#f1f1f1'
      },
      secondary: {
        main: '#0f0f0f',
        contrastText: '#ffffff'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#f1f1f1'
      },
      icon: {
        primary: '#fffef5'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      },
      sideBar: {
        backgroundColor: {
          primary: '#121212'
        }
      }
    },
    shadows: darkShadows,
    shape: {
      borderRadius: 5
    }
  }
};

export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  let theme = createTheme(merge({}, baseOptions, themeOptions));

  theme = responsiveFontSizes(theme);

  return theme;
};

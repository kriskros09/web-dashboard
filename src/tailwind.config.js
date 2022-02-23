// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      zIndex: {
        '-1': -1,
        2: 2,
      },
      height: {
        11: '3.5rem',
        80: '20rem',
        '1/4vh': '25vh',
        '1/2vh': '50vh',
        '3/4vh': '75vh',
      },
      minHeight: {
        '1/2vh': '50vh',
      },
      width: {
        11: '3.5rem', //56px
      },

      container: {
        center: true,
        padding: {
          default: '2rem',
          sm: '2rem',
          lg: '2rem',
          xl: '2rem',
        },
      },
      screens: {
        xxl: '1440px',
        '3xl': '1660px',
      },
      borderWidth: {
        10: '10px',
      },
      spacing: {
        '1/2': '0.125rem', //2px
        9: '2.25rem', //36px
        14: '3.75rem', //60px
        18: '4.375rem', //70px
        22: '5.5rem', //88px
        26: '6.25rem', //100px
        28: '6.5rem', //104px
      },
      borderRadius: {
        smaller: '2.25rem',
        20: '1.25rem',
        large: '100px',
      },
      opacity: {
        85: '.85',
      },
    },
    colors: {
      transparent: 'transparent',
      primary: {
        default: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
        middle: 'var(--color-primary-medium)',
        light: 'var(--color-primary-light)',
      },
      error: '#FF0000',

      dark: 'var(--color-dark)',

      gray: {
        100: '#EEEEEE',
        150: '#EAEAEA',
        200: '#DDDDDD',
        300: '#BBBBBB',
        400: '#888888',
        500: '#777777',
        600: '#454545',
      },

      white: '#ffffff',
      black: '#000000',
    },
    fontFamily: {
      sans: ["'montserrat'", 'Helvetica', 'Arial', 'sans-serif'],
    },

    fontSize: {
      // -- 1rem = 16px
      xxs: ['0.625rem', '1.25rem'], // 10px / 20xp
      xs: ['0.75rem', '0.75rem'], // 12px / 12px
      sm: ['0.875rem', '1.25rem'], // 14px / 20px
      base: ['1rem', '1.25rem'], // 16px / 20px
      md: ['1.125rem', '1.25rem'], // 18px / 20px
      lg: ['1.25rem', '1.875rem'], // 20px / 30px
      xl: ['1.375rem', '1.6875rem'], // 22px / 27px
      '2xl': ['1.625rem', '2rem'], // 26px / 32px
      '4xl': ['1.875rem', '2.25rem'], // 30px / 36px
      '5xl': ['2.375rem', '2.375rem'], // 38px / 38px
      '6xl': ['2.5rem', '3.0625rem'], // 40px / 49px
      '7xl': ['3rem', '3rem'], // 48px / 48 px
    },

    lineHeight: {
      none: '1',
      small: '0.75rem', //12px
      1: '0.875rem', //14px
      base: '1rem', //16px
      2: '1.125rem', //18px
      3: '1.25rem', //20px
      4: '1.875rem', //30px
      5: '3', //48px
      loose: '3.1255rem', //50px
    },
    inset: {
      0: 0,
      neg20: '-20px',
      auto: 'auto',
      '1/2': '50%',
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'group-hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    display: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'group-hover'],
    visibility: ['responsive', 'hover', 'group-hover'],
    borderStyle: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        '.btn': {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          borderRadius: '0.25rem',
          padding: '0.9375rem 3.125rem',
          transition:
            'background-color 0.2s ease-in-out, color 0.2s ease-in-out, shadow 0.2s ease-in-out',

          '&:focus': {
            outline: 'none',
          },

          '& span': {
            whiteSpace: 'nowrap',
          },
        },
        '.btn-sm': {
          fontSize: '0.8125rem',
          lineHeight: '1rem',
          fontWeight: 'semi-bold',
          padding: '0.625rem 1.875rem',
        },
        '.btn-xs': {
          fontSize: '0.6875rem',
          lineHeight: '0.875rem',
          padding: '0.4375rem 0.5625rem',
          letterSpacing: '0.55px',
        },
        '.btn-icon': {
          display: 'flex',
        },
      }
      const form = {
        form: {
          '.input-wrapper + .input-wrapper': {
            marginTop: '1rem',
          },
          '.input-wrapper + .select-wrapper': {
            marginTop: '1rem',
          },
          '.select-wrapper + .input-wrapper': {
            marginTop: '1rem',
          },
          '.btn': {
            marginTop: '1rem',
          },
        },
      }
      const select = {
        '.select-container': {
          '&:focus': {
            outline: 'none',
          },
          '.select__control': {
            '&:hover': {
              borderColor: '#BBBBBB',
            },
          },
          '.select__control--is-focused': {
            boxShadow: 'unset',
            outline: 'var(--color-primary-light)',
          },
        },
        '.select-container.dropdown-icon': {
          '.CustomDropdown': {
            transform: 'rotate(90deg)',
          },
        },
        '.select-container.style-outlined': {
          '.CustomDropdown svg': {
            color: '#BBBBBB',
          },
        },
        '.select-container.style-shadow': {
          boxShadow: '0px 2px 2px #DDDDDD',
          '.CustomDropdown svg': {
            color: '#BBBBBB',
          },
        },
      }

      addComponents([buttons, form, select])
    }),
  ],
}

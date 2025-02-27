/** @type {import('tailwindcss').Config}*/
const config = {
    theme: {
      extend: {
        colors: {},
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('daisyui'),
    ],
    daisyui: {
      logs: false,
      themes: [
        {
          light: {
            ...require('daisyui/src/theming/themes')['cupcake'],
            primary: '#65c3c8',
            'primary-content': '#030e0f',
            secondary: '#ad93f9',
            'secondary-content': '#030e0f',
          }
        }
      ],
    },
  };
  
  module.exports = config;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'league-spartan': ['"League Spartan"', 'sans-serif'],
      },
    },
    daisyui: {
      "themes": [
        "sunset",
      ],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


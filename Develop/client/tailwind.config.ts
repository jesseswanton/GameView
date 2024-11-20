import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';
import forms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@rewind-ui/core/dist/theme/styles/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    scrollbar({ nocompatible: true }),
    forms({ strategy: 'class' })
  ],
}
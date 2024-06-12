/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warning': '#E6A23C'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

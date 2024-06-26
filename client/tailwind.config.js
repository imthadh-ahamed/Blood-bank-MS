/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#FE0944',
        customApricot: '#FEAE96',
        customlightRed: '#FF7878'
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')],
}
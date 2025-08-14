/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'] },
      colors: { primary: '#0049AC', secondary: '#FFA600' }
    }
  },
  plugins: []
}

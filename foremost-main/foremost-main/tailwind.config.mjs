/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f9',
          100: '#dce9ee',
          500: '#2f6f88',
          700: '#1f4f62',
          900: '#0b1c24'
        }
      }
    }
  },
  plugins: []
};

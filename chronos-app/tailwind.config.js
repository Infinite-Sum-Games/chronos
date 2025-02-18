/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/*/.{js,jsx,ts,tsx}", "./components/*/.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'mybg': '#161617',
        'text': '#fafafa',
        'background': '#121212',
        'primary': '#3fcf8e',
        'secondary': '#297050',
        'accent': '#202020',
        'border': '#2d2d2d',
      },
    },
  },
  plugins: [],
};
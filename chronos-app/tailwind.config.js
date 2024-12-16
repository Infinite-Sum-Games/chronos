/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#27282d",
        text: "#DAD2DA",
        cardBackground: "#2b303c",
        cardText: "#EEEEFF",
        badgeBackground: "#0b6b91",
        badgeText: "#E2FFFF",
        mybg: '#161617',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        montserrat: "montserrat",
        poppins: ["Poppins", "sans-serif"],
      },
      colors:{
       Green:"#071809",
       color1 :"#FF7F00",
       secondary: "#F28100",
      },
      screens: {
        'xx': '425px',
        'lg': '1024px',
        'custom': '1262px', // Custom breakpoint
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
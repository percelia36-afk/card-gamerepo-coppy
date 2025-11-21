/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        embossed: [
          "inset 0 2px 2px rgba(255,255,255,0.5)", // top highlight
          "inset 0 -2px 2px rgba(0,0,0,0.4)", // bottom shadow
          "inset 0 0 8px rgba(255,255,255,0.2)", // soft inner glow
          "0 3px 6px rgba(0,0,0,0.4)", // outer drop shadow
          "0 0 3px rgba(0,0,0,0.3)", // ambient depth
        ].join(", "),
      },
      colors: {
        red: {
          500: "#e60000",
          600: "#cc0000",
          700: "#b30000",
        },
        black: "#000000",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "Roboto", "sans-serif"],
      },
      spacing: {
        "2rem": "2rem",
        "3rem": "3rem",
        "4rem": "4rem",
        "6rem": "6rem",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

const colors = {
  white: '#f2f2f2',
  black: "#000000",
  red: '#b9314f'
};


module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

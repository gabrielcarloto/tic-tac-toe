module.exports = {
  content: ['index.html'],
  theme: {
    extend: {
      fontFamily: {
        'jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    linearBorderGradients: (theme) => ({
      colors: {
        'black-white': ['#000 50%', '#fff'],
      },
    }),
  },
  plugins: [require('tailwindcss-border-gradients')()],
};

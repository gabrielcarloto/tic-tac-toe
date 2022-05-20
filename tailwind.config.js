module.exports = {
  content: ['./src/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        mali: ['Mali', 'cursive'],
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

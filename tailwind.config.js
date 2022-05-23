module.exports = {
  content: ['./src/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        mali: ['Mali', 'cursive'],
        'jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
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

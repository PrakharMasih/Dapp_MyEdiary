/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    backgroundImage: {
      'pack-train': "url('./static/img/minimalist-blue-white-wave-background.jpg')",
      'bgpic' : "url('./static/img/earth.jpg')",
    },
    extend: {},
  },
  plugins: [],
}


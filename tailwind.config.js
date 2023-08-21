/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        // 헤더 제목용 Audiowide 웹폰트
        title: ["Audiowide", "sans-serif"],
      },
    },
  },
  plugins: [],
};

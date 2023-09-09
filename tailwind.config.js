/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xs: { min: "361px", max: "390px" },
      sm: { min: "391px", max: "820px" },
      md: { min: "821px", max: "1024px" },
      lg: { min: "1025px", max: "1280px" },
      xl: { min: "1281px" },
    },
    extend: {
      colors: {
        black: "#1A1A1A",
        gray01: "#666",
        gray02: "#888",
        gray03: "#9a9a9a",
        gray04: "#bcbcbc",
        gray05: "#d5d5d5",
        gray06: "#e5e5e5",
        gray07: "#f3f3f3",
        gray08: "#f9f9f9",
        point: "#ffd75e",
        error: "#ff0000",
      },
      fontFamily: {
        // 헤더 제목용 Audiowide 웹폰트
        title: ["Audiowide", "sans-serif"],
        // NOTE 한글폰트 기본설정 되어있음
        kr: ["Pretendard-Regular", "sans-serif"],
        // NOTE 영문폰트 영문폰트는 font-en 붙혀주면 됩니다.
        en: ["Red Hat Display", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};

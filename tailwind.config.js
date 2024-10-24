/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ['Open Sans', 'sans-serif'],
        ZillaSlab: ['Zilla Slab', 'serif'],
        PlaywriteCU: ['Playwrite CU', 'serif'],
        Poppins: ['Poppins', 'sans-serif'],
        Rockwell: ["Rockwell", "sans-serif"],
        Rockwell_Bold: ["Rockwell-Bold", "sans-serif"],
        Ravie: ["Ravie", "sans-serif"],
      
      },
      screens: {
        'small-mobile': '320px',      // 360 by 640
        'mobile': '380px',            // 375 by 667
        'large-mobile': '414px',      // 414 by 896
        'phablet': '480px',           // 393 by 873
        'sm': '640px',                // Default sm
        'md': '768px',                // 768 by 1024
        'lg': '1024px',               // 1024 by 768
        'xl': '1280px',               // 1280 by 720 Default xl
        'windowScreen': '1366px',     // ProBook 4430s (of dimension 1366 by 650) falls in this category
        'large-desktop': '1440px',    // 1440 by 900
        '2xl': '1536px',              // Default 2xl
        'macScreens': '1650px',       // 1650 by 920
        'wide-desktop': '1920px',     // 1920 by 1080
      },
      boxShadow: {
        'button-shadow': '2px 1px 4px #FFE2A7',
      },
      backgroundImage: {
        bgBlur: "url('/src/assets/img/bg-blur.png')",
        bgShoe: "url('/src/assets/img/shoe1.png')",
        bgWinner: "url('/src/assets/img/winner_fitcoin@3x.png')",
      },
    },
  },
  plugins: [],
}


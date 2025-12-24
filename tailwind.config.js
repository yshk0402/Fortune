/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Zen Kaku Gothic New"', "sans-serif"],
        serif: ['"Shippori Mincho"', "serif"],
      },
      colors: {
        cream: "#FDFCF8", // Warmer, paper-like white
        paper: "#F7F2EE", // Slightly darker paper tone
        ink: "#4A3B32", // Softer dark brown instead of black
        muted: "#8C7E76", // Warm gray-brown
        accent: "#C26A6A", // Keep existing pink-red
        accentDark: "#A24E53",
        gold: "#D4AF37", // Antique gold for borders/accents
        goldLight: "#F3E5AB",
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(74, 59, 50, 0.06)",
        paper: "0 2px 10px rgba(74, 59, 50, 0.03), 0 15px 40px -5px rgba(74, 59, 50, 0.08)",
        glow: "0 0 20px rgba(212, 175, 55, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

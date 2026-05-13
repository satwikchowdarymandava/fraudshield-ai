/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(20, 184, 166, 0.22)",
        danger: "0 0 32px rgba(248, 113, 113, 0.22)"
      },
      backgroundImage: {
        cyber:
          "radial-gradient(circle at 15% 20%, rgba(45, 212, 191, .18), transparent 32%), radial-gradient(circle at 85% 10%, rgba(59, 130, 246, .18), transparent 30%), linear-gradient(135deg, #050816 0%, #08111f 48%, #06141a 100%)"
      }
    }
  },
  plugins: []
};

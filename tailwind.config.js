/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        header: ["28px"],
        body: ["18px"],
        cardheader: ["22px"],
        cardbody: ["14px"],
      },
      colors: {
        primary: "#FEC303", // Custom primary color
        secondary: "#2D3648", // Custom secondary color
        success: "#1C431E",
        btn: "#FFECB1",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};

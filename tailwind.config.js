/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "anilaye-purple": "var(--anilaye-purple)",
        "anilaye-blue": "var(--anilaye-blue)",
        "anilaye-cyan": "var(--anilaye-cyan)",
        "anilaye-dark": "var(--anilaye-dark)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
      },
     },
   },
   plugins: [],
 }


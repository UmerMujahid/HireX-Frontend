/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#a3e635', // lime-400 approximation from screenshot
                    hover: '#84cc16',   // lime-500
                },
                dark: {
                    DEFAULT: '#111827', // gray-900
                    light: '#1f2937',   // gray-800
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming Inter for now, need to add google font link
            }
        },
    },
    plugins: [],
}

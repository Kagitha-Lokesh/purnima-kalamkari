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
                    DEFAULT: '#7B1E3A', // Deep maroon
                },
                secondary: {
                    DEFAULT: '#F5E6D3', // Cream
                },
                accent: {
                    DEFAULT: '#C9A227', // Gold
                },
                gold: '#C9A227',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

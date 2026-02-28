/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Manual toggling
    theme: {
        extend: {
            colors: {
                // Light Mode Glass
                'glass-light': 'rgba(255, 255, 255, 0.7)',
                'glass-light-border': 'rgba(255, 255, 255, 0.5)',

                // Dark Mode Glass
                'glass-dark': 'rgba(20, 20, 25, 0.7)',
                'glass-dark-border': 'rgba(255, 255, 255, 0.1)',

                'accent-primary': 'rgb(var(--accent-primary) / <alpha-value>)',
                'accent-success': '#34C759',
                'accent-danger': '#FF3B30',
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-inset': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }
        },
        fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        }
    },
    plugins: [],
}

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./pages/**/*.{html,js}", "./public/components/**.{js.jsx}"],
    darkMode: true,
    theme: {
        extend: {
            spacing: {
                65: '18rem',
                66: '22rem',
                100: '30rem',
            },
        },
    },
    variants: {},
    plugins: [],
}


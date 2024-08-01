/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                blackMain: '#191919',
                greyMain: '#D9D9D9',
                whiteMain: '#ffffff'
            }
        }
    },
    plugins: []
};


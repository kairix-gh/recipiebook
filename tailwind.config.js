module.exports = {
    mode: "jit",
    purge: [
        "./src/**/*.{js,jsx,ts,tsx,vue}",
        "./public/**/*.html",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {},
            screens: {
                'print': { 'raw': 'print' },
                'screen': { 'raw': 'screen' }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
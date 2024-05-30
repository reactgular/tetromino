// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // false or 'media' or 'class'
    theme: {
        screens: {
            xs: '375px', // mobile medium
            sm: '425px', // mobile large
            md: '768px',
            lg: '1024px',
            ms: '320px', // mobile small
            mm: '375px', // mobile medium
            ml: '425px', // mobile large
            desktop: '600px'
        },
        extend: {
            fontFamily: {
                mono: [
                    '"VT323"',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    '"Liberation Mono"',
                    '"Courier New"',
                    'monospace'
                ],
                logo: ['"Black Ops One"', 'cursive'],
                digits: ['digits']
            },
            gridTemplateColumns: {
                desktop: '7rem 20rem 7rem',
                mobile: '5rem minmax(10rem, 20rem) 5rem'
            }
        },
        colors: {
            // default Tailwind colors
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.warmGray,
            red: colors.red,
            yellow: colors.amber,
            green: colors.emerald,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.violet,
            pink: colors.pink,
            // Tetromino colors
            tetro_i: colors.cyan,
            tetro_o: colors.yellow,
            tetro_t: colors.purple,
            tetro_s: colors.green,
            tetro_z: colors.red,
            tetro_j: colors.blue,
            tetro_l: colors.orange
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('tailwindcss-neumorphism')]
};

// postcss.config.js
import tailwindcss from '@tailwindcss/postcss'; // <-- ¡Importamos el nuevo paquete!
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        tailwindcss,
        autoprefixer,
    ],
};
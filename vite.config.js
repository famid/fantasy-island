import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/application/App.jsx',
                'resources/js/order/App.jsx',
                'resources/js/auth/App.jsx',
                'resources/js/download-ticket/main.jsx',
                'resources/js/game/main.jsx',
                'resources/js/participants/main.jsx',
            ],
            refresh: true,
        }),
        react()
    ],
});




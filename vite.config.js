import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/application/App.js',
                'resources/js/order/App.js',
            ],
            refresh: true,
        })
    ],
});




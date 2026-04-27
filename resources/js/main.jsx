import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.{jsx,tsx}', { eager: true });
        const lower = name.toLowerCase();
        const key = Object.keys(pages).find(k => k.toLowerCase() === `./pages/${lower}.jsx` || k.toLowerCase() === `./pages/${lower}.tsx`);
        return pages[key];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

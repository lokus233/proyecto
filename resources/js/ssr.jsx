import { createInertiaApp } from '@inertiajs/react';
import ReactDOMServer from 'react-dom/server';

export default function render(page) {
    return createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: name => {
            const pages = import.meta.glob('./pages/**/*.{jsx,tsx}', { eager: true });
            const lower = name.toLowerCase();
            const key = Object.keys(pages).find(
                k =>
                    k.toLowerCase() === `./pages/${lower}.jsx` ||
                    k.toLowerCase() === `./pages/${lower}.tsx`
            );
            return pages[key];
        },
        setup({ App, props }) {
            return <App {...props} />;
        },
    });
}

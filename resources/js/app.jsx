import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot, hydrateRoot } from 'react-dom/client'; // Importamos hydrateRoot por si usas SSR
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.{jsx,tsx}', { eager: true });
        const page = pages[`./pages/${name}.jsx`] || pages[`./pages/${name}.tsx`];

        if (!page) {
            console.error(`No se encuentra el archivo ./pages/${name}.jsx o .tsx`);
            return;
        }

        page.default.layout = page.default.layout || ((page) => {
            // Cambiamos 'welcome' por 'Home' para que tu nueva página no use el layout por defecto de Laravel
            if (name === 'Home' || name === 'welcome') return page;

            if (name.startsWith('auth/')) return <AuthLayout children={page} />;
            if (name.startsWith('settings/')) return <AppLayout children={<SettingsLayout children={page} />} />;
            return <AppLayout children={page} />;
        });

        return page.default;
    },

    setup({ el, App, props }) {
        // LA SOLUCIÓN AL ERROR: Solo renderizar si 'el' existe (en el cliente)
        if (el) {
            createRoot(el).render(
                <TooltipProvider delayDuration={0}>
                    <App {...props} />
                </TooltipProvider>
            );
        }
    },
});

// Esto también puede dar error en SSR si no se protege
if (typeof window !== 'undefined') {
    initializeTheme();
}

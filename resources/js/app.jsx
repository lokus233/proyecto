import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
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
            console.error(`Ojo picha: No encuentro el archivo ./pages/${name}.jsx`);
        }

        page.default.layout = page.default.layout || ((page) => {
            if (name === 'welcome') return page;
            if (name.startsWith('auth/')) return <AuthLayout children={page} />;
            if (name.startsWith('settings/')) return <AppLayout children={<SettingsLayout children={page} />} />;
            return <AppLayout children={page} />;
        });

        return page.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
            </TooltipProvider>
        );
    },
});

initializeTheme();

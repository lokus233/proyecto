import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home({ mensaje, usuario }) {
    return (
        <div className="min-h-screen bg-[#F9F5E7]">
            <Header />

            <main className="py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-serif italic text-stone-700 mb-4">
                        {mensaje}
                    </h2>

                    {usuario ? (
                        <p className="text-stone-500">Hola, {usuario.name}. ¿Qué te apetece hoy?</p>
                    ) : (
                        <p className="text-stone-400 uppercase tracking-widest text-sm">
                            Experiencia Gastronómica Única
                        </p>
                    )}
                    <div className="mt-12 h-64 border border-stone-300 flex items-center justify-center italic text-stone-400">
                        [ Aquí irán tus fotos o la descripción del restaurante ]
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
}

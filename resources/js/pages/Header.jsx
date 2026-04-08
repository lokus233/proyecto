export default function Header() {
    return (
        <header className="w-full border-b border-black font-serif text-center">
            <div className="h-24 bg-[#F9F5E7] flex items-center justify-center">
                <h1 className="text-4xl font-medium underline">
                    El Candelabro
                </h1>
            </div>

            <nav className="flex justify-around items-center bg-[#F9F5E7] border-t border-black py-3">
                <a href="#" className="text-xl underline ">Descripción</a>
                <a href="#" className="text-xl underline ">Galería</a>
                <a href="#" className="text-xl underline ">Carta</a>
                <a href="#" className="text-xl underline ">Reserva</a>
                <a href="#" className="text-xl underline ">Pedir Online</a>
            </nav>
        </header>
    );
}

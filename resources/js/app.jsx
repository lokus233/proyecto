import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Carta from "./pages/carta";
import Bodega from "./pages/bodega";
import Reserva from "./pages/reserva";
import Galeria from "./pages/galeria";
import Nosotros from "./pages/nosotros";

export default function App() {
    return (
        <div>
            <header>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carta" element={<Carta />} />
                <Route path="/bodega" element={<Bodega />} />
                <Route path="/reserva" element={<Reserva />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/nosotros" element={<Nosotros />} />
            </Routes>

            <footer>
            </footer>
        </div>
    );
}

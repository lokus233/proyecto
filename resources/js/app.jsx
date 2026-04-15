import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Carta from "./pages/carta";
import Bodega from "./pages/bodega";

export default function App() {
    return (
        <div>
            <header>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carta" element={<Carta />} />
                <Route path="/bodega" element={<Bodega />} />
            </Routes>

            <footer>
            </footer>
        </div>
    );
}

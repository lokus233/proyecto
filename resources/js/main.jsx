import '../css/app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app"; // Importa el componente de arriba

const el = document.getElementById("app");

if (el) {
    ReactDOM.createRoot(el).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

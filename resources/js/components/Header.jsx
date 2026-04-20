import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const contenedorPrincipal = {
        width: '100%',
        fontFamily: 'serif',
        backgroundColor: 'black',
    };

    const banner = {
        height: '6rem',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
    };

    const titulo = {
        fontSize: '2.25rem',
        fontWeight: '500',
        color: '#e3e0dd',
        margin: 0,
        flex: '0 1 auto',
    };

    const barraNav = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        gap: '3.5rem',
    };

    const enlaces = {
        fontSize: '1.45rem',
        textDecoration: 'underline',
        color: '#e3e0dd',
    };

    return (
        <header style={contenedorPrincipal}>
            <div style={banner}>
                <h1 style={titulo}>El Candelabro</h1>

                <nav style={barraNav}>
                    <Link name="inicio" to="/" style={enlaces}>Inicio</Link>
                    <Link name="carta" to="/carta" style={enlaces}>Carta</Link>
                    <Link name="bodega" to="/bodega" style={enlaces}>Bodega</Link>
                    <Link name="reserva" to="/reserva" style={enlaces}>Reserva</Link>
                    <Link name="galeria" to="/galeria" style={enlaces}>Galería</Link>
                    <Link name="nosotros" to="/nosotros" style={enlaces}>Contacto</Link>
                </nav>

                <div style={{flex: '0 1 auto', width: '200px', visibility: 'hidden'}} className="spacer"></div>
            </div>
        </header>
    );
}

export default Header;

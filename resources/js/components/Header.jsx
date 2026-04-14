import React from 'react';

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
        fontSize: '1.25rem',
        textDecoration: 'underline',
        color: '#e3e0dd',
    };

    return (
        <header style={contenedorPrincipal}>
            <div style={banner}>
                <h1 style={titulo}>El Candelabro</h1>

                <nav style={barraNav}>
                    <a href="#" style={enlaces}>Descripción</a>
                    <a href="#" style={enlaces}>Carta</a>
                    <a href="#" style={enlaces}>Bodega</a>
                    <a href="#" style={enlaces}>Reserva</a>
                    <a href="#" style={enlaces}>Galería</a>
                    <a href="#" style={enlaces}>Contacto</a>
                    <a href="#" style={enlaces}>Pedir Online</a>
                </nav>

                {/* Div vacío opcional para balancear el centro exacto */}
                <div style={{flex: '0 1 auto', width: '200px', visibility: 'hidden'}} className="spacer"></div>
            </div>
        </header>
    );
}

export default Header;

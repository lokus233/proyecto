import React from 'react';

function Header() {
    const contenedorPrincipal = {
        width: '100%',
        borderBottom: '1px solid black',
        fontFamily: 'serif',
        textAlign: 'center',
    };

    const banner = {
        height: '6rem',
        backgroundColor: '#F9F5E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const titulo = {
        fontSize: '2.25rem',
        fontWeight: '500',
        textDecoration: 'underline',
        color: 'black',
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F9F5E7',
        borderTop: '1px solid black',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
    };

    const linkStyle = {
        fontSize: '1.25rem',
        textDecoration: 'underline',
        color: 'black',
    };

    return (
        <header style={contenedorPrincipal}>
            <div style={banner}>
                <h1 style={titulo}>
                    El Candelabro
                </h1>
            </div>

            <nav style={navStyle}>
                <a href="#" style={linkStyle}>Descripción</a>
                <a href="#" style={linkStyle}>Galería</a>
                <a href="#" style={linkStyle}>Carta</a>
                <a href="#" style={linkStyle}>Reserva</a>
                <a href="#" style={linkStyle}>Pedir Online</a>
            </nav>
        </header>
    );
}

export default Header;

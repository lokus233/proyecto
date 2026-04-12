import React from 'react';

function Footer() {
    const contenedorPrincipal = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        color: 'black',
        fontFamily: 'serif',
        fontWeight: 'bold',
        borderTop: '1px solid #000000',
    };

    const columnas = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };


    const botones = {
        color: 'black',
        border: '2px solid black',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 'bold',
    };

    const titulo = {
        fontSize: '2rem',
        margin: 0,
        borderBottom: '2px solid black',
        marginBottom: '0.5rem',
    }

    return (
        <footer style={contenedorPrincipal}>
            <div style={columnas}>
                <a href='#nosotros'>PONER NUIMERO</a>
                <a href='#nosotros'>PONER EMAIL</a>
            </div>

            <div style={{ ...columnas, alignItems: 'center' }}>
                <h2 style={titulo}>
                    El candelabro
                </h2>
                <button
                    onClick={() => window.location.href = '#reserva'}
                    style={botones}
                >
                    Reserva
                </button>
            </div>

            <div style={{ ...columnas, alignItems: 'flex-end' }}>
                <button
                onClick={() => window.location.href = '#nosotros'}
                style={botones}>
                    Nosotros
                </button>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <span style={{ cursor: 'pointer' }}>FB</span>
                    <span style={{ cursor: 'pointer' }}>IG</span>
                    <span style={{ cursor: 'pointer' }}>X</span>
                    <span style={{ cursor: 'pointer' }}>TK</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

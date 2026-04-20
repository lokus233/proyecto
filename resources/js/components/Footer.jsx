import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const contenedorPrincipal = {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '3rem 2rem',
        color: '#e3e0dd',
        fontFamily: 'serif',
        backgroundColor: 'black',
    };

    const columnas = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        flex: 1.5,
    };

    const titulo = {
        fontSize: '2.25rem',
        fontWeight: '500',
        textDecoration: 'underline',
        color: '#e3e0dd',
        flex: '0 1 auto',
    };

    const enlaceEstilo = {
        color: '#d0923c',
        textDecoration: 'none',
        fontSize: '0.9rem'
    };

    const subtitulos = {
        fontWeight: 'bold',
        color: '#e3e0dd',
        fontSize: '1.5rem'

    }

    return (
        <footer style={contenedorPrincipal}>
            <div style={columnas}>
                <h2 style={titulo}>El Candelabro</h2>
                <p style={{ margin: 0, fontWeight: 'normal' }}>
                    Hacer una descripción aquí.
                </p>
            </div>

            <div style={columnas}>
                <span style={subtitulos}>Contacto</span>
                <Link to="/nosotros" style={enlaceEstilo}>Poner aquí el telefono</Link>
                <Link to="/nosotros" style={enlaceEstilo}>Poner aquí un email</Link>
            </div>

            <div style={columnas}>
                <span style={subtitulos}>Gestiones</span>
                <Link to="/reserva" style={enlaceEstilo}>Reserva</Link>
                <Link to="/carta" style={enlaceEstilo}>Ver Menú</Link>
            </div>

            <div style={columnas}>
                <Link to="/nosotros" style={subtitulos}>Nosotros</Link>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>FB</span>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>IG</span>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>X</span>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>TK</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

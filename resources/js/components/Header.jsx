import React from 'react';
import { Link, usePage } from '@inertiajs/react';

function Header() {
    const { auth } = usePage().props;
    const usuario = auth?.user;

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
    const botonLogin = {
        fontSize: '1.5rem',
        color: '#e3e0dd',
        border: '1px solid #e3e0dd',
        padding: '0.4rem 1.2rem',
        borderRadius: '4px',
        textDecoration: 'none',
        flex: '0 1 auto',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.2s, color 0.2s',
    };
    const nombreUsuario = {
        fontSize: '1.2rem',
        color: '#e3e0dd',
        flex: '0 1 auto',
    };

    const botonLogout = {
        fontSize: '1.15rem',
        color: '#e3e0dd',
        border: '1px solid #e3e0dd',
        padding: '0.4rem 1.2rem',
        borderRadius: '4px',
        textDecoration: 'none',
        flex: '0 1 auto',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.2s, color 0.2s',
        cursor: 'pointer'
    }


    let Logeo;
    if (usuario) {
        Logeo = (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '0 1 auto' }}>
                <span style={nombreUsuario}>{usuario.nombre}</span>
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    style={botonLogout}
                >
                    Cerrar sesión
                </Link>
            </div>
        );
    } else {
        Logeo = <Link href="/login" style={botonLogin}>Iniciar sesión</Link>;
    }
    return (
        <header style={contenedorPrincipal}>
            <div style={banner}>
                <h1 style={titulo}>El Candelabro</h1>
                <nav style={barraNav}>
                    <Link href="/" style={enlaces}>Inicio</Link>
                    <Link href="/carta" style={enlaces}>Carta</Link>
                    <Link href="/bodega" style={enlaces}>Bodega</Link>
                    <Link href="/reserva" style={enlaces}>Reserva</Link>
                    <Link href="/galeria" style={enlaces}>Galería</Link>
                    <Link href="/nosotros" style={enlaces}>Contacto</Link>
                </nav>
                {Logeo}
            </div>
        </header>
    );
}

export default Header;

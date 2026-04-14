import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home({ usuario }) {

    const main = {
        backgroundColor: 'black',
        color: '#e3e0dd',
        fontFamily: 'serif'
    };

    const portada = {
        position: 'relative',
        height: 'calc(100vh - 80px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0
    };

    const gifFondo = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1,
        opacity: 0.5
    };

    const contenido = {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
    };

    const titulo = {
        fontSize: '3rem',
        fontStyle: 'italic',
        marginBottom: '1rem',
        color: 'white'
    };

    const textoNormal = {
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '1.2rem'
    };

    const textoUsuario = {
        color: '#a0be94'
    };

    const seccionGrid = {
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        height: '400px',
        backgroundColor: 'white',
        overflow: 'hidden',
    };

    const columnaTexto = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 3rem',
        textAlign: 'center',
        color: '#333',
    };

    const columnaImagen = {
        flex: 1,
        width: '50%',
        height: '100%',
        objectFit: 'cover',
    };
    let UserMensaje;

    if (usuario) {
        UserMensaje = (
            <p style={textoUsuario}>
                Hola, {usuario.name}. ¿Qué te apetece hoy?
            </p>
        );
    } else {
        UserMensaje = (
            <p style={textoNormal}>
                Experiencia Gastronómica Única
            </p>
        );
    }

    return (
        <div style={main}>
            <Header />

            <section style={portada}>
                <img src="/Comidas.gif" style={gifFondo} />

                <div style={contenido}>
                    <h1 style={titulo}>
                        Bienvenidos a El Candelabro
                    </h1>
                    {UserMensaje}
                </div>
            </section>

            <section style={seccionGrid}>
                <div style={columnaTexto}>
                    <h2 style={{
                        fontFamily: 'serif',
                        fontSize: '2.8rem',
                        color: '#1a1a1a',
                        marginBottom: '1.5rem',
                        fontWeight: '400'
                    }}>
                        Bienvenidos
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        maxWidth: '500px',
                        color: '#555',
                        fontFamily: 'serif'
                    }}>POner texto
                    </p>
                    <div style={{ marginTop: '3rem', fontStyle: 'italic', fontSize: '1.5rem' }}>
                        Candelabro
                    </div>
                </div>

                <img
                    src="/imagen1Home.jpg"
                    style={columnaImagen}
                    alt="Interior del restaurante"
                />
            </section>
            <Footer />
        </div>
    );
}

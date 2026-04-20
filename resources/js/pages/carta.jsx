import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuCarta from '../components/MenuCarta';

export default function Carta() {

    const main = {
        backgroundColor: 'black',
        color: '#e3e0dd',
        fontFamily: 'serif'
    };


    const contenido = {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
    };

     const titulo = {
        fontSize: '3.5rem',
        color: 'white',
        textAlign: 'center',
        paddingLeft: "24px",
        paddingRight: "24px",
    };

    const headerExtendido = {
        width: "100%",
        backgroundColor: "#000000",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "24px",
        paddingRight: "24px",
        boxSizing: "border-box",
    };
    return (
        <div style={main}>
            <Header />
            <div style={headerExtendido}>
                <section style={titulo}>Nuestra Carta</section>
            </div>

            <section style={contenido}>

                <div style={contenido}>
                </div>
            </section>

            <MenuCarta />

            <Footer />
        </div>
    );
}

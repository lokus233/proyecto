import { useState } from 'react';
import TarjetaPlato from './TarjetaPlato';

/* PONER PARA QUE SSEA EDITABLE CON EL ADMINISTRADOR */

const categorias = [
    {
        nombre: 'HUERTA',
        platos: [
            { id: 1, nombre: 'Aguacate relleno de Verduras y frutos secos con boquerones', descripcion: 'Sobre una salsa de tomates verdes y jalapeños', precio: '9,00' },
            { id: 2, nombre: 'Alcachofas rellenas de marisco', descripcion: 'Huevo a baja cocción', precio: '14,00' },
            { id: 3, nombre: 'Aguacate con Buey de Mar y obleas', descripcion: '', precio: '14,00' },
            { id: 4, nombre: 'Ensalada de naranja, remolacha, bacalao desmigado y piñones', descripcion: 'A la vinagreta de naranja', precio: '14,00' },
        ]
    },
    {
        nombre: 'MAR',
        platos: [
            { id: 5, nombre: 'Gambas al ajillo', descripcion: 'Con guindilla y perejil fresco', precio: '16,00' },
            { id: 6, nombre: 'Pulpo a la brasa', descripcion: 'Sobre crema de patata y pimentón de la vera', precio: '18,00' },
        ]
    },
    {
        nombre: 'FRITOS',
        platos: [
            { id: 7, nombre: 'Croquetas de jamón ibérico', descripcion: 'Bechamel artesanal, crujiente exterior', precio: '10,00' },
            { id: 8, nombre: 'Chopitos con alioli de ajo negro', descripcion: '', precio: '12,00' },
        ]
    },
];
export default function MenuCarta() {
    const [activa, setActiva] = useState(0);

    const seccion = {
        backgroundColor: 'white',
        padding: '3rem 2rem',
        fontFamily: 'serif'
    };

    const categoria = {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '3rem'
    };

    const pestaña = {
        padding: '0.5rem 1.5rem',
        borderRadius: '999px',
        border: '1px solid #999',
        backgroundColor: 'transparent',
        color: '#534b4b',
        cursor: 'pointer',
        fontFamily: 'serif',
        };

    const grid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0 4rem',
        maxWidth: '1100px',
        margin: '0 auto'
    };

    return (
        <section style={seccion}>

            <div style={categoria}>
                {categorias.map((cat, i) => (
                    <button key={i} onClick={() => setActiva(i)} style={pestaña}>
                        {cat.nombre}
                    </button>
                ))}
            </div>

            <div style={grid}>
                {categorias[activa].platos.map(plato => (
                    <TarjetaPlato key={plato.id} {...plato} />
                ))}
            </div>

        </section>
    );
}

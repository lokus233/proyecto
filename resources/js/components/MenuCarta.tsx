import { useState } from 'react';
import TarjetaPlato from './TarjetaPlato';
import { Categoria, Plato } from '@/types';

interface Props {
    categorias?: Categoria[];
}

export default function MenuCarta({ categorias = [] }: Props) {
    const [activa, setActiva] = useState(0);

    const seccion = { backgroundColor: 'white', padding: '3rem 2rem', fontFamily: 'serif' };
    const contenedorTabs = { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' };
    const grid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem 4rem',
        maxWidth: '1100px',
        margin: '0 auto'
    };



    return (
        <section style={seccion}>
            <div style={contenedorTabs}>
                {categorias.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setActiva(i)}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '999px',
                            border: '1px solid #999',
                            cursor: 'pointer',
                            backgroundColor: activa === i ? '#534b4b' : 'transparent',
                            color: activa === i ? 'white' : '#534b4b',
                        }}
                    >
                        {cat.nombre}
                    </button>
                ))}
            </div>

            <div style={grid}>
                {categorias[activa]?.platos.map((plat: Plato) => (
                    <TarjetaPlato key={plat.id} {...plat} />
                ))}
            </div>
        </section>
    );
}

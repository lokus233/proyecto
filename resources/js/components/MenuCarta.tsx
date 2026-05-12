import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import TarjetaPlato from './TarjetaPlato';
import { useCarrito } from '@/components/carritoComp';
import { Categoria, Plato } from '@/types';


interface Props {
   categorias?: Categoria[];
}


export default function MenuCarta({ categorias = [] }: Props) {
   const { auth } = usePage().props as any;
   const usuario = auth?.user;
   const { agregarAlCarrito } = useCarrito();
   const [activa, setActiva] = useState(0);


   if (!categorias || categorias.length === 0) return null;


   const seccion = {
       backgroundColor: 'white',
       padding: '4rem 5%',
       fontFamily: 'serif',
       minHeight: '65vh',
   };


   const grid = {
       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
       gap: '1.5rem 3rem',
       maxWidth: '1600px',
       margin: '0 auto',
   };


   const contenedorTabs = {
       display: 'flex',
       justifyContent: 'center',
       gap: '1rem',
       marginBottom: '4rem',
       flexWrap: 'wrap' as const,
   };


   return (
       <section style={seccion}>
           <div style={contenedorTabs}>
               {categorias.map((cat, i) => (
                   <button
                       key={cat.id}
                       onClick={() => setActiva(i)}
                       style={{
                           padding: '0.5rem 1.5rem',
                           fontSize: '1.6rem',
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
               {categorias[activa]?.platos?.map((plat: Plato) => (
                   <TarjetaPlato
                       key={plat.id}
                       {...plat}
                       onAdd={usuario ? agregarAlCarrito : undefined}
                   />
               ))}
           </div>
       </section>
   );
}



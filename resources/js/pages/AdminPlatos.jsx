import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


export default function AdminPlatos({ platos }) {
   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
   const [busqueda, setBusqueda] = useState('');


   const categorias = [...new Set(platos.map(p => p.categoria?.nombre).filter(Boolean))];


   let platosFiltrados;
   if (categoriaSeleccionada) {
       platosFiltrados = platos.filter(p => p.categoria?.nombre === categoriaSeleccionada);
   } else {
       platosFiltrados = platos;
   }


   if (busqueda) {
       platosFiltrados = platosFiltrados.filter(p =>
           p.nombre.toLowerCase().includes(busqueda.toLowerCase())
       );
   }


const th = { padding: '1rem', textAlign: 'left', fontSize: '1.3rem', fontWeight: '600', color: '#e3e0dd' };
const td = { padding: '0.9rem 1rem', fontSize: '1.1rem', color: '#e3e0dd' };
const botonEditar = { padding: '0.35rem 0.8rem', border: '1px solid #a0be94', borderRadius: '4px', textDecoration: 'none', fontSize: '1.1rem', color: '#a0be94' };
const botonEliminar = { padding: '0.35rem 0.8rem', border: '1px solid #c0392b', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#c0392b', cursor: 'pointer' };


   const eliminar = (id) => {
       if (confirm('¿Seguro que quieres eliminar este plato?')) {
           router.delete(`/platos/${id}`);
       }
   };


   return (
       <div style={{ minHeight: '100vh', backgroundColor: 'black', fontFamily: 'serif', color: '#e3e0dd' }}>
           <Header />
           <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
               <h1 style={{ fontSize: '1.8rem', color: '#e3e0dd', marginBottom: '1.5rem', fontStyle: 'italic' }}>Gestión de platos</h1>


               <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                       <select
                           value={categoriaSeleccionada}
                           onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                           style={{
                               padding: '0.6rem 1rem',
                               border: '1px solid #444',
                               borderRadius: '4px',
                               fontSize: '1.1rem',
                               backgroundColor: '#111',
                               color: '#e3e0dd',
                               cursor: 'pointer',
                               fontFamily: 'serif',
                           }}
                       >
                           <option value="">Todas las categorías</option>
                           {categorias.map((cat) => (
                               <option key={cat} value={cat}>{cat}</option>
                           ))}
                       </select>


                       <input
                           type="text"
                           placeholder="Buscar plato..."
                           value={busqueda}
                           onChange={(e) => setBusqueda(e.target.value)}
                           style={{
                               padding: '0.6rem 1rem',
                               border: '1px solid #444',
                               borderRadius: '4px',
                               fontSize: '1.1rem',
                               width: '250px',
                               backgroundColor: '#111',
                               color: '#e3e0dd',
                               fontFamily: 'serif',
                               outline: 'none',
                           }}
                       />
                   </div>


                   <Link
                       href="/platos/create"
                       style={{
                           border: '1px solid #e3e0dd',
                           color: '#e3e0dd',
                           padding: '0.6rem 1.4rem',
                           borderRadius: '4px',
                           textDecoration: 'none',
                           fontSize: '1.1rem',
                           alignSelf: 'center',
                           fontFamily: 'serif',
                       }}
                   >
                       + Añadir plato
                   </Link>
               </div>


               <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                   <thead>
                       <tr style={{ borderBottom: '1px solid #444' }}>
                           <th style={th}>Nombre</th>
                           <th style={th}>Categoría</th>
                           <th style={th}>Precio</th>
                           <th style={th}>Acciones</th>
                       </tr>
                   </thead>
                   <tbody>
                       {platosFiltrados.map((plato) => (
                           <tr key={plato.id} style={{ borderBottom: '1px solid #222' }}>
                               <td style={td}>{plato.nombre}</td>
                               <td style={td}>{plato.categoria?.nombre ?? '—'}</td>
                               <td style={td}>{plato.precio} €</td>
                               <td style={{ ...td, display: 'flex', gap: '2rem' }}>
                                   <Link href={`/platos/${plato.id}/edit`} style={botonEditar}>Editar</Link>
                                   <button onClick={() => eliminar(plato.id)} style={botonEliminar}>Eliminar</button>
                               </td>
                           </tr>
                       ))}
                       {platosFiltrados.length === 0 && (
                           <tr>
                               <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                   No hay platos en esta categoría.
                               </td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>
       </div>
   );
}





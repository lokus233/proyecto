import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


export default function AdminCategorias({ categorias }) {
   const [busqueda, setBusqueda] = useState('');


   let categoriasFiltradas;
   if (busqueda) {
       categoriasFiltradas = categorias.filter(c =>
           c.nombre.toLowerCase().includes(busqueda.toLowerCase())
       );
   } else {
       categoriasFiltradas = categorias;
   }


   const th = { padding: '1rem', textAlign: 'left', fontSize: '1.3rem', fontWeight: '600', color: '#e3e0dd' };
   const td = { padding: '0.9rem 1rem', fontSize: '1.1rem', color: '#e3e0dd' };
   const botonEditar = { padding: '0.35rem 0.8rem', border: '1px solid #a0be94', borderRadius: '4px', textDecoration: 'none', fontSize: '1.1rem', color: '#a0be94' };
   const botonEliminar = { padding: '0.35rem 0.8rem', border: '1px solid #c0392b', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#c0392b', cursor: 'pointer' };
   const botonOcultar = { padding: '0.35rem 0.8rem', border: '1px solid #e3a020', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#e3a020', cursor: 'pointer' };
const botonMostrar = { padding: '0.35rem 0.8rem', border: '1px solid #a0be94', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#a0be94', cursor: 'pointer' };




   const eliminar = (id) => {
       if (confirm('¿Seguro que quieres eliminar esta categoría?')) {
           router.delete(`/categorias/${id}`);
       }
   };


   return (
       <div style={{ minHeight: '100vh', backgroundColor: 'black', fontFamily: 'serif', color: '#e3e0dd' }}>
           <Header />
           <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
               <h1 style={{ fontSize: '1.8rem', color: '#e3e0dd', marginBottom: '1.5rem', fontStyle: 'italic' }}>Gestión de categorías</h1>


               <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                   <input
                       type="text"
                       placeholder="Buscar categoría..."
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


                   <Link
                       href="/categorias/create"
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
                       + Añadir categoría
                   </Link>
               </div>


               <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                   <thead>
                       <tr style={{ borderBottom: '1px solid #444' }}>
                           <th style={th}>Nombre</th>
                           <th style={th}>Descripción</th>
                           <th style={th}>Acciones</th>
                       </tr>
                   </thead>
                   <tbody>
                       {categoriasFiltradas.map((categoria) => (
                           <tr key={categoria.id} style={{ borderBottom: '1px solid #222' }}>
                               <td style={td}>{categoria.nombre}</td>
                               <td style={td}>{categoria.descripcion ?? '—'}</td>
                               <td style={{ ...td, display: 'flex', gap: '2rem' }}>
                                   <Link href={`/categorias/${categoria.id}/edit`} style={botonEditar}>Editar</Link>
                                   <button onClick={() => eliminar(categoria.id)} style={botonEliminar}>Eliminar</button>
                                   <button
                                       onClick={() => router.put(`/categorias/${categoria.id}/toggle`)}
                                       //petición PUT al servidor usando el router de Inertia
                                       style={categoria.activo ? botonOcultar : botonMostrar}
                                   >
                                       {categoria.activo ? 'Ocultar' : 'Mostrar'}
                                   </button>
                               </td>
                           </tr>
                       ))}
                       {categoriasFiltradas.length === 0 && (
                           <tr>
                               <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                   No hay categorías registradas.
                               </td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>
       </div>
   );
}




import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


export default function AdminUsuarios({ usuarios }) {
   const [busqueda, setBusqueda] = useState('');


   let usuariosFiltrados;
   if (busqueda) {
       usuariosFiltrados = usuarios.filter(u =>
           u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
           u.email.toLowerCase().includes(busqueda.toLowerCase())
       );
   } else {
       usuariosFiltrados = usuarios;
   }


   const th = { padding: '1rem', textAlign: 'left', fontSize: '1.3rem', fontWeight: '600', color: '#e3e0dd' };
   const td = { padding: '0.9rem 1rem', fontSize: '1.1rem', color: '#e3e0dd' };
   const botonEditar = { padding: '0.35rem 0.8rem', border: '1px solid #a0be94', borderRadius: '4px', textDecoration: 'none', fontSize: '1.1rem', color: '#a0be94' };
   const botonEliminar = { padding: '0.35rem 0.8rem', border: '1px solid #c0392b', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#c0392b', cursor: 'pointer' };
   const botonOcultar = { padding: '0.35rem 0.8rem', border: '1px solid #e3a020', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#e3a020', cursor: 'pointer' };
   const botonMostrar = { padding: '0.35rem 0.8rem', border: '1px solid #a0be94', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '1.1rem', color: '#a0be94', cursor: 'pointer' };


   const eliminar = (id) => {
       if (confirm('¿Seguro que quieres eliminar este usuario?')) {
           router.delete(`/usuarios/${id}`);
       }
   };


   return (
       <div style={{ minHeight: '100vh', backgroundColor: 'black', fontFamily: 'serif', color: '#e3e0dd' }}>
           <Header />
           <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
               <h1 style={{ fontSize: '1.8rem', color: '#e3e0dd', marginBottom: '1.5rem', fontStyle: 'italic' }}>Gestión de usuarios</h1>


               <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                   <input
                       type="text"
                       placeholder="Buscar usuario..."
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


               <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                   <thead>
                       <tr style={{ borderBottom: '1px solid #444' }}>
                           <th style={th}>Nombre</th>
                           <th style={th}>Apellidos</th>
                           <th style={th}>Email</th>
                           <th style={th}>Teléfono</th>
                           <th style={th}>Rol</th>
                           <th style={th}>Estado</th>
                           <th style={th}>Acciones</th>
                       </tr>
                   </thead>
                   <tbody>
                       {usuariosFiltrados.map((usuario) => (
                           <tr key={usuario.id} style={{ borderBottom: '1px solid #222' }}>
                               <td style={td}>{usuario.nombre}</td>
                               <td style={td}>{usuario.apellidos}</td>
                               <td style={td}>{usuario.email}</td>
                               <td style={td}>{usuario.telefono ?? '—'}</td>
                               <td style={td}>{usuario.roles.map(r => r.nombre).join(', ') || '—'}</td>
                               <td style={td}>
                                   <span style={{ color: usuario.activo ? '#a0be94' : '#c0392b' }}>
                                       {usuario.activo ? 'Activo' : 'Inactivo'}
                                   </span>
                               </td>
                               <td style={{ ...td, display: 'flex', gap: '1rem' }}>
                                   <Link href={`/usuarios/${usuario.id}/edit`} style={botonEditar}>Editar</Link>
                                   <button onClick={() => router.put(`/usuarios/${usuario.id}/toggle`)} style={usuario.activo ? botonOcultar : botonMostrar}>
                                       {usuario.activo ? 'Desactivar' : 'Activar'}
                                   </button>
                                   <button onClick={() => eliminar(usuario.id)} style={botonEliminar}>Eliminar</button>
                               </td>
                           </tr>
                       ))}
                       {usuariosFiltrados.length === 0 && (
                           <tr>
                               <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                   No hay usuarios registrados.
                               </td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>
       </div>
   );
}

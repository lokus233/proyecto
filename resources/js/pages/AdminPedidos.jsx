import { router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


const ESTADOS = ['pendiente', 'en preparación', 'listo', 'entregado', 'cancelado'];


export default function AdminPedidos({ pedidos, usuarios, filtros }) {
   const [editandoEstado, setEditandoEstado] = useState(null);
   const [fechaDesde, setFechaDesde] = useState(filtros.fecha_desde ?? '');
   const [fechaHasta, setFechaHasta] = useState(filtros.fecha_hasta ?? '');
   const [userId, setUserId] = useState(filtros.user_id ?? '');


   const th = { padding: '1rem', textAlign: 'left', fontSize: '1.3rem', fontWeight: '600', color: '#e3e0dd' };
   const td = { padding: '0.9rem 1rem', fontSize: '1.1rem', color: '#e3e0dd', verticalAlign: 'top' };


   const botonFiltrar = {
       padding: '0.35rem 0.8rem', border: '1px solid #e3e0dd', borderRadius: '4px',
       backgroundColor: 'transparent', fontSize: '1.1rem', color: '#e3e0dd',
       cursor: 'pointer', fontFamily: 'serif',
   };
   const botonLimpiar = {
       padding: '0.35rem 0.8rem', border: '1px solid #444', borderRadius: '4px',
       backgroundColor: 'transparent', fontSize: '1.1rem', color: '#888',
       cursor: 'pointer', fontFamily: 'serif',
   };
   const botonEliminar = {
       padding: '0.35rem 0.8rem', border: '1px solid #c0392b', borderRadius: '4px',
       backgroundColor: 'transparent', fontSize: '1.1rem', color: '#c0392b',
       cursor: 'pointer', fontFamily: 'serif',
   };


   const estadoColores = {
       'pendiente':      { color: '#e3a020', borderColor: '#e3a020' },
       'en preparación': { color: '#5b9bd5', borderColor: '#5b9bd5' },
       'listo':          { color: '#a0be94', borderColor: '#a0be94' },
       'entregado':      { color: '#888',    borderColor: '#888'    },
       'cancelado':      { color: '#c0392b', borderColor: '#c0392b' },
   };


   const inputStyle = {
       padding: '0.6rem 1rem', border: '1px solid #444', borderRadius: '4px',
       fontSize: '1rem', backgroundColor: '#111', color: '#e3e0dd',
       fontFamily: 'serif', outline: 'none',
   };


   const label = { fontSize: '0.9rem', color: '#888' };


   const platoBadge = {
       border: '1px solid #333', borderRadius: '4px',
       padding: '0.15rem 0.5rem', fontSize: '0.95rem', color: '#aaa',
   };
function filtrar(e) {
   e.preventDefault();
   router.get('/adminPedidos', {
       fecha_desde: fechaDesde,
       fecha_hasta: fechaHasta,
       user_id: userId,
   }, { preserveScroll: true });
}


function limpiar() {
   setFechaDesde('');
   setFechaHasta('');
   setUserId('');
   router.get('/adminPedidos');
}


function cambiarEstado(pedido, nuevoEstado) {
   router.put(`/pedidos/${pedido.id}`, { estado: nuevoEstado }, {
       preserveScroll: true,
       onSuccess: () => setEditandoEstado(null),
   });
}


function eliminar(id) {
   if (confirm('¿Seguro que quieres eliminar este pedido?')) {
       router.delete(`/pedidos/${id}`, { preserveScroll: true });
   }
}    return (
       <div style={{ minHeight: '100vh', backgroundColor: 'black', fontFamily: 'serif', color: '#e3e0dd' }}>
           <Header />
           <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem' }}>
               <h1 style={{ fontSize: '1.8rem', color: '#e3e0dd', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                   Gestión de pedidos
               </h1>


               {/* FILTROS */}
               <form onSubmit={filtrar} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                       <label style={label}>Desde</label>
                       <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} style={inputStyle} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                       <label style={label}>Hasta</label>
                       <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} style={inputStyle} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                       <label style={label}>Cliente</label>
                       <select value={userId} onChange={e => setUserId(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                           <option value="">Todos</option>
                           {usuarios.map(u => (
                               <option key={u.id} value={u.id}>{u.nombre} {u.apellidos}</option>
                           ))}
                       </select>
                   </div>
                   <button type="submit" style={botonFiltrar}>Filtrar</button>
                   <button type="button" onClick={limpiar} style={botonLimpiar}>Limpiar</button>
               </form>


               {/* CONTADOR */}
               <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '1rem' }}>
                   {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} encontrado{pedidos.length !== 1 ? 's' : ''}
               </p>


               {/* TABLA */}
               <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
                   <thead>
                       <tr style={{ borderBottom: '1px solid #444' }}>
                           <th style={th}>#</th>
                           <th style={th}>Cliente</th>
                           <th style={th}>Platos</th>
                           <th style={th}>Total</th>
                           <th style={th}>Fecha</th>
                           <th style={th}>Estado</th>
                           <th style={th}>Acciones</th>
                       </tr>
                   </thead>
                   <tbody>
                       {pedidos.length === 0 && (
                           <tr>
                               <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#888', fontSize: '1.1rem' }}>
                                   No hay pedidos con esos filtros.
                               </td>
                           </tr>
                       )}
                       {pedidos.map(pedido => (
                           <tr key={pedido.id} style={{ borderBottom: '1px solid #222' }}>
                               <td style={{ ...td, color: '#555', fontFamily: 'monospace' }}>#{pedido.id}</td>
                               <td style={td}>{pedido.usuario?.nombre} {pedido.usuario?.apellidos}</td>
                               <td style={td}>
                                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                       {pedido.platos.map(p => (
                                           <span key={p.id} style={platoBadge}>
                                               {p.nombre} ×{p.pivot.cantidad}
                                           </span>
                                       ))}
                                   </div>
                               </td>
                               <td style={{ ...td, fontWeight: '600' }}>{pedido.precio_total} €</td>
                               <td style={{ ...td, color: '#888', fontSize: '1rem' }}>
                                   {new Date(pedido.created_at).toLocaleString('es-ES')}
                               </td>
                               <td style={td}>
                                   {editandoEstado === pedido.id ? (
                                       <select
                                           defaultValue={pedido.estado}
                                           autoFocus
                                           onChange={e => cambiarEstado(pedido, e.target.value)}
                                           onBlur={() => setEditandoEstado(null)}
                                           style={{ ...inputStyle, cursor: 'pointer' }}
                                       >
                                           {ESTADOS.map(e => (
                                               <option key={e} value={e}>{e}</option>
                                           ))}
                                       </select>
                                   ) : (
                                       <span
                                           onClick={() => setEditandoEstado(pedido.id)}
                                           title="Clic para cambiar estado"
                                           style={{
                                               cursor: 'pointer',
                                               padding: '0.3rem 0.7rem',
                                               border: `1px solid ${estadoColores[pedido.estado]?.borderColor ?? '#888'}`,
                                               borderRadius: '4px',
                                               fontSize: '1rem',
                                               color: estadoColores[pedido.estado]?.color ?? '#888',
                                               fontFamily: 'serif',
                                           }}
                                       >
                                           {pedido.estado}
                                       </span>
                                   )}
                               </td>
                               <td style={td}>
                                   <button onClick={() => eliminar(pedido.id)} style={botonEliminar}>
                                       Eliminar
                                   </button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>
   );
}




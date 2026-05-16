import { usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function UsuarioPedido({ pedidos }) {
   const { flash } = usePage().props;


   const main = {
       backgroundColor: 'black',
       color: '#e3e0dd',
       fontFamily: 'serif',
       minHeight: '100vh',
   };


   const caja = {
       maxWidth: '800px',
       margin: '0 auto',
       padding: '3rem 2rem',
   };


   const titulo = {
       fontSize: '2rem',
       fontStyle: 'italic',
       marginBottom: '2rem',
       color: '#e3e0dd',
   };


   const mensajeExito = {
       backgroundColor: '#1a2e1a',
       border: '1px solid #a0be94',
       color: '#a0be94',
       padding: '1rem 1.5rem',
       borderRadius: '4px',
       marginBottom: '2rem',
       fontSize: '1.1rem',
   };


   const tarjeta = {
       border: '1px solid #333',
       borderRadius: '4px',
       padding: '1.5rem',
       marginBottom: '1.5rem',
   };


   const cabecera = {
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: '1rem',
       borderBottom: '1px solid #333',
       paddingBottom: '0.8rem',
   };


   const fecha = {
       fontSize: '0.95rem',
       color: '#888',
   };


   const fila = {
       display: 'flex',
       justifyContent: 'space-between',
       padding: '0.4rem 0',
       fontSize: '1.1rem',
       color: '#e3e0dd',
   };


   const totalEstilo = {
       display: 'flex',
       justifyContent: 'flex-end',
       marginTop: '1rem',
       paddingTop: '0.8rem',
       borderTop: '1px solid #333',
       fontSize: '1.2rem',
       color: '#b8860b',
       fontWeight: 'bold',
   };


   const vacio = {
       textAlign: 'center',
       color: '#888',
       fontSize: '1.2rem',
       marginTop: '4rem',
   };


   const getEstiloEstado = (estado) => {
       if (estado === 'pendiente') return { color: '#e3a020' };
       if (estado === 'en preparación') return { color: '#a0be94' };
       if (estado === 'listo') return { color: '#4caf50' };
       if (estado === 'entregado') return { color: '#888' };
       if (estado === 'cancelado') return { color: '#c0392b' };
       return { color: '#e3e0dd' };
   };


   return (
       <div style={main}>
           <Header />
           <div style={caja}>
               <h1 style={titulo}>Mis pedidos</h1>


               {flash?.success && (
                   <div style={mensajeExito}>
                       {flash.success}
                   </div>
               )}


               {pedidos.length === 0 ? (
                   <p style={vacio}>No tienes pedidos realizados.</p>
               ) : (
                   pedidos.map(pedido => (
                       <div key={pedido.id} style={tarjeta}>
                           <div style={cabecera}>
                               <span style={fecha}>
                                   {new Date(pedido.created_at).toLocaleDateString('es-ES', {
                                       day: '2-digit',
                                       month: 'long',
                                       year: 'numeric',
                                       hour: '2-digit',
                                       minute: '2-digit',
                                   })}
                               </span>
                               <span style={{ fontSize: '1.1rem', fontWeight: 'bold', ...getEstiloEstado(pedido.estado) }}>
                                   {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                               </span>
                           </div>


                           {pedido.platos.map(plato => (
                               <div key={plato.id} style={fila}>
                                   <span>{plato.nombre}</span>
                                   <span>x{plato.pivot.cantidad}</span>
                               </div>
                           ))}


                           <div style={totalEstilo}>
                               Total: {parseFloat(pedido.precio_total).toFixed(2)} €
                           </div>
                       </div>
                   ))
               )}
           </div>
           <Footer />
       </div>
   );
}




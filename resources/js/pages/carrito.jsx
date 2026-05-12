import { router } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCarrito } from '@/components/carritoComp';


export default function Carrito() {
   const { carrito, quitarDelCarrito, cambiarCantidad } = useCarrito();


   const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);


   const confirmarPedido = () => {
       if (carrito.length === 0) return;
       router.post('/pedidos', {
           platos: carrito.map(item => ({
               id: item.id,
               cantidad: item.cantidad,
               precio: item.precio,
           })),
           precio_total: total,
       });
   };


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


   const fila = {
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
       borderBottom: '1px solid #333',
       padding: '1rem 0',
       gap: '1rem',
   };


   const nombrePlato = {
       fontSize: '1.2rem',
       color: '#e3e0dd',
       flex: '1',
   };


   const precio = {
       fontSize: '1.2rem',
       color: '#b8860b',
       fontWeight: 'bold',
       whiteSpace: 'nowrap',
   };


   const totalEstilo = {
       display: 'flex',
       justifyContent: 'flex-end',
       marginTop: '2rem',
       fontSize: '1.5rem',
       color: '#e3e0dd',
       borderTop: '1px solid #444',
       paddingTop: '1rem',
   };


   const vacio = {
       textAlign: 'center',
       color: '#888',
       fontSize: '1.2rem',
       marginTop: '4rem',
   };


   const botonCantidad = {
       padding: '0.2rem 0.7rem',
       backgroundColor: 'transparent',
       border: '1px solid #444',
       color: '#e3e0dd',
       cursor: 'pointer',
       fontSize: '1.1rem',
       fontFamily: 'serif',
   };


   const botonEliminar = {
       padding: '0.3rem 0.8rem',
       backgroundColor: 'transparent',
       border: '1px solid #c0392b',
       color: '#c0392b',
       cursor: 'pointer',
       fontSize: '0.9rem',
       fontFamily: 'serif',
       borderRadius: '4px',
   };


   const botonConfirmar = {
       padding: '0.8rem 2rem',
       backgroundColor: 'transparent',
       border: '1px solid #a0be94',
       color: '#a0be94',
       fontSize: '1.1rem',
       fontFamily: 'serif',
       cursor: 'pointer',
       borderRadius: '4px',
   };


   return (
       <div style={main}>
           <Header />
           <div style={caja}>
               <h1 style={titulo}>Tu carrito</h1>


               {carrito.length === 0 ? (
                   <p style={vacio}>No tienes platos en el carrito.</p>
               ) : (
                   <>
                       {carrito.map(item => (
                           <div key={item.id} style={fila}>
                               <span style={nombrePlato}>{item.nombre}</span>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                   <button style={botonCantidad} onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>−</button>
                                   <span style={{ fontSize: '1.1rem', minWidth: '2rem', textAlign: 'center' }}>{item.cantidad}</span>
                                   <button style={botonCantidad} onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                               </div>
                               <span style={precio}>{(item.precio * item.cantidad).toFixed(2)} €</span>
                               <button style={botonEliminar} onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
                           </div>
                       ))}
                       <div style={totalEstilo}>
                           <span>Total: {total.toFixed(2)} €</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                           <button onClick={confirmarPedido} style={botonConfirmar}>
                               Confirmar pedido
                           </button>
                       </div>
                   </>
               )}
           </div>
           <Footer />
       </div>
   );
}



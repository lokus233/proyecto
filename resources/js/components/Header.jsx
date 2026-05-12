import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useCarrito } from '@/components/carritoComp';


function Header() {
   const { auth } = usePage().props;
   const usuario = auth?.user;
   const esAdmin = auth?.esAdmin;
   const [adminAbierto, setAdminAbierto] = useState(false);
   const { carrito } = useCarrito();
   const totalCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);


   const contenedorPrincipal = {
       width: '100%',
       fontFamily: 'serif',
       backgroundColor: 'black',
   };


   const banner = {
       height: '6rem',
       display: 'flex',
       alignItems: 'center',
       padding: '0 2rem',
   };


   const titulo = {
       fontSize: '2.25rem',
       fontWeight: '500',
       color: '#e3e0dd',
       margin: 0,
       flex: '0 1 auto',
   };


   const barraNav = {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       flex: '1',
       gap: '3.5rem',
   };


   const enlaces = {
       fontSize: '1.45rem',
       textDecoration: 'underline',
       color: '#e3e0dd',
   };


   const botonLogin = {
       fontSize: '1.5rem',
       color: '#e3e0dd',
       border: '1px solid #e3e0dd',
       padding: '0.4rem 1.2rem',
       borderRadius: '4px',
       textDecoration: 'none',
       flex: '0 1 auto',
       whiteSpace: 'nowrap',
       transition: 'background-color 0.2s, color 0.2s',
   };


   const nombreUsuario = {
       fontSize: '1.2rem',
       color: '#e3e0dd',
       flex: '0 1 auto',
   };


   const botonLogout = {
       fontSize: '1.15rem',
       color: '#e3e0dd',
       border: '1px solid #e3e0dd',
       padding: '0.4rem 1.2rem',
       borderRadius: '4px',
       textDecoration: 'none',
       flex: '0 1 auto',
       whiteSpace: 'nowrap',
       transition: 'background-color 0.2s, color 0.2s',
       cursor: 'pointer',
       background: 'none',
   };


   const botonAdmin = {
       fontSize: '1.15rem',
       color: '#a0be94',
       border: '1px solid #a0be94',
       padding: '0.4rem 1.2rem',
       borderRadius: '4px',
       whiteSpace: 'nowrap',
       cursor: 'pointer',
       background: 'none',
       fontFamily: 'serif',
   };


   const dropdown = {
       position: 'absolute',
       top: '100%',
       right: 0,
       backgroundColor: '#111',
       border: '1px solid #a0be94',
       borderRadius: '4px',
       display: 'flex',
       flexDirection: 'column',
       zIndex: 100,
       minWidth: '160px',
   };


   const enlaceDropdown = {
       padding: '0.7rem 1.2rem',
       color: '#e3e0dd',
       textDecoration: 'none',
       fontSize: '1rem',
       fontFamily: 'serif',
       borderBottom: '1px solid #222',
   };


   const botonCarrito = {
       fontSize: '1.15rem',
       color: '#e3e0dd',
       border: '1px solid #e3e0dd',
       padding: '0.4rem 1.2rem',
       borderRadius: '4px',
       whiteSpace: 'nowrap',
       cursor: 'pointer',
       background: 'none',
       fontFamily: 'serif',
       textDecoration: 'none',
   };


   let Logeo;
   if (usuario) {
       Logeo = (
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '0 1 auto' }}>
               {esAdmin && (
                   <div style={{ position: 'relative' }}>
                       <button
                           onClick={() => setAdminAbierto(!adminAbierto)}
                           style={botonAdmin}
                       >
                           Panel admin ▾
                       </button>
                       {adminAbierto && (
                           <div style={dropdown}>
                               <Link href="/platos" style={enlaceDropdown} onClick={() => setAdminAbierto(false)}>Platos</Link>
                               <Link href="/adminCategorias" style={enlaceDropdown} onClick={() => setAdminAbierto(false)}>Categorías</Link>
                               <Link href="/usuarios" style={enlaceDropdown} onClick={() => setAdminAbierto(false)}>Usuarios</Link>
                           </div>
                       )}
                   </div>
               )}
               <Link href="/carrito" style={botonCarrito}>
                   🛒 {totalCarrito}
               </Link>
               <span style={nombreUsuario}>{usuario.nombre}</span>
               <Link
                   href="/logout"
                   method="post"
                   as="button"
                   style={botonLogout}
               >
                   Cerrar sesión
               </Link>
           </div>
       );
   } else {
       Logeo = <Link href="/login" style={botonLogin}>Iniciar sesión</Link>;
   }


   return (
       <header style={contenedorPrincipal}>
           <div style={banner}>
               <h1 style={titulo}>El Candelabro</h1>
               <nav style={barraNav}>
                   <Link href="/" style={enlaces}>Inicio</Link>
                   <Link href="/carta" style={enlaces}>Carta</Link>
                   <Link href="/bodega" style={enlaces}>Bodega</Link>
                   <Link href="/reserva" style={enlaces}>Reserva</Link>
                   <Link href="/galeria" style={enlaces}>Galería</Link>
                   <Link href="/nosotros" style={enlaces}>Contacto</Link>
               </nav>
               {Logeo}
           </div>
       </header>
   );
}


export default Header;

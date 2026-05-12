import { router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


export default function AdminUsuariosEdit({ usuario, roles }) {
   const [datos, setDatos] = useState({
       nombre: usuario.nombre,
       apellidos: usuario.apellidos,
       email: usuario.email,
       telefono: usuario.telefono ?? '',
       roles: usuario.roles.map(r => r.id),
   });


   const handleChange = (e) => {
       setDatos({ ...datos, [e.target.name]: e.target.value });
   };


   const handleRol = (id) => {
       let nuevos;
       if (datos.roles.includes(id)) {
           nuevos = datos.roles.filter(r => r !== id);
       } else {
           nuevos = [...datos.roles, id];
       }
       setDatos({ ...datos, roles: nuevos });
   };


   const handleSubmit = (e) => {
       e.preventDefault();
       router.post(`/usuarios/${usuario.id}`, {
           ...datos,
           _method: 'PUT'
       }, {
           forceFormData: true,
       });
   };


   const main = { backgroundColor: 'black', color: '#e3e0dd', fontFamily: 'serif', minHeight: '100vh' };
   const caja = { maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' };
   const titulo = { fontSize: '2rem', fontStyle: 'italic', marginBottom: '2rem', color: '#e3e0dd' };
   const label = { display: 'block', marginBottom: '0.4rem', fontSize: '1.2rem', color: '#e3e0dd' };
   const input = { width: '100%', backgroundColor: '#111', border: '1px solid #444', borderRadius: '4px', padding: '0.6rem 0.9rem', color: '#e3e0dd', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'serif' };
   const botonGuardar = { padding: '0.7rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #e3e0dd', borderRadius: '4px', color: '#e3e0dd', fontSize: '1rem', fontFamily: 'serif', cursor: 'pointer' };
   const botonCancelar = { padding: '0.7rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #444', borderRadius: '4px', color: '#888', fontSize: '1rem', fontFamily: 'serif', textDecoration: 'none', display: 'inline-block' };


   return (
       <div style={main}>
           <Header />
           <div style={caja}>
               <h1 style={titulo}>Editar usuario</h1>


               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                   <div>
                       <label style={label}>Nombre</label>
                       <input name="nombre" value={datos.nombre} onChange={handleChange} required style={input} />
                   </div>


                   <div>
                       <label style={label}>Apellidos</label>
                       <input name="apellidos" value={datos.apellidos} onChange={handleChange} required style={input} />
                   </div>


                   <div>
                       <label style={label}>Email</label>
                       <input name="email" type="email" value={datos.email} onChange={handleChange} required style={input} />
                   </div>


                   <div>
                       <label style={label}>Teléfono</label>
                       <input name="telefono" value={datos.telefono} onChange={handleChange} style={input} />
                   </div>


                   <div>
                       <label style={label}>Roles</label>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                           {roles.map(rol => (
                               <button
                                   key={rol.id}
                                   type="button"
                                   onClick={() => handleRol(rol.id)}
                                   style={{
                                       padding: '0.3rem 0.8rem',
                                       borderRadius: '4px',
                                       fontSize: '0.95rem',
                                       cursor: 'pointer',
                                       fontFamily: 'serif',
                                       border: datos.roles.includes(rol.id)
                                           ? '1px solid #a0be94'
                                           : '1px solid #444',
                                       backgroundColor: datos.roles.includes(rol.id)
                                           ? '#1a2e1a'
                                           : 'transparent',
                                       color: datos.roles.includes(rol.id)
                                           ? '#a0be94'
                                           : '#888',
                                   }}
                               >
                                   {rol.nombre}
                               </button>
                           ))}
                       </div>
                   </div>


                   <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                       <button type="submit" style={botonGuardar}>Guardar cambios</button>
                       <a href="/usuarios" style={botonCancelar}>Cancelar</a>
                   </div>
               </form>
           </div>
       </div>
   );
}

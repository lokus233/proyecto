import { router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


export default function AdminCategoriasEdit({ categoria }) {
   const [datos, setDatos] = useState({
       nombre: categoria.nombre,
       descripcion: categoria.descripcion ?? '',
       imagen: null,
   });


   const handleChange = (e) => {
       setDatos({ ...datos, [e.target.name]: e.target.value });
   };


   const handleSubmit = (e) => {
       e.preventDefault();
       router.post(`/categorias/${categoria.id}`, { ...datos, _method: 'PUT' }, {
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
               <h1 style={titulo}>Editar categoría</h1>


               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                   <div>
                       <label style={label}>Nombre</label>
                       <input name="nombre" value={datos.nombre} onChange={handleChange} required style={input} />
                   </div>


                   <div>
                       <label style={label}>Descripción</label>
                       <textarea name="descripcion" value={datos.descripcion} onChange={handleChange} rows={3} style={{ ...input, resize: 'vertical' }} />
                   </div>


                   <div>
                       <label style={label}>Imagen actual</label>
                       {categoria.imagen && <img src={`/storage/${categoria.imagen}`} alt={categoria.nombre} style={{ width: '150px', borderRadius: '4px', marginBottom: '0.5rem', display: 'block' }} />}
                       <input name="imagen" type="file" accept="image/*" onChange={(e) => setDatos({ ...datos, imagen: e.target.files[0] })} style={input} />
                   </div>


                   <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                       <button type="submit" style={botonGuardar}>Guardar cambios</button>
                       <a href="/adminCategorias" style={botonCancelar}>Cancelar</a>
                   </div>
               </form>
           </div>
       </div>
   );
}

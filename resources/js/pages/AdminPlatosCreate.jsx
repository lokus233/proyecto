import { router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';


const ALERGENOS_DISPONIBLES = [
   'Gluten', 'Lácteos', 'Huevo', 'Pescado', 'Moluscos',
   'Crustáceos', 'Sésamo', 'Soja', 'Frutos secos', 'Mostaza', 'Sulfitos'
];


export default function AdminPlatosCreate({ categorias }) {
   const [datos, setDatos] = useState({
       nombre: '',
       descripcion: '',
       precio: '',
       alergenos: [],
       imagen: null,
       categoria_id: '',
   });


   const handleChange = (e) => {
       setDatos({ ...datos, [e.target.name]: e.target.value });
   };


   const handleAlergeno = (alergeno) => {
       let nuevos;
       if (datos.alergenos.includes(alergeno)) {
           nuevos = datos.alergenos.filter(a => a !== alergeno);
       } else {
           nuevos = [...datos.alergenos, alergeno];
       }
       setDatos({ ...datos, alergenos: nuevos });
   };


   const handleSubmit = (e) => {
       e.preventDefault();
       router.post('/platos', {
           ...datos,
           alergenos: datos.alergenos.join(', '),
       }, {
           forceFormData: true,
       });
   };


   const main = {
       backgroundColor: 'black',
       color: '#e3e0dd',
       fontFamily: 'serif',
       minHeight: '100vh',
   };


   const caja = {
       maxWidth: '600px',
       margin: '0 auto',
       padding: '3rem 2rem',
   };


   const titulo = {
       fontSize: '2rem',
       fontStyle: 'italic',
       marginBottom: '2rem',
       color: '#e3e0dd',
   };


   const label = {
       display: 'block',
       marginBottom: '0.4rem',
       fontSize: '1.2rem',
       color: '#e3e0dd',
   };


   const input = {
       width: '100%',
       backgroundColor: '#111',
       border: '1px solid #444',
       borderRadius: '4px',
       padding: '0.6rem 0.9rem',
       color: '#e3e0dd',
       fontSize: '1rem',
       outline: 'none',
       boxSizing: 'border-box',
       fontFamily: 'serif',
   };


   const botonGuardar = {
       padding: '0.7rem 1.5rem',
       backgroundColor: 'transparent',
       border: '1px solid #e3e0dd',
       borderRadius: '4px',
       color: '#e3e0dd',
       fontSize: '1rem',
       fontFamily: 'serif',
       cursor: 'pointer',
       transition: 'background-color 0.2s, color 0.2s',
   };


   const botonCancelar = {
       padding: '0.7rem 1.5rem',
       backgroundColor: 'transparent',
       border: '1px solid #444',
       borderRadius: '4px',
       color: '#888',
       fontSize: '1rem',
       fontFamily: 'serif',
       textDecoration: 'none',
       display: 'inline-block',
       cursor: 'pointer',
   };


   return (
       <div style={main}>
           <Header />
           <div style={caja}>
               <h1 style={titulo}>Añadir plato</h1>


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
                       <label style={label}>Precio (€)</label>
                       <input name="precio" type="number" step="0.01" value={datos.precio} onChange={handleChange} required style={input} />
                   </div>


                   <div>
                       <label style={label}>Alérgenos</label>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                           {ALERGENOS_DISPONIBLES.map(alergeno => (
                               <button
                                   key={alergeno}
                                   type="button"
                                   onClick={() => handleAlergeno(alergeno)}
                                   style={{
                                       padding: '0.3rem 0.8rem',
                                       borderRadius: '4px',
                                       fontSize: '0.95rem',
                                       cursor: 'pointer',
                                       fontFamily: 'serif',
                                       border: datos.alergenos.includes(alergeno)
                                           ? '1px solid #a0be94'
                                           : '1px solid #444',
                                       backgroundColor: datos.alergenos.includes(alergeno)
                                           ? '#1a2e1a'
                                           : 'transparent',
                                       color: datos.alergenos.includes(alergeno)
                                           ? '#a0be94'
                                           : '#888',
                                   }}
                               >
                                   {alergeno}
                               </button>
                           ))}
                       </div>
                   </div>


                   <div>
                       <label style={label}>Imagen</label>
                       <input
                           name="imagen"
                           type="file"
                           accept="image/*"
                           onChange={(e) => setDatos({ ...datos, imagen: e.target.files[0] })}
                           style={input}
                       />
                   </div>


                   <div>
                       <label style={label}>Categoría</label>
                       <select name="categoria_id" value={datos.categoria_id} onChange={handleChange} required style={input}>
                           <option value="">Selecciona una categoría</option>
                           {categorias.map((cat) => (
                               <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                           ))}
                       </select>
                   </div>


                   <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                       <button type="submit" style={botonGuardar}>Guardar</button>
                       <a href="/platos" style={botonCancelar}>Cancelar</a>
                   </div>
               </form>
           </div>
       </div>
   );
}




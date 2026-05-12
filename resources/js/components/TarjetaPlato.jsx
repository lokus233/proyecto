const ALERGENOS = {
   'Gluten': '/gluten.png',
   'Lácteos': '/lacteos.png',
   'Huevo': '/huevos.png',
   'Pescado': '/pescado.png',
   'Moluscos': '/moluscos.png',
   'Crustáceos': '/crustaceos.png',
   'Sésamo': '/sesamo.png',
   'Soja': '/soja.png',
   'Frutos secos': '/frutos-cascaras.png',
   'Mostaza': '/mostaza.png',
   'Sulfitos': '/sulfitos.png',
};


export default function TarjetaPlato({ id, nombre, descripcion, precio, alergenos, onAdd }) {
   const tarjeta = {
       borderTop: '1px dashed #ccc',
       padding: '1rem 0',
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'flex-start',
       gap: '1rem',
   };
   const nombreEstilo = {
       fontSize: '1.8rem',
       fontWeight: 'bold',
       color: '#1a1a1a',
       fontFamily: 'serif',
   };
   const descripcionEstilo = {
       fontSize: '1.5rem',
       color: '#666',
       fontStyle: 'italic',
   };
   const precioEstilo = {
       color: '#b8860b',
       fontWeight: 'bold',
       fontSize: '1.3rem',
       whiteSpace: 'nowrap',
   };
   const alergenosContenedor = {
       display: 'flex',
       gap: '0.4rem',
       marginTop: '0.4rem',
       flexWrap: 'wrap',
   };
   const boton = {
       marginTop: '0.8rem',
       padding: '0.4rem 1rem',
       borderRadius: '6px',
       border: 'none',
       cursor: 'pointer',
       backgroundColor: '#534b4b',
       color: 'white',
       fontSize: '1.2rem',
   };


   const listaAlergenos = alergenos
       ? alergenos.split(',').map(a => a.trim()).filter(a => ALERGENOS[a])
       : [];


   return (
       <div style={tarjeta}>
           <div>
               <p style={nombreEstilo}>{nombre}</p>
               {descripcion && (
                   <p style={descripcionEstilo}>{descripcion}</p>
               )}
               {listaAlergenos.length > 0 && (
                   <div style={alergenosContenedor}>
                       {listaAlergenos.map(alergeno => (
                           <img
                               key={alergeno}
                               src={ALERGENOS[alergeno]}
                               alt={alergeno}
                               title={alergeno}
                               style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                           />
                       ))}
                   </div>
               )}
               {onAdd && (
                   <button
                       style={boton}
                       onClick={() => onAdd({ id, nombre, precio, descripcion, alergenos })}
                   >
                       Añadir al carrito
                   </button>
               )}
           </div>
           <span style={precioEstilo}>{precio} €</span>
       </div>
   );
}

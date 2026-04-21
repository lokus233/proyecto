export default function TarjetaPlato({ nombre, descripcion, precio }) {

    const tarjeta = {
        borderTop: '1px dashed #ccc',
        gap: '0.5rem',
    };

    const nombreEstilo = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1a1a1a',
        fontFamily: 'serif'
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
    };

    return (
        <div style={tarjeta}>
            <div>
                <p style={nombreEstilo}>{nombre}</p>
                {descripcion && (
                    <p style={descripcionEstilo}>{descripcion}</p>
                )}
            </div>
            <span style={precioEstilo}>{precio} €</span>
        </div>
    );
}

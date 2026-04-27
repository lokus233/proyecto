import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminPlatos({ platos }) {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const categorias = [...new Set(platos.map(p => p.categoria?.nombre).filter(Boolean))];

    let platosFiltrados;
    if (categoriaSeleccionada) {
        platosFiltrados = platos.filter(p => p.categoria?.nombre === categoriaSeleccionada);
    } else {
        platosFiltrados = platos;
    }

    const eliminar = (id) => {
        if (confirm('¿Seguro que quieres eliminar este plato?')) {
            router.delete(`/platos/${id}`);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'sans-serif', padding: '2rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', color: '#1a1a1a' }}>Gestión de platos</h1>
                    <Link
                        href="/platos/create"
                        style={{
                            backgroundColor: '#1a1a1a',
                            color: 'white',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                        }}
                    >
                        + Añadir plato
                    </Link>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '0.95rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
                            <th style={th}>Nombre</th>
                            <th style={th}>Categoría</th>
                            <th style={th}>Precio</th>
                            <th style={th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platosFiltrados.map((plato) => (
                            <tr key={plato.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={td}>{plato.nombre}</td>
                                <td style={td}>{plato.categoria?.nombre ?? '—'}</td>
                                <td style={td}>{plato.precio} €</td>
                                <td style={{ ...td, display: 'flex', gap: '0.5rem' }}>
                                    <Link href={`/platos/${plato.id}`} style={botonVer}>Ver</Link>
                                    <Link href={`/platos/${plato.id}/edit`} style={botonEditar}>Editar</Link>
                                    <button onClick={() => eliminar(plato.id)} style={botonEliminar}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {platosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                    No hay platos en esta categoría.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const th = { padding: '1rem', textAlign: 'left', fontSize: '0.9rem', fontWeight: '600' };
const td = { padding: '0.9rem 1rem', fontSize: '0.95rem', color: '#333' };
const botonVer = { padding: '0.35rem 0.8rem', backgroundColor: '#e8e8e8', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', color: '#333' };
const botonEditar = { padding: '0.35rem 0.8rem', backgroundColor: '#d4edda', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', color: '#155724' };
const botonEliminar = { padding: '0.35rem 0.8rem', backgroundColor: '#f8d7da', borderRadius: '4px', border: 'none', fontSize: '0.85rem', color: '#721c24', cursor: 'pointer' };

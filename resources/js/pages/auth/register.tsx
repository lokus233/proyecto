import { Form, Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    const contenedor = {
        minHeight: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
        color: '#e3e0dd',
    };

    const caja = {
        width: '100%',
        maxWidth: '560px',
        padding: '4rem 3.5rem',
        border: '1px solid #444',
        borderRadius: '8px',
    };

    const titulo = {
        fontSize: '2.8rem',
        fontStyle: 'italic',
        marginBottom: '0.5rem',
        textAlign: 'center' as const,
    };

    const subtitulo = {
        fontSize: '1.1rem',
        color: '#888',
        textAlign: 'center' as const,
        marginBottom: '2.5rem',
    };

    const labelEstilo = {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '1.1rem',
        color: '#e3e0dd',
    };

    const input = {
        width: '100%',
        backgroundColor: '#111',
        border: '1px solid #444',
        borderRadius: '4px',
        padding: '0.85rem 1.1rem',
        color: '#e3e0dd',
        fontSize: '1.1rem',
        outline: 'none',
        boxSizing: 'border-box' as const,
    };

    const boton = {
        width: '100%',
        marginTop: '1.5rem',
        padding: '0.9rem',
        backgroundColor: 'transparent',
        border: '1px solid #e3e0dd',
        borderRadius: '4px',
        color: '#e3e0dd',
        fontSize: '1.15rem',
        fontFamily: 'serif',
        cursor: 'pointer',
        transition: 'background-color 0.2s, color 0.2s',
    };

    const enlace = {
        color: '#a0be94',
        textDecoration: 'underline',
        cursor: 'pointer',
    };

    return (
        <>
            <Head title="Registro" />
            <div style={contenedor}>
                <div style={caja}>
                    <h1 style={titulo}>El Candelabro</h1>
                    <p style={subtitulo}>Crea tu cuenta</p>

                    <Form
                        action="/register"
                        method="post"
                        resetOnSuccess={['password', 'password_confirmation']}
                        className=""
                    >
                        {({ processing, errors }) => (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={labelEstilo}>Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        required
                                        autoFocus
                                        autoComplete="given-name"
                                        placeholder="Tu nombre"
                                        style={input}
                                    />
                                    <InputError message={errors.nombre} />
                                </div>

                                <div>
                                    <label style={labelEstilo}>Apellidos</label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        required
                                        autoComplete="family-name"
                                        placeholder="Tus apellidos"
                                        style={input}
                                    />
                                    <InputError message={errors.apellidos} />
                                </div>

                                <div>
                                    <label style={labelEstilo}>Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="email@ejemplo.com"
                                        style={input}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <label style={labelEstilo}>Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        autoComplete="tel"
                                        placeholder="600 000 000"
                                        style={input}
                                    />
                                    <InputError message={errors.telefono} />
                                </div>

                                <div>
                                    <label style={labelEstilo}>Contraseña</label>
                                    <PasswordInput
                                        name="password"
                                        required
                                        autoComplete="new-password"
                                        placeholder="Contraseña"
                                        style={input}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div>
                                    <label style={labelEstilo}>Confirmar contraseña</label>
                                    <PasswordInput
                                        name="password_confirmation"
                                        required
                                        autoComplete="new-password"
                                        placeholder="Repite la contraseña"
                                        style={input}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <button type="submit" style={boton} disabled={processing}>
                                    {processing && <Spinner />}
                                    Crear cuenta
                                </button>

                                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                                    ¿Ya tienes cuenta?{' '}
                                    <Link href="/login" style={enlace}>
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

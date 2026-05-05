import { Form, Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    estado?: string;
    ResetContraseña: boolean;
    Registro: boolean;
};

export default function Login({ estado, ResetContraseña, Registro }: Props) {
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
            <Head title="Iniciar sesión" />
            <div style={contenedor}>
                <div style={caja}>
                    <h1 style={titulo}>El Candelabro</h1>
                    <p style={subtitulo}>Inicia sesión en tu cuenta</p>

                    {estado && (
                        <p style={{ color: '#a0be94', textAlign: 'center', marginBottom: '1rem' }}>
                            {estado}
                        </p>
                    )}

                    <Form
                        action="/login"
                        method="post"
                        resetOnSuccess={['password']}
                        className=""
                    >
                        {({ processing, errors }) => (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={labelEstilo}>Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        pattern="^(.+@.+\.[a-zA-Z]{2,3})$"
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="email@ejemplo.com"
                                        style={input}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                        <label style={{ ...labelEstilo, marginBottom: 0 }}>Contraseña</label>
                                        {ResetContraseña && (
                                            <Link href="/forgot-password" style={{ ...enlace, fontSize: '0.85rem' }}>
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>
                                    <PasswordInput
                                        name="password"
                                        required
                                        minLength={6}
                                        maxLength={25}
                                        autoComplete="current-password"
                                        placeholder="Contraseña"
                                        style={input}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <button type="submit" style={boton} disabled={processing}>
                                    {processing && <Spinner />}
                                    Iniciar sesión
                                </button>

                                {Registro && (
                                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888', marginTop: '0.5rem' }}>
                                        ¿No tienes cuenta?{' '}
                                        <Link href="/register" style={enlace}>
                                            Regístrate
                                        </Link>
                                    </p>
                                )}
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState(''); // Nuevo estado para el nombre de usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('https://solargauge-auth-service-325305452074.us-central1.run.app/api/v1/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json', // Asegúrate de incluir el encabezado de aceptación
                },
                body: JSON.stringify({ username, email, password }), // Incluye el username
            });

            const data = await response.json();
            
            if (response.ok) {
                // Redirigir a la página de login
                navigate('/login');
            } else {
                setError(data.message || 'Error en el registro');
            }
        } catch (err) {
            setError('Error en el servidor, intenta más tarde.');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-gray-700">Regístrate</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                            Registrarse
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta? 
                    <a href="/login" className="text-blue-500 hover:underline"> Inicia sesión aquí</a>.
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

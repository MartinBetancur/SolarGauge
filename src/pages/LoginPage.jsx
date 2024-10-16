import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8001/api/v1/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.access_token); // Cambiado a access_token
                navigate(`/${data.user_id}`); // Redireccionar a /id
            } else {
                setError(data.message || 'Error en el inicio de sesión');
            }
        } catch (err) {
            setError('Error en el servidor, intenta más tarde.');
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Fondo degradado y blur similar al layout principal */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"/>
                <div className="absolute inset-0 backdrop-blur-sm"/>
            </div>

            {/* Contenedor del formulario */}
            <div className="relative z-10 w-full max-w-lg p-8 space-y-6 bg-gray-800 bg-opacity-80 rounded-xl shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-100">Iniciar Sesión</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text" // Cambiar de "username" a "text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-400">
                    ¿No tienes una cuenta?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

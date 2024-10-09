import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importa la página de login
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Ruta para el login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/*ruta para register*/}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Redireccionar a /login si la ruta no coincide */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Ruta para manejar páginas no encontradas (404) */}
                    <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;




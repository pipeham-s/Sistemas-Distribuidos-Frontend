import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importa la página de login
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import MisClasesPage from './pages/MisClasesPage';
import AdminPage from './pages/AdminPage';
import Chat from './pages/Chat';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Ruta para el login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Ruta para el login */}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Ruta para el login */}
                    <Route path="/home" element={<Home />} />
                    
                    <Route path="/mis-clases" element={<MisClasesPage />} />

                    <Route path="/admin" element={<AdminPage />} /> {/* Nueva ruta */}

                    <Route path="/sala_chat" element={<Chat />} />



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




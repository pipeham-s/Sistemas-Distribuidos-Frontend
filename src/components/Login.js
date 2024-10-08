import React from 'react';
import './Login.css'; // Importar los estilos de CSS

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingrese su correo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    <button type="button" className="btn-login">Iniciar Sesión</button>
                    <div className="login-links">
                        <a href="#" className="forgot-link">Olvidé mi contraseña</a>
                        <a href="#" className="signup-link">Crear una cuenta</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realiza la solicitud al backend
        axios.get('http://localhost:8080/api/test') // Cambia esta URL si tu backend está en otro puerto
            .then((response) => {
                console.log('Respuesta exitosa del servidor:', response.data);
                setData(response.data); // Guarda la respuesta en el estado
            })
            .catch((error) => {
                console.error('Error en el fetch:', error);
                setError(error.message); // Guarda el mensaje de error en el estado
            });
    }, []);

    return (
        <div>
            <h1>Conexión Backend-Frontend</h1>
            {data ? <p>Respuesta del servidor: {data.message}</p> : <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default App;

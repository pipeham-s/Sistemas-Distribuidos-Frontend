import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza el fetch al backend en la ruta "/api/test"
    fetch('http://localhost:8080/api/test')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.text(); // Ya que el servidor responde con texto plano
      })
      .then((data) => {
        console.log('Respuesta exitosa del servidor:', data);
        setData(data); // Guarda los datos en el estado
      })
      .catch((error) => {
        console.error('Error en el fetch:', error);
        setError(error.message);
      });
  }, []);
  

  return (
    <div>
      <h1>Conexión Backend-Frontend</h1>
      {data ? <p>Respuesta del servidor: {data.message}</p> : <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;

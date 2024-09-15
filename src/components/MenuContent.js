import React from 'react';

const MenuContent = ({ activeSection }) => {
  const content = {
    'Habilitar Usuarios Oferentes': (
      <div>
        <h2 className="text-3xl font-semibold">Habilitar UO</h2>
        <div className="space-y-4 mt-4">
          {/* Reemplazar con datos dinámicos */}
          <div className="p-4 bg-white rounded shadow-md flex flex-col sm:flex-row items-center sm:items-start">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="text-xl font-medium">Lucas Formento - Servicios de electricidad</h3>
              <p className="text-gray-600">correo: lucasf@correo.um.edu.uy</p>
              <p className="text-gray-600">Dirección: Calcagno 7322</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:ml-auto sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0">
              <button className="bg-green-500 text-black px-4 py-2 rounded">Habilitar</button>
              <button className="bg-red-500 text-black px-4 py-2 rounded">Rechazar</button>
            </div>
          </div>
          {/* Más bloques como el anterior */}
        </div>
      </div>
    ),
    'Crear Usuarios': <h2 className="text-3xl font-semibold">Crear Usuarios</h2>,
    'Eliminar Usuarios': <h2 className="text-3xl font-semibold">Eliminar Usuarios</h2>,
    'Gestionar Usuarios': <h2 className="text-3xl font-semibold">Gestionar Usuarios</h2>,
    'Monitoreo': <h2 className="text-3xl font-semibold">Monitoreo</h2>,
    'Gestion de Servicios': <h2 className="text-3xl font-semibold">Gestion de Servicios</h2>,
    'Sanciones': <h2 className="text-3xl font-semibold">Sanciones</h2>,
    'Auditoria de Cambios' : <h2 className="text-3xl font-semibold">Auditoria de Cambios</h2>,
    'Borrar Comentarios': <h2 className="text-3xl font-semibold">Borrar Comentarios</h2>,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {content[activeSection] || <p>Seleccione una opción del menú.</p>}
    </div>
  );
};

export default MenuContent;

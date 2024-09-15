import React from 'react';

const Menu = ({ setActiveSection }) => {
  const menuItems = [
    'Habilitar Usuarios Oferentes',
    'Crear Usuarios',
    'Eliminar Usuarios',
    'Gestionar Usuarios',
    'Monitoreo',
    'Gestion de Servicios',
    'Sanciones',
    'Auditoria de Cambios',
    'Borrar Comentarios'
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              className="w-full text-left text-gray-700 hover:text-black hover:underline focus:outline-none"
              onClick={() => setActiveSection(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

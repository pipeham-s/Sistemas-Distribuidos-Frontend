import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between md:justify-center space-y-6 ml-2 mr-2 md:space-y-0 md:space-x-32">
        
        {/* Información de contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <p>Teléfono: +598 26001234</p>
          <p>Email: <span className="text-blue-400">servihogar@gmail.com</span></p>
          <p>WhatsApp: +598 92 781 456</p>
        </div>
        
        {/* Redes sociales con dos columnas, centradas */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
          <div className="flex justify-center space-x-20">
            <div className="space-y-2">
              <div className="flex items-center">
                <FaInstagram size={24} className="text-pink-500 mr-2" />
                <span>serviHogar</span>
              </div>
              <div className="flex items-center">
                <FaTwitter size={24} className="text-blue-400 mr-2" />
                <span>ServiHogar</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaFacebookF size={24} className="text-blue-600 mr-2" />
                <span>ServiHogar Uruguay</span>
              </div>
              <div className="flex items-center">
                <FaTiktok size={24} className="text-black mr-2" />
                <span>ServiHogarUy</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enlace a Términos y Condiciones */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Enlaces Rápidos</h4>
          <span className="text-gray-400">Términos y Condiciones</span>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p>&copy; 2024 ServiHogar. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;


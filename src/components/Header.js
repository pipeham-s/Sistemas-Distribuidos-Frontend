import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../images/logo_serviHogar.png";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

function Header({ showBackButton, page }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(UserContext);
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "")

  const handleLogout = () => {
    logout();
    navigate("/"); //redirigir al home
  };

  const renderButton = () => {
    if (isAuthenticated) {
      // Always show "Cerrar Sesión" button when authenticated
      return (
        <div className="flex space-x-4">
          {/* Show "Mi Perfil" unless on the /demandante page */}
          {currentPage !== "demandante" && (
            <Button type="darkBlue" onClick={() => navigate("/demandante")}>
              Mi Perfil
            </Button>
          )}
          <Button type="darkBlue" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      );
    } else {
      // Show other buttons based on the page if not authenticated
      switch (currentPage) {
        case "register":
          return (
            <Button type="darkBlue" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          );
        case "login":
          return (
            <Button type="darkBlue" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          );
        case "home":
          return (
            <Button type="darkBlue" onClick={() => navigate("/login")}>
              Registrarse/Entrar
            </Button>
          );
        default:
          return (
            <Button type="darkBlue" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          );
      }
    }
  };
  

  return (
    <header className="bg-white w-full p-4 shadow-md">
      <div className="flex items-center overflow-x-auto no-scrollbar">
        {/* Logo y Título clicable que llevan a la página de inicio */}
        <Link to="/" className="flex items-center space-x-3 mr-20">
          <img src={logoImage} alt="Logo" className="h-12 w-12" />
          <span className="text-2xl font-bold text-gray-800">ServiHogar</span>
        </Link>

        {/* Menú con elementos que se mantendrán en una línea */}
        <div className="ml-auto flex space-x-6 whitespace-nowrap">
          {showBackButton && (
            <a href="#back" className="text-gray-800 hover:text-gray-600">
              Atrás
            </a>
          )}
          <a href="#contact" className="text-gray-800 hover:text-gray-600">
            Contáctanos
          </a>
          <a href="#about" className="text-gray-800 hover:text-gray-600">
            Quiénes somos
          </a>
          {renderButton()}
        </div>
      </div>
    </header>
  );
}

export default Header;

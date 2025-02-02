import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuAdmin: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hook para obter a localização atual

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para determinar se o link é ativo
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Avisos</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
          <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
            Dashboard
          </Link>
          <Link to="/usuarios" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/usuarios')}`}>
            Usuários
          </Link>
          <Link to="/categorias" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/categorias')}`}>
            Categorias
          </Link>
          <Link to="/logout" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/logout')}`}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MenuAdmin;
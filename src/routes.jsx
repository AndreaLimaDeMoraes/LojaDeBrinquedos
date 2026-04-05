import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import das suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import BrandCarousel from './pages/Marcas/BrandCarousel';

// Componente de proteção de rota
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const MainRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/produtos/:categoriaId" element={<Catalog />} />
	  <Route path="/marcas" element={<BrandCarousel />} />

      {/* Exemplo de Rota Privada (Dashboard do Admin) */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute>
            <div style={{ padding: '20px' }}><h1>Painel do Admin</h1></div>
          </PrivateRoute>
        } 
      />

      {/* Rota padrão para erros 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;





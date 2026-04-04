import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import das suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Produtos from './pages/Produtos'; // Substitua o Catalog por Produtos
import AdminPage from './pages/AdminPage';
import Sobre from './pages/Sobre/Sobre';
import Register from './pages/Register';

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
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/register" element={<Register/>} />
      
      {/* MUDANÇA AQUI: Rota limpa, sem o /:categoriaId */}
      <Route path="/produtos" element={<Produtos />} />

      {/* Rota Privada (Dashboard do Admin) */}
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminPage />
        </PrivateRoute>
      } />

      {/* Rota padrão para erros 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;
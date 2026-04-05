import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes'; // Importa o componente de rotas
import ScrollToTop from './components/Utilitarios/ScrollToTop'; // Importa o componente para resetar o scroll
import './App.css';

function App() {
  return (
    <Router> {/* Rotas do React Router (no arquivo src/routes.jsx) */}
      <ScrollToTop />
      <MainRoutes />
    </Router>
  );
}

export default App;
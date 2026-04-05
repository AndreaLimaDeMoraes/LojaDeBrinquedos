import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes'; // Importa o componente de rotas
import './App.css';

function App() {
  return (
    <Router> {/* Rotas do React Router (no arquivo src/routes.jsx) */}
      <MainRoutes />
    </Router>
  );
}

export default App;
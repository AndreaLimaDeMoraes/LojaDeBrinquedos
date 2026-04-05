import React, { useState } from 'react';
import "../components/Admin/Admin.css";
import AdminCategorias from '../components/Admin/AdminCategorias';
import AdminMarcas from '../components/Admin/AdminMarcas';
import AdminBrinquedos from '../components/Admin/AdminBrinquedos';
import AdminUsuarios from '../components/Admin/AdminUsuarios';

const AdminPage = () => {
  // Estado para saber qual aba está ativa
  const [abaAtiva, setAbaAtiva] = useState('categorias');

  // Função para renderizar o componente baseado na escolha do menu
  const renderizarComponente = () => {
    switch (abaAtiva) {
      case 'categorias': return <AdminCategorias />;
      case 'marcas': return <AdminMarcas />;
      case 'brinquedos': return <AdminBrinquedos />;
      case 'usuarios': return <AdminUsuarios />;
      default: return <AdminCategorias />;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Administração</h2>
        <button 
          className={`nav-button ${abaAtiva === 'categorias' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('categorias')}
        >
          1 - Categorias
        </button>
        <button 
          className={`nav-button ${abaAtiva === 'marcas' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('marcas')}
        >
          2 - Marcas
        </button>
        <button 
          className={`nav-button ${abaAtiva === 'brinquedos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('brinquedos')}
        >
          3 - Brinquedos
        </button>
        <button 
          className={`nav-button ${abaAtiva === 'usuarios' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('usuarios')}
        >
          4 - Usuários
        </button>
      </aside>

      <main className="main-content">
        <div className="content-card">
          {renderizarComponente()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
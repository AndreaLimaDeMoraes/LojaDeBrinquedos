import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando para navegação
import { FaHome } from 'react-icons/fa'; // Ícone de casinha
import "../components/Admin/Admin.css";
import AdminCategorias from '../components/Admin/AdminCategorias';
import AdminMarcas from '../components/Admin/AdminMarcas';
import AdminBrinquedos from '../components/Admin/AdminBrinquedos';
import AdminUsuarios from '../components/Admin/AdminUsuarios';

const AdminPage = () => {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('categorias');

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
        <div>
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
        </div>

        {/* BOTÃO DE VOLTAR NA SIDEBAR */}
        <button className="sidebar-back-button" onClick={() => navigate('/')}>
          <FaHome /> Voltar para o Site
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
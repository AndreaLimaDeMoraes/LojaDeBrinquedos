import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      // O seu controller exige @PreAuthorize("hasRole('ADMIN')")
      // Certifique-se que o seu serviço de api.js anexa o Token JWT no header
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      alert("Você não tem permissão de Administrador ou sua sessão expirou.");
    } finally {
      setCarregando(false);
    }
  };

  const handleDeletar = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja remover o usuário ${nome}?`)) {
      try {
        await api.delete(`/usuarios/${id}`);
        setUsuarios(usuarios.filter(u => u.id !== id));
        alert("Usuário removido com sucesso!");
      } catch (err) {
        alert("Erro ao deletar usuário. Verifique suas permissões.");
      }
    }
  };

  const usuariosFiltrados = usuarios.filter(u => 
    u.username.toLowerCase().includes(busca.toLowerCase()) || 
    u.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="admin-container">
      <div className="header-row">
        <h1>Gerenciar Usuários</h1>
        <span className="badge-count">{usuariosFiltrados.length} usuários</span>
      </div>

      <div className="controls-group">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Pesquisar por nome ou e-mail..." 
          value={busca} 
          onChange={e => setBusca(e.target.value)} 
        />
      </div>

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : (
        <div className="items-container">
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map(user => (
              <div key={user.id} className="item-row">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>{user.username}</strong>
                    <p>{user.email}</p>
                    <span className={`role-tag ${user.role?.toLowerCase()}`}>
                      {user.role || 'USER'}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="btn-action btn-del" 
                  onClick={() => handleDeletar(user.id, user.username)}
                  title="Excluir Usuário"
                >
                  Excluir
                </button>
              </div>
            ))
          ) : (
            <p className="empty-msg">Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;
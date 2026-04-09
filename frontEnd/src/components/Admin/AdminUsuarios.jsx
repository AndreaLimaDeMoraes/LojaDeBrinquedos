import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const AdminUsuarios = () => {
  const navigate = useNavigate();
  const [modo, setModo] = useState("lista");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
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

  const handleSalvar = async () => {

    // validação username
  if(!usuarioSelecionado.username){
    alert("Nome de usuário é obrigatório")
    return
  }

  // validação email
  if(!usuarioSelecionado.email){
    alert("Email é obrigatório")
    return
  }

  if(!usuarioSelecionado.email.includes("@")){
    alert("Email inválido")
    return
  }

  try {

    await api.put(`/usuarios/${usuarioSelecionado.id}`, usuarioSelecionado)

    alert("Usuário atualizado com sucesso!")

    setModo("lista")
    carregarUsuarios()

  } catch (err) {

    if(err.response){
      alert(err.response.data)
    }else{
      alert("Erro ao atualizar usuário.")
    }

  }
}


  if(modo === "editar"){
  return (

    <div className="form-container">

      <h2>Editar Usuário</h2>

      <div className="form-group">
        <label>Username</label>

        <input
          type="text"
          className="toy-input"
          value={usuarioSelecionado.username}
          onChange={(e)=>setUsuarioSelecionado({
            ...usuarioSelecionado,
            username:e.target.value
          })}
        />
      </div>

      <div className="form-group">
        <label>Email</label>

        <input
          type="text"
          className="toy-input"
          value={usuarioSelecionado.email}
          onChange={(e)=>setUsuarioSelecionado({
            ...usuarioSelecionado,
            email:e.target.value
          })}
        />
      </div>

      <div className="actions-footer">

        <button 
        className="btn-action btn-del"
        onClick={()=>setModo("lista")}
        >
        Cancelar
        </button>

        <button 
        className="btn-action btn-add"
        onClick={handleSalvar}
        >
        Salvar
        </button>

      </div>

    </div>

  )
}


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

        <button 
        className="btn-action btn-add"
        onClick={() => navigate("/register")}
        >
        Registrar Novo Usuário
        </button>
      </div>

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : (
        <div className="items-container">
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map(user => (
            <div 
              key={user.id} 
              className="item-row"
              onClick={()=>{
              setUsuarioSelecionado(user)
              setModo("editar")
            }}
            >

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
                  onClick={(e) => {
                  e.stopPropagation()
                  handleDeletar(user.id, user.username)
                  }}
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
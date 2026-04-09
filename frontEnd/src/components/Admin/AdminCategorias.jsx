import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [modo, setModo] = useState('lista'); 
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({ nome: '', descricao: '' });
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("A-Z");
  const [selecionados, setSelecionados] = useState([]);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => { 
    carregarCategorias(); 
  }, []);

  const carregarCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (err) { 
      console.error("Erro ao carregar categorias:", err); 
    }
  };

  const handleSalvar = async () => {
    if (!categoriaSelecionada.nome || categoriaSelecionada.nome.trim() === "") {
      alert("O nome da categoria é obrigatório.");
      return;
    }
    if (!categoriaSelecionada.descricao || categoriaSelecionada.descricao.trim() === "") {
      alert("A descrição da categoria é obrigatória.");
      return;
    }

    const nomeJaExiste = categorias.some(m => 
      m.nome.toLowerCase().trim() === categoriaSelecionada.nome.toLowerCase().trim() && 
      m.id !== categoriaSelecionada.id // Garante que, se for edição, ele permita salvar a própria categoria
    );

    if (nomeJaExiste) {
      return alert("Já existe uma categoria cadastrada com este nome.");
    }
    try {
      if (modo === 'adicionar') {
        await api.post('/categorias', categoriaSelecionada);
        alert("Categoria adicionada com sucesso!");
      } else {
        await api.put(`/categorias/${categoriaSelecionada.id}`, categoriaSelecionada);
        alert("Categoria atualizada com sucesso!");
      }
      setModo('lista');
      carregarCategorias();
    } catch (err) { 
      console.error("Erro ao salvar categoria:", err);
      if (err.response && err.response.data) {
        alert(`Erro: ${err.response.data}`);
      } else {
        alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  };

  const handleAtivarExclusao = () => {
    if (categorias.length === 0) {
      alert("Não há categorias para excluir.");
      return;
    }
    setExcluindo(true);
  };

  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0) return alert("Selecione ao menos um item.");
    
    const mensagem = `Atenção: Ao excluir estas ${selecionados.length} categorias, TODOS os brinquedos vinculados a elas também serão excluídos permanentemente. Deseja continuar?`;
    
    if (window.confirm(mensagem)) {
      try {
        await api.post('/categorias/deletar-varios', selecionados);
        fecharExclusao();
      } catch (err) { 
        alert("Erro ao excluir selecionados."); 
      }
    }
  };

  const handleExcluirTudo = async () => {
    const todosIds = categorias.map(c => c.id);
    if (todosIds.length === 0) return;

    const mensagem = "PERIGO: Você deseja apagar TODAS as categorias? Isso removerá TODOS os brinquedos do sistema. Esta ação não pode ser desfeita!";

    if (window.confirm(mensagem)) {
      try {
        await api.post('/categorias/deletar-varios', todosIds);
        fecharExclusao();
        alert("Todas as categorias e brinquedos vinculados foram removidos.");
      } catch (err) { 
        alert("Erro ao excluir todas as categorias."); 
      }
    }
  };

  const fecharExclusao = () => {
    setSelecionados([]);
    setExcluindo(false);
    carregarCategorias();
  };

  const dadosFiltrados = categorias
    .filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      return filtro === "A-Z" 
        ? a.nome.localeCompare(b.nome) 
        : b.nome.localeCompare(a.nome);
    });

  if (modo === 'adicionar' || modo === 'editar') {
    return (
      <div className="form-container">
        <h2>{modo === 'adicionar' ? 'Nova Categoria' : 'Editar Categoria'}</h2>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" className="toy-input" value={categoriaSelecionada.nome} 
            onChange={e => setCategoriaSelecionada({...categoriaSelecionada, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea className="toy-input" value={categoriaSelecionada.descricao} 
            onChange={e => setCategoriaSelecionada({...categoriaSelecionada, descricao: e.target.value})} />
        </div>
        <div className="actions-footer">
          <button className="btn-action btn-del" onClick={() => setModo('lista')}>Cancelar</button>
          <button className="btn-action btn-add" onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header-row"><h1>Gerenciar Categorias</h1></div>
      
      <div className="controls-group">
        <input type="text" className="search-bar" placeholder="Buscar categoria..." style={{ flex: 2 }}
          value={busca} onChange={e => setBusca(e.target.value)} />
        <select className="filter-select" style={{ flex: 1 }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className="items-container">
        {dadosFiltrados.length > 0 ? (
          dadosFiltrados.map(cat => (
            <div key={cat.id} 
                 className={`item-row ${selecionados.includes(cat.id) ? 'selected' : ''}`} 
                 onClick={() => excluindo ? 
                    setSelecionados(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id]) : 
                    (setCategoriaSelecionada(cat), setModo('editar'))}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {excluindo && <input type="checkbox" checked={selecionados.includes(cat.id)} readOnly />}
                <strong>{cat.nome}</strong>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Nenhuma categoria encontrada.</p>
        )}
      </div>

      <div className="actions-footer">
        {excluindo ? (
          <>
            <button className="btn-action btn-del" onClick={handleExcluirSelecionados}>Excluir Selecionados</button>
            <button className="btn-action" style={{ backgroundColor: '#ff8a8a', color: 'white' }} onClick={handleExcluirTudo}>
              Excluir Tudo
            </button>
            <button className="btn-action btn-add" onClick={fecharExclusao}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn-action btn-del" onClick={handleAtivarExclusao}>Excluir</button>
            <button className="btn-action btn-add" onClick={() => {
              setCategoriaSelecionada({ nome: '', descricao: '' });
              setModo('adicionar');
            }}>Adicionar</button>
          </>
        )}
      </div>
    </>
  );
};

export default AdminCategorias;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";

const AdminMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [modo, setModo] = useState('lista'); 
  const [marcaSelecionada, setMarcaSelecionada] = useState({ nome: '', descricao: '' });
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("A-Z");
  const [selecionados, setSelecionados] = useState([]);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => { 
    carregarMarcas(); 
  }, []);

  const carregarMarcas = async () => {
    try {
      const response = await api.get('/marcas');
      setMarcas(response.data);
    } catch (err) { 
      console.error("Erro ao carregar marcas:", err); 
    }
  };

  const handleSalvar = async () => {
    try {
      if (modo === 'adicionar') {
        await api.post('/marcas', marcaSelecionada);
      } else {
        await api.put(`/marcas/${marcaSelecionada.id}`, marcaSelecionada);
      }
      setModo('lista');
      carregarMarcas();
    } catch (err) { 
      alert("Erro ao salvar marca."); 
    }
  };

  const handleAtivarExclusao = () => {
    if (marcas.length === 0) {
      alert("Não há marcas para excluir.");
      return;
    }
    setExcluindo(true);
  };

  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0) return alert("Selecione ao menos uma marca.");
    
    const mensagem = `Atenção: Ao excluir estas ${selecionados.length} marcas, todos os brinquedos vinculados a elas serão removidos do catálogo. Confirmar exclusão?`;
    
    if (window.confirm(mensagem)) {
      try {
        await api.post('/marcas/deletar-varios', selecionados);
        fecharExclusao();
      } catch (err) { 
        alert("Erro ao excluir selecionadas."); 
      }
    }
  };

  const handleExcluirTudo = async () => {
    const todosIds = marcas.map(m => m.id);
    if (todosIds.length === 0) return;

    const mensagem = "CUIDADO: Você deseja apagar TODAS as marcas? Isso excluirá todos os brinquedos associados a elas automaticamente. Deseja prosseguir?";

    if (window.confirm(mensagem)) {
      try {
        await api.post('/marcas/deletar-varios', todosIds);
        fecharExclusao();
        alert("Todas as marcas e seus respectivos brinquedos foram removidos.");
      } catch (err) { 
        alert("Erro ao excluir todas as marcas."); 
      }
    }
  };

  const fecharExclusao = () => {
    setSelecionados([]);
    setExcluindo(false);
    carregarMarcas();
  };

  const dadosFiltrados = marcas
    .filter(m => m.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      return filtro === "A-Z" 
        ? a.nome.localeCompare(b.nome) 
        : b.nome.localeCompare(a.nome);
    });

  if (modo === 'adicionar' || modo === 'editar') {
    return (
      <div className="form-container">
        <h2>{modo === 'adicionar' ? 'Nova Marca' : 'Editar Marca'}</h2>
        <div className="form-group">
          <label>Nome da Marca</label>
          <input type="text" className="toy-input" value={marcaSelecionada.nome} 
            onChange={e => setMarcaSelecionada({...marcaSelecionada, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Descrição/Origem</label>
          <textarea className="toy-input" value={marcaSelecionada.descricao} 
            onChange={e => setMarcaSelecionada({...marcaSelecionada, descricao: e.target.value})} />
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
      <div className="header-row"><h1>Gerenciar Marcas</h1></div>
      
      <div className="controls-group">
        <input type="text" className="search-bar" placeholder="Buscar marca..." style={{ flex: 2 }}
          value={busca} onChange={e => setBusca(e.target.value)} />
        <select className="filter-select" style={{ flex: 1 }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className="items-container">
        {dadosFiltrados.length > 0 ? (
          dadosFiltrados.map(marca => (
            <div key={marca.id} 
                 className={`item-row ${selecionados.includes(marca.id) ? 'selected' : ''}`} 
                 onClick={() => excluindo ? 
                    setSelecionados(prev => prev.includes(marca.id) ? prev.filter(i => i !== marca.id) : [...prev, marca.id]) : 
                    (setMarcaSelecionada(marca), setModo('editar'))}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {excluindo && <input type="checkbox" checked={selecionados.includes(marca.id)} readOnly />}
                <strong>{marca.nome}</strong>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Nenhuma marca cadastrada.</p>
        )}
      </div>

      <div className="actions-footer">
        {excluindo ? (
          <>
            <button className="btn-action btn-del" onClick={handleExcluirSelecionados}>Excluir Selecionadas</button>
            <button className="btn-action" style={{ backgroundColor: '#ff8a8a', color: 'white' }} onClick={handleExcluirTudo}>
              Excluir Tudo
            </button>
            <button className="btn-action btn-add" onClick={fecharExclusao}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn-action btn-del" onClick={handleAtivarExclusao}>Excluir</button>
            <button className="btn-action btn-add" onClick={() => {
              setMarcaSelecionada({ nome: '', descricao: '' });
              setModo('adicionar');
            }}>Adicionar</button>
          </>
        )}
      </div>
    </>
  );
};

export default AdminMarcas;
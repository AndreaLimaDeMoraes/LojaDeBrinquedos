import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";

const AdminMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [modo, setModo] = useState('lista'); 
  const [marcaSelecionada, setMarcaSelecionada] = useState({ nome: '', logoUrl: '' });
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("A-Z");
  const [selecionados, setSelecionados] = useState([]);
  const [excluindo, setExcluindo] = useState(false);
  const [carregandoImagem, setCarregandoImagem] = useState(false);

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

  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCarregandoImagem(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_unsigned'); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dk7bgyams/image/upload`, { 
        method: 'POST', 
        body: formData 
      });
      const data = await res.json();
      setMarcaSelecionada(prev => ({ ...prev, logoUrl: data.secure_url }));
    } catch (err) {
      alert("Erro ao subir a logo.");
    } finally {
      setCarregandoImagem(false);
      e.target.value = null;
    }
  };

  const handleSalvar = async () => {
    if (!marcaSelecionada.nome || !marcaSelecionada.logoUrl) {
        return alert("Por favor, preencha o nome e selecione uma logo.");
    }

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
    
    const mensagem = `Atenção: Ao excluir estas ${selecionados.length} marcas, TODOS os brinquedos vinculados a elas serão removidos. Confirmar?`;
    
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

    const mensagem = "CUIDADO: Deseja apagar TODAS as marcas e seus respectivos brinquedos? Esta ação é irreversível!";

    if (window.confirm(mensagem)) {
      try {
        await api.post('/marcas/deletar-varios', todosIds);
        fecharExclusao();
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
    .sort((a, b) => filtro === "A-Z" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome));

  if (modo === 'adicionar' || modo === 'editar') {
    return (
      <div className="form-container">
        <h2>{modo === 'adicionar' ? 'Nova Marca' : 'Editar Marca'}</h2>
        
        <div className="form-group">
          <label>Nome da Marca *</label>
          <input type="text" className="toy-input" value={marcaSelecionada.nome} 
            onChange={e => setMarcaSelecionada({...marcaSelecionada, nome: e.target.value})} />
        </div>

        <div className="form-group">
          <label>Logo da Marca *</label>
            <div className="upload-container">
            <input type="file" accept="image/*" onChange={handleUploadLogo} id="logo-input" style={{ display: 'none' }} />
            <label htmlFor="logo-input" className="btn-action btn-add" style={{ color: 'white', cursor: 'pointer', display: 'inline-block' }}>
            {carregandoImagem ? "⌛ Subindo logo..." : "📷 Selecionar Logo"}
    </label>
          </div>
          
{marcaSelecionada.logoUrl && (
    <div className="image-preview-grid" style={{ marginTop: '20px', justifyContent: 'flex-start' }}>
      <div className="image-card" style={{ width: '150px', height: '150px', cursor: 'default' }}>
        <img src={marcaSelecionada.logoUrl} alt="Logo Preview" style={{ objectFit: 'contain', padding: '10px' }} />
        <div className="image-overlay" onClick={() => setMarcaSelecionada({...marcaSelecionada, logoUrl: ''})}>
          <span>Remover</span>
          <div className="trash-icon">🗑️</div>
        </div>
      </div>
    </div>
          )}
        </div>

        <div className="actions-footer">
          <button className="btn-action btn-del" onClick={() => setModo('lista')}>Cancelar</button>
          <button className="btn-action btn-add" onClick={handleSalvar} disabled={carregandoImagem}>
            {carregandoImagem ? "Aguarde..." : "Salvar Marca"}
          </button>
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
                
                <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '8px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {marca.logoUrl ? (
                     <img src={marca.logoUrl} alt="" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                  ) : (
                     <span style={{ fontSize: '10px', color: '#ccc' }}>LOGO</span>
                  )}
                </div>
                
                <strong>{marca.nome}</strong>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Nenhuma marca encontrada.</p>
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
              setMarcaSelecionada({ nome: '', logoUrl: '' });
              setModo('adicionar');
            }}>Adicionar</button>
          </>
        )}
      </div>
    </>
  );
};

export default AdminMarcas;
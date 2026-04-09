import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./Admin.css";

const AdminBrinquedos = () => {
  const [brinquedos, setBrinquedos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modo, setModo] = useState('lista');
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("A-Z");
  const [carregandoImagens, setCarregandoImagens] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [excluindo, setExcluindo] = useState(false);

  const estadoInicial = {
    nomeBrinquedo: '',
    descricao: '',
    valor: '',
    quantidadeEstoque: '',
    idadeRecomendada: '',
    desconto: 0,
    imagens: [],
    categoria: { id: '' },
    marca: { id: '' },
    destacar: false 
  };

  const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(estadoInicial);

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    try {
      const [resBrin, resCat, resMarc] = await Promise.all([
        api.get('/brinquedos'),
        api.get('/categorias'),
        api.get('/marcas')
      ]);
      setBrinquedos(resBrin.data);
      setCategorias(resCat.data);
      setMarcas(resMarc.data);
    } catch (err) { console.error("Erro ao carregar dados:", err); }
  };

  const handleAtivarExclusao = () => {
    if (brinquedos.length === 0) return alert("Não há brinquedos para excluir.");
    setExcluindo(true);
  };

  const fecharExclusao = () => {
    setSelecionados([]);
    setExcluindo(false);
    carregarDados();
  };

  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0) return alert("Selecione ao menos um item.");
    if (window.confirm(`Deseja excluir os ${selecionados.length} brinquedos?`)) {
      try {
        await api.post('/brinquedos/excluir-varios', selecionados);
        fecharExclusao();
      } catch (err) { 
        alert("Erro ao excluir. Verifique o console."); 
      }
    }
  };

  const handleExcluirTudo = async () => {
    const todosIds = brinquedos.map(b => b.id);
    if (window.confirm("CUIDADO: Apagar TODOS os brinquedos?")) {
      try {
        await api.post('/brinquedos/excluir-varios', todosIds);
        fecharExclusao();
      } catch (err) { 
        alert("Erro ao excluir tudo."); 
      }
    }
  };

  const handleMultipleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setCarregandoImagens(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_unsigned');
        const res = await fetch(`https://api.cloudinary.com/v1_1/dk7bgyams/image/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        return data.secure_url;
      });
      const urls = await Promise.all(uploadPromises);
      setBrinquedoSelecionado(prev => ({ ...prev, imagens: [...prev.imagens, ...urls.filter(u => u)] }));
    } catch (err) { alert("Erro no upload."); }
    finally { setCarregandoImagens(false); e.target.value = null; }
  };

  const removerImagem = (index) => {
    setBrinquedoSelecionado(prev => ({ ...prev, imagens: prev.imagens.filter((_, i) => i !== index) }));
  };

  const handleSalvar = async () => {
    // 1. Validações básicas
    if (!brinquedoSelecionado.nomeBrinquedo || !brinquedoSelecionado.marca?.id) {
      return alert("Por favor, preencha o nome do brinquedo e selecione uma marca.");
    }

    // 2. Validação de Duplicidade (Nome + Marca)
    // Usamos String() nos IDs para garantir que "10" seja igual a 10
    const brinquedoDuplicado = brinquedos.some(b => 
      b.nomeBrinquedo.toLowerCase().trim() === brinquedoSelecionado.nomeBrinquedo.toLowerCase().trim() &&
      String(b.marca?.id) === String(brinquedoSelecionado.marca?.id) &&
      String(b.id) !== String(brinquedoSelecionado.id) // O PULO DO GATO ESTÁ AQUI
    );

    if (brinquedoDuplicado) {
      return alert(`Já existe um brinquedo chamado "${brinquedoSelecionado.nomeBrinquedo}" cadastrado para esta marca.`);
    }

    // 3. Fluxo de salvamento
    try {
      if (modo === 'adicionar') {
        await api.post('/brinquedos', brinquedoSelecionado);
        alert("Brinquedo adicionado com sucesso!");
      } else {
        await api.put(`/brinquedos/${brinquedoSelecionado.id}`, brinquedoSelecionado);
        alert("Brinquedo atualizado com sucesso!");
        return; // Para evitar recarregar a lista duas vezes, já que o modal de edição é o mesmo do de adição
      }
      
      // SÓ muda de modo e recarrega se a API responder com sucesso
      setModo('lista');
      carregarBrinquedos(); 

    } catch (err) {
      console.error("Erro ao salvar:", err);
      // Se der erro na API, ele cai aqui e NÃO volta para a lista, 
      // permitindo que o usuário corrija o erro sem perder o que digitou.
      if (err.response && err.response.data) {
        alert(`Erro no servidor: ${err.response.data}`);
      } else {
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  const dadosFiltrados = brinquedos
    .filter(b => b.nomeBrinquedo?.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => filtro === "A-Z" ? a.nomeBrinquedo.localeCompare(b.nomeBrinquedo) : b.nomeBrinquedo.localeCompare(a.nomeBrinquedo));

  if (modo === 'adicionar' || modo === 'editar') {
    return (
      <div className="form-container">
        <h2>{modo === 'adicionar' ? 'Novo Brinquedo' : 'Editar Brinquedo'}</h2>
        
        <div className="form-group">
          <label>Nome do Brinquedo *</label>
          <input type="text" className="toy-input" value={brinquedoSelecionado.nomeBrinquedo} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, nomeBrinquedo: e.target.value})} />
        </div>

        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px', background: '#fff9f0', padding: '15px', borderRadius: '20px', border: '2px dashed var(--toy-peach)' }}>
            <input 
                type="checkbox" 
                id="check-destaque"
                style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                checked={brinquedoSelecionado.destacar}
                onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, destacar: e.target.checked})}
            />
            <label htmlFor="check-destaque" style={{ margin: 0, cursor: 'pointer', color: 'var(--toy-peach)' }}>
                <strong>Exibir este brinquedo na aba "Produtos em Destaque"</strong>
            </label>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Preço (R$) *</label>
            <input type="number" className="toy-input" value={brinquedoSelecionado.valor} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, valor: e.target.value})} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Desconto (%)</label>
            <input type="number" className="toy-input" value={brinquedoSelecionado.desconto} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, desconto: e.target.value})} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Estoque *</label>
            <input type="number" className="toy-input" value={brinquedoSelecionado.quantidadeEstoque} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, quantidadeEstoque: e.target.value})} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Categoria *</label>
            <select className="toy-input" value={brinquedoSelecionado.categoria?.id} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, categoria: {id: e.target.value}})}>
              <option value="">Selecionar...</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Marca *</label>
            <select className="toy-input" value={brinquedoSelecionado.marca?.id} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, marca: {id: e.target.value}})}>
              <option value="">Selecionar...</option>
              {marcas.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Idade Recomendada *</label>
          <select className="toy-input" value={brinquedoSelecionado.idadeRecomendada} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, idadeRecomendada: e.target.value})}>
            <option value="">Selecione...</option>
            <option value="Bebês: 0-12 meses">Bebês: 0-12 meses</option>
            <option value="Bebês: 1-2 anos">Bebês: 1-2 anos</option>
            <option value="Crianças: 3-5 anos">Crianças: 3-5 anos</option>
            <option value="Crianças: 6-10 anos">Crianças: 6-10 anos</option>
            <option value="Crianças: até 12 anos">Crianças: até 12 anos</option>
            <option value="Adolescentes: 13-17 anos">Adolescentes: 13-17 anos</option>
            <option value="Para todas as idades">Para todas as idades</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descrição *</label>
          <textarea className="toy-input" value={brinquedoSelecionado.descricao} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, descricao: e.target.value})} />
        </div>

        <div className="form-group">
          <label>Fotos * (Clique na foto para remover)</label>
          <div className="upload-container">
            <input type="file" accept="image/*" multiple onChange={handleMultipleUpload} id="file-input" style={{ display: 'none' }} />
            <label htmlFor="file-input" className="btn-action btn-add" style={{ color: 'white', cursor: 'pointer', display: 'inline-block' }}>
              {carregandoImagens ? "⌛ Subindo fotos..." : "📷 Adicionar Fotos"}
            </label>
          </div>
          
          <div className="image-preview-grid">
            {brinquedoSelecionado.imagens.map((img, index) => (
              <div key={index} className="image-card" onClick={() => removerImagem(index)}>
                <img src={img} alt="Preview" />
                <div className="image-overlay">
                  <span>Deletar</span>
                  <div className="trash-icon">🗑️</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="actions-footer">
          <button className="btn-action btn-del" onClick={() => setModo('lista')}>Cancelar</button>
          <button className="btn-action btn-add" onClick={handleSalvar} disabled={carregandoImagens}>
            {carregandoImagens ? "Aguarde Upload..." : "Salvar Brinquedo"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header-row"><h1>Gerenciar Brinquedos</h1></div>
      <div className="controls-group">
        <input type="text" className="search-bar" placeholder="Buscar brinquedo..." style={{ flex: 2 }}
          value={busca} onChange={e => setBusca(e.target.value)} />
        <select className="filter-select" style={{ flex: 1 }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="A-Z">A-Z</option><option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className="items-container">
        {brinquedos.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Sem brinquedos cadastrados.</p>
        ) : (
          dadosFiltrados.map(brin => (
            <div key={brin.id} className={`item-row ${selecionados.includes(brin.id) ? 'selected' : ''}`} 
                 onClick={() => excluindo ? setSelecionados(prev => prev.includes(brin.id) ? prev.filter(i => i !== brin.id) : [...prev, brin.id]) : (setBrinquedoSelecionado({ ...brin, imagens: brin.imagens || [] }), setModo('editar'))}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {excluindo && <input type="checkbox" checked={selecionados.includes(brin.id)} readOnly />}
                
                {brin.imagens && brin.imagens.length > 0 ? (
                  <img 
                    src={brin.imagens[0]} 
                    alt={brin.nomeBrinquedo} 
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} 
                  />
                ) : (
                  <div className="toy-icon-placeholder">🧸</div>
                )}

                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {brin.nomeBrinquedo}
                    {brin.destacar && <span title="Produto em Destaque" style={{ fontSize: '1rem' }}>⭐</span>}
                  </strong>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{brin.marca?.nome} | R$ {brin.valor?.toFixed(2)}</div>
                </div>
              </div>
              <span className="role-tag admin">{brin.categoria?.nome}</span>
            </div>
          ))
        )}
      </div>

      <div className="actions-footer">
        {excluindo ? (
          <>
            <button className="btn-action btn-del" onClick={handleExcluirSelecionados}>Excluir Selecionados</button>
            <button className="btn-action" style={{ backgroundColor: '#ff8a8a', color: 'white' }} onClick={handleExcluirTudo}>Excluir Tudo</button>
            <button className="btn-action btn-add" onClick={fecharExclusao}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn-action btn-del" onClick={handleAtivarExclusao}>Excluir</button>
            <button className="btn-action btn-add" onClick={() => { setBrinquedoSelecionado(estadoInicial); setModo('adicionar'); }}>Adicionar</button>
          </>
        )}
      </div>
    </>
  );
};

export default AdminBrinquedos;
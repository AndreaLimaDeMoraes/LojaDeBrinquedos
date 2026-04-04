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
  const [selecionados, setSelecionados] = useState([]);
  const [excluindo, setExcluindo] = useState(false);

  // Estado inicial do Brinquedo seguindo seu DTO
  const estadoInicial = {
    nomeBrinquedo: '',
    descricao: '',
    valor: '',
    quantidadeEstoque: '',
    fornecedor: '',
    idadeRecomendada: '',
    desconto: 0,
    imagens: [''],
    categoria: { id: '' },
    marca: { id: '' }
  };

  const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(estadoInicial);

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_unsigned'); // O nome que você criou lá

  try {
    // 1. Envia para o Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dk7bgyams/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();

    // 2. O Cloudinary te devolve a URL segura em data.secure_url
    if (data.secure_url) {
      handleImageChange(0, data.secure_url); // Salva o link no estado do seu brinquedo
      alert("Imagem enviada com sucesso!");
    }
  } catch (err) {
    console.error("Erro no upload:", err);
    alert("Falha ao subir imagem.");
  }
  };

  useEffect(() => { 
    carregarDados(); 
  }, []);

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
    } catch (err) { 
      console.error("Erro ao carregar dados:", err); 
    }
  };

  const handleSalvar = async () => {

    if (brinquedoSelecionado.valor <= 0 || brinquedoSelecionado.quantidadeEstoque <= 0) {
    alert("O valor e a quantidade em estoque devem ser maiores que zero!");
    return;
    }

    try {
      const dadosParaEnvio = {
        
        ...brinquedoSelecionado,
        valor: parseFloat(brinquedoSelecionado.valor),
        quantidadeEstoque: parseInt(brinquedoSelecionado.quantidadeEstoque),
        desconto: parseFloat(brinquedoSelecionado.desconto)
      };

      if (modo === 'adicionar') {
        await api.post('/brinquedos', dadosParaEnvio);
      } else {
        await api.put(`/brinquedos/${brinquedoSelecionado.id}`, dadosParaEnvio);
      }
      setModo('lista');
      carregarDados();
    } catch (err) { 
      alert("Erro ao salvar brinquedo. Verifique os campos."); 
    }
  };

  const handleImageChange = (index, value) => {
    const novasImagens = [...brinquedoSelecionado.imagens];
    novasImagens[index] = value;
    setBrinquedoSelecionado({ ...brinquedoSelecionado, imagens: novasImagens });
  };

  const dadosFiltrados = brinquedos
    .filter(b => b.nomeBrinquedo?.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      return filtro === "A-Z" 
        ? a.nomeBrinquedo.localeCompare(b.nomeBrinquedo) 
        : b.nomeBrinquedo.localeCompare(a.nomeBrinquedo);
    });

  if (modo === 'adicionar' || modo === 'editar') {
    return (
      <div className="form-container">
        <h2>{modo === 'adicionar' ? 'Novo Brinquedo' : 'Editar Brinquedo'}</h2>
        
        <div className="form-group">
          <label>Nome do Brinquedo</label>
          <input type="text" className="toy-input" value={brinquedoSelecionado.nomeBrinquedo} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, nomeBrinquedo: e.target.value})} />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Preço (R$)</label>
          <input 
            type="number" 
            className="toy-input" 
            min="0.01" // Preço não pode ser 0 nem negativo
            step="0.01"
            value={brinquedoSelecionado.valor} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, valor: e.target.value})} 
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Estoque</label>
          <input 
            type="number" 
            className="toy-input" 
            min="0" // Estoque pode ser 0, mas não negativo
            value={brinquedoSelecionado.quantidadeEstoque} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, quantidadeEstoque: e.target.value})} 
          />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Categoria</label>
            <select className="toy-input" value={brinquedoSelecionado.categoria?.id} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, categoria: {id: e.target.value}})}>
              <option value="">Selecionar...</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Marca</label>
            <select className="toy-input" value={brinquedoSelecionado.marca?.id} 
              onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, marca: {id: e.target.value}})}>
              <option value="">Selecionar...</option>
              {marcas.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea className="toy-input" value={brinquedoSelecionado.descricao} 
            onChange={e => setBrinquedoSelecionado({...brinquedoSelecionado, descricao: e.target.value})} />
        </div>

        <div className="form-group">
          <label>URL da Imagem Principal</label>
          <div className="upload-container">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              id="file-input"
              style={{ display: 'none' }} 
            />
            <label htmlFor="file-input" className="btn-action btn-add" style={{ color: 'white' }}>
              📁 Selecionar Foto
            </label>
          </div>
          {/* Preview para confirmar que subiu */}
          {brinquedoSelecionado.imagens[0] && (
            <div style={{ marginTop: '10px' }}>
              <img 
                src={brinquedoSelecionado.imagens[0]} 
                alt="Preview" 
                style={{ width: '120px', borderRadius: '15px', border: '3px solid var(--toy-pink)' }} 
              />
              <p style={{ fontSize: '0.7rem' }}>URL gerada com sucesso!</p>
            </div>
          )}
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
      <div className="header-row"><h1>Gerenciar Brinquedos</h1></div>
      
      <div className="controls-group">
        <input type="text" className="search-bar" placeholder="Buscar brinquedo..." style={{ flex: 2 }}
          value={busca} onChange={e => setBusca(e.target.value)} />
        <select className="filter-select" style={{ flex: 1 }} value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className="items-container">
        {dadosFiltrados.length > 0 ? (
          dadosFiltrados.map(brin => (
            <div key={brin.id} 
                 className={`item-row ${selecionados.includes(brin.id) ? 'selected' : ''}`} 
                 onClick={() => (setBrinquedoSelecionado(brin), setModo('editar'))}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--toy-pink)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>
                   🧸
                </div>
                <div>
                    <strong>{brin.nomeBrinquedo}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                        {brin.marca?.nome} | R$ {brin.valor}
                    </div>
                </div>
              </div>
              <span className="role-tag admin">{brin.categoria?.nome}</span>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum brinquedo encontrado.</p>
        )}
      </div>

      <div className="actions-footer">
        <button className="btn-action btn-add" onClick={() => {
            setBrinquedoSelecionado(estadoInicial);
            setModo('adicionar');
        }}>Novo Brinquedo</button>
      </div>
    </>
  );
};

export default AdminBrinquedos;
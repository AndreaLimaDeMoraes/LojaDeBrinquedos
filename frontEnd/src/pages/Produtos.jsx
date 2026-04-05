import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import './Produtos.css';
import ProductModal from '../components/Produtos/ProductModal';

const Produtos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lê os parâmetros da URL (se vieram dos carrosséis)
  const categoriaInicial = searchParams.get('categoria') || '';
  const marcaInicial = searchParams.get('marca') || '';

  // Estados dos Filtros
  const [filtroCategoria, setFiltroCategoria] = useState(categoriaInicial);
  const [filtroMarca, setFiltroMarca] = useState(marcaInicial);

  // Estados dos Dados
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(null);

  const handleFiltroCategoria = (id) => {
  setFiltroCategoria(id);
  setSearchParams({ categoria: id, marca: filtroMarca });
  };

  const handleFiltroMarca = (id) => {
    setFiltroMarca(id);
    setSearchParams({ categoria: filtroCategoria, marca: id });
  };

  // Busca os dados do Back-end
  useEffect(() => {
    // Busca Categorias e Marcas para preencher os filtros
    api.get('/categorias').then(res => setCategorias(res.data)).catch(console.error);
    api.get('/marcas').then(res => setMarcas(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    api.get('/brinquedos') // <--- O nome certo da sua rota no Spring
      .then(res => {
        let dados = res.data;
        
        if (filtroCategoria) {
          dados = dados.filter(p => p.categoria?.id?.toString() === filtroCategoria.toString());
        }
        if (filtroMarca) {
          dados = dados.filter(p => p.marca?.id?.toString() === filtroMarca.toString());
        }
        
        setProdutos(dados);
      })
      .catch(err => {
        console.error("Erro ao buscar brinquedos:", err);
      });
  }, [filtroCategoria, filtroMarca]);

  return (
    <div className="produtos-page">
      <div className="produtos-header">
        <h1>Nossa Vitrine Mágica 🎁</h1>
        <p>Encontre os melhores brinquedos em EVA!</p>
      </div>

      <div className="produtos-layout">
        {/* SIDEBAR DE FILTROS */}
        <aside className="filtros-sidebar">
          <h3>Filtros</h3>
          
          <div className="filtro-grupo">
            <label>Categoria</label>
            <select 
              value={filtroCategoria} 
              onChange={(e) => handleFiltroCategoria(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Marca</label>
            <select 
              value={filtroMarca} 
              onChange={(e) => handleFiltroMarca(e.target.value)}
            >
              <option value="">Todas as Marcas</option>
              {marcas.map(marca => (
                <option key={marca.id} value={marca.id}>{marca.nome}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="btn-limpar"
            onClick={() => { setFiltroCategoria(''); setFiltroMarca(''); }}
          >
            Limpar Filtros
          </button>
        </aside>

        {/* GRID DE PRODUTOS */}
        <main className="produtos-grid">
          {produtos.length === 0 ? (
            <div className="sem-produtos">
              <h2>Poxa, nenhum brinquedo encontrado! 😢</h2>
            </div>
          ) : (
            produtos.map(produto => (
              <div className="produto-card" key={produto.id} onClick={() => setBrinquedoSelecionado(produto)}>
                <div className="produto-img-wrapper">
                  {/* Se o brinquedo tiver imagem, usamos a primeira do array */}
                  {produto.imagens && produto.imagens[0] ? (
                    <img src={produto.imagens[0]} alt={produto.nomeBrinquedo} className="produto-img" />
                  ) : (
                    <div className="produto-placeholder">🧸</div>
                  )}
                </div>
                <div className="produto-info">
                  {/* 2. CORREÇÃO DO NOME: de produto.nome para produto.nomeBrinquedo */}
                  <h4>{produto.nomeBrinquedo}</h4> 
                  
                  {/* No seu Java é 'valor', não 'preco' */}
                  <span className="produto-preco">
                    R$ {produto.valor ? produto.valor.toFixed(2) : "0.00"}
                  </span>
                  <button className="btn-comprar">Ver Detalhes</button>
                </div>
              </div>
            ))
          )}
        </main>
        {/* MODAL DE DETALHES */}
        {brinquedoSelecionado && (
          <ProductModal 
            produto={brinquedoSelecionado} 
            onClose={() => setBrinquedoSelecionado(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Produtos;
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Produtos.css';
import ProductModal from '../components/Produtos/ProductModal';
import Footer from '../components/Footer';

const Produtos = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Pegando valores iniciais da URL
  const categoriaInicial = searchParams.get('categoria') || '';
  const marcaInicial = searchParams.get('marca') || '';
  const idadeInicial = searchParams.get('idade') || '';
  const promoInicial = searchParams.get('promo') === 'true';

  // Estados dos Filtros
  const [apenasPromocoes, setApenasPromocoes] = useState(promoInicial);
  const [filtroCategoria, setFiltroCategoria] = useState(categoriaInicial);
  const [filtroMarca, setFiltroMarca] = useState(marcaInicial);
  const [filtroIdade, setFiltroIdade] = useState(idadeInicial); // Novo estado

  // Dados
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [brinquedoSelecionado, setBrinquedoSelecionado] = useState(null);

  // --- Handlers para atualizar a URL e o Estado ---
  const atualizarFiltrosNaURL = (novosValores) => {
    // Mescla os valores atuais com o que está sendo mudado
    const params = {
      categoria: filtroCategoria,
      marca: filtroMarca,
      idade: filtroIdade,
      promo: apenasPromocoes ? 'true' : 'false',
      ...novosValores
    };
    
    // Limpa parâmetros vazios para deixar a URL mais bonita
    const urlParamsLimpos = {};
    Object.keys(params).forEach(key => {
      if (params[key] && params[key] !== 'false') {
        urlParamsLimpos[key] = params[key];
      }
    });

    setSearchParams(urlParamsLimpos);
  };

  const handleFiltroCategoria = (id) => {
    setFiltroCategoria(id);
    atualizarFiltrosNaURL({ categoria: id });
  };

  const handleFiltroMarca = (id) => {
    setFiltroMarca(id);
    atualizarFiltrosNaURL({ marca: id });
  };

  const handleFiltroIdade = (idade) => {
    setFiltroIdade(idade);
    atualizarFiltrosNaURL({ idade: idade });
  };

  const handleCheckPromo = (checked) => {
    setApenasPromocoes(checked);
    atualizarFiltrosNaURL({ promo: checked ? 'true' : 'false' });
  };

  const fecharModal = () => {
    setBrinquedoSelecionado(null);
    const novosParams = new URLSearchParams(searchParams);
    novosParams.delete('id');
    setSearchParams(novosParams);
  };

  // Buscando Categorias e Marcas
  useEffect(() => {
    api.get('/categorias').then(res => setCategorias(res.data)).catch(console.error);
    api.get('/marcas').then(res => setMarcas(res.data)).catch(console.error);
  }, []);

  // Buscando e Filtrando Brinquedos
  useEffect(() => {
    api.get('/brinquedos')
      .then(res => {
        let dados = res.data;

        // 1. Filtros Básicos (Categoria, Marca e Idade)
        if (filtroCategoria) {
          dados = dados.filter(p => p.categoria?.id?.toString() === filtroCategoria.toString());
        }
        if (filtroMarca) {
          dados = dados.filter(p => p.marca?.id?.toString() === filtroMarca.toString());
        }
        if (filtroIdade) {
          // Garante que a comparação seja exata com as strings que você cadastrou
          dados = dados.filter(p => p.idadeRecomendada === filtroIdade); 
        }

        // 2. Filtro de Promoções (Checkbox)
        if (apenasPromocoes) {
          dados = dados.filter(p => Number(p.desconto) > 0);
        }

        // 3. Ordenação Inteligente (Destaque + Desconto)
        dados.sort((a, b) => {
          if (Number(b.destacar) !== Number(a.destacar)) {
            return Number(b.destacar) - Number(a.destacar);
          }
          return (Number(b.desconto) || 0) - (Number(a.desconto) || 0);
        });

        setProdutos(dados);
      })
      .catch(err => console.error("Erro ao buscar:", err));
  }, [filtroCategoria, filtroMarca, filtroIdade, apenasPromocoes]); // Colocamos todos aqui!

  // Abrir modal automaticamente se tiver ID na URL
  useEffect(() => {
    const productId = searchParams.get('id');
    if (productId && produtos.length > 0) {
      const encontrado = produtos.find(p => p.id.toString() === productId);
      if (encontrado) {
        setBrinquedoSelecionado(encontrado);
      }
    }
  }, [searchParams, produtos]);

  return (
    <div className="produtos-page">
      {/* HEADER */}
      <header className="home-header">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-capsula">
            <h1 className="home-title">Eva Toys</h1>
          </div>
          <img src="/rocking-horse.png" className="logo-icon" style={{ width: '40px', height: '40px', marginLeft: '20px' }} alt="logo" />
        </div>

        <nav className="header-nav">
          <span onClick={() => navigate('/')}>Início</span>
          <span onClick={() => navigate('/produtos')}>Produtos</span>
          <span onClick={() => navigate('/categorias')}>Categorias</span>
          <span onClick={() => navigate('/brinquedos')}>Brinquedos</span>
          <span onClick={() => navigate('/marcas')}>Marcas</span>
        </nav>

        <div className="home-actions">
          <button onClick={() => navigate('/sobre')} className="btn-action">
            Sobre a Equipe
          </button>

          {isAuthenticated ? (
            <>
              <button onClick={() => navigate('/admin')} className="btn-action btn-admin">
                Painel Admin
              </button>
              <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="btn-action btn-del">
                Sair
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-action btn-add">
              Entrar (Login)
            </button>
          )}
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="produtos-layout">
        <aside className="filtros-sidebar">
          <h3>Filtros</h3>
          
          <div className="filtro-grupo checkbox-promo">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={apenasPromocoes} 
                onChange={(e) => handleCheckPromo(e.target.checked)} 
              />
              <span className="checkmark"></span>
              <p1>Apenas Promoções</p1>
            </label>
          </div>

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

          {/* NOVO FILTRO DE IDADE AQUI! */}
          <div className="filtro-grupo">
            <label>Idade Recomendada</label>
            <select 
              value={filtroIdade} 
              onChange={(e) => handleFiltroIdade(e.target.value)}
            >
              <option value="">Todas as Idades</option>
              <option value="Bebês: 0-12 meses">Bebês: 0-12 meses</option>
              <option value="Bebês: 1-2 anos">Bebês: 1-2 anos</option>
              <option value="Crianças: 3-5 anos">Crianças: 3-5 anos</option>
              <option value="Crianças: 6-10 anos">Crianças: 6-10 anos</option>
              <option value="Crianças: até 12 anos">Crianças: até 12 anos</option>
              <option value="Adolescentes: 13-17 anos">Adolescentes: 13-17 anos</option>
              <option value="Para todas as idades">Para todas as idades</option>
            </select>
          </div>
          
          <button 
            className="btn-limpar"
            onClick={() => { 
              setFiltroCategoria(''); 
              setFiltroMarca(''); 
              setFiltroIdade('');
              setApenasPromocoes(false);
              setSearchParams({}); // Limpa a URL!
            }}
            >
            Limpar Filtros
          </button>
        </aside>

        <main className="produtos-grid">
          {produtos.length === 0 ? (
            <div className="sem-produtos">
              <h2>Poxa, nenhum brinquedo encontrado! 😢</h2>
            </div>
          ) : (
            produtos.map(produto => {
              const temDesconto = Number(produto.desconto) > 0;
              const valorOriginal = Number(produto.valor);
              const valorFinal = temDesconto ? valorOriginal - (valorOriginal * (produto.desconto / 100)) : valorOriginal;

              return (
                <div className="produto-card" key={produto.id} onClick={() => setBrinquedoSelecionado(produto)}>
                  <div className="produto-img-wrapper">
                    {temDesconto && <div className="tag-desconto">-{produto.desconto}%</div>}
                    {produto.imagens && produto.imagens[0] ? (
                      <img src={produto.imagens[0]} alt={produto.nomeBrinquedo} className="produto-img" />
                    ) : (
                      <div className="produto-placeholder">🧸</div>
                    )}
                  </div>
                  <div className="produto-info">
                    <h4>{produto.nomeBrinquedo}</h4>
                    <div className="produto-preco-container">
                      {temDesconto ? (
                        <>
                          <span className="preco-antigo">R$ {valorOriginal.toFixed(2)}</span>
                          <span className="produto-preco">R$ {valorFinal.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="produto-preco">R$ {valorOriginal.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="btn-comprar">Ver Detalhes</button>
                  </div>
                </div>
              )
            })
          )}
        </main>

        {brinquedoSelecionado && (
          <ProductModal 
            produto={brinquedoSelecionado} 
            onClose={fecharModal} 
          />
        )}
      </div>
    
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Produtos;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Home.css';
import CategoryCarousel from '../components/Categoria/CategoryCarousel';
import BrandCarousel from '../components/Marcas/BrandCarousel';
import HeroSlider from '../components/HeroSlider';
import FeaturedToys from '../components/FeaturedToys';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);
  const [brinquedos, setBrinquedos] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  // Lógica de Autocomplete (monitora a digitação)
  useEffect(() => {
    if (pesquisa.length > 2 && brinquedos) {
      const filtrados = brinquedos.filter(b => 
        b.nomeBrinquedo.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setSugestoes(filtrados.slice(0, 5));
    } else {
      setSugestoes([]);
    }
  }, [pesquisa, brinquedos]);

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const sectionId = params.get('scrollTo');

  if (sectionId) {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 200); // pequeno delay pra garantir que carregou
  }
}, [location]);

  const handleBusca = (e) => {
    if(e) e.preventDefault();
    if (pesquisa.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(pesquisa)}`);
      setSugestoes([]);
    }
  };

  const handleSelecao = (brinquedo) => {
    navigate(`/produtos?id=${brinquedo.id}`);
    setPesquisa("");
    setSugestoes([]);
  };

  useEffect(() => {
    api.get('/categorias').then(res => setCategories(res.data)).catch(() => setError(true));
    api.get('/brinquedos').then(res => setBrinquedos(res.data)).catch(console.error);
  }, []);

  return (
    <div id="inicio" className="home-container">
      <header className="home-header">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-capsula"><h1 className="home-title">Eva Toys</h1></div>
          <img src="/rocking-horse.png" className="logo-icon" style={{ width: '40px', height: '40px', marginLeft: '20px' }} alt="logo" />
        </div>

        {/* BARRA DE PESQUISA COM SUGESTÕES */}
        <div className="search-wrapper">
          <form className="search-container" onSubmit={handleBusca}>
            <input 
              type="text" 
              placeholder="O que você está procurando?" 
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
          
          {sugestoes.length > 0 && (
            <div className="suggestions-dropdown">
              {sugestoes.map(sugestao => (
                <div key={sugestao.id} className="suggestion-item" onClick={() => handleSelecao(sugestao)}>
                  {sugestao.imagens && <img src={sugestao.imagens[0]} alt={sugestao.nomeBrinquedo} style={{width: '30px', height: '30px', objectFit: 'cover'}} />}
                  <span>{sugestao.nomeBrinquedo}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="header-nav">
          <span onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}>Início</span>
          <span onClick={() => navigate('/produtos')}>Produtos</span>
          <span onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}>Categorias</span>
          <span onClick={() => document.getElementById('destaques')?.scrollIntoView({ behavior: 'smooth' })}>Brinquedos</span>
          <span onClick={() => document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' })}>Marcas</span>
        </nav>

        <div className="home-actions">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate('/admin')} className="btn-action btn-admin">Painel Admin</button>
              <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="btn-action btn-del">Sair</button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-action btn-add">Entrar (Login)</button>
          )}
        </div>
      </header>
      
      <HeroSlider />
      {brinquedos && <section id="destaques"><FeaturedToys brinquedos={brinquedos} /></section>}
      <hr className="home-divider" />
      {error ? <div className="status-message"><h2>Erro ao conectar.</h2></div> : !categories ? <div className="status-message"><h2>Carregando...</h2></div> : (
        <>
          <section id="categorias"><CategoryCarousel categories={categories} /></section>
          <section id="marcas"><BrandCarousel /><hr className="home-divider" /><TeamSection /></section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
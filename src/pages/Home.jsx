import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CategoryCarousel from '../components/CategoryCarousel';
import HeroSlider from '../components/HeroSlider';
import Shortcuts from '../components/Shortcuts';
import BrandsSlider from '../components/BrandsSlider';
import FeaturedToys from '../components/FeaturedToys';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import '../style/Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [toys, setToys] = useState([]);
  const navigate = useNavigate();
  
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    // Buscar categorias
    api.get('/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar categorias:", err);
      });

    // Buscar brinquedos
    api.get('/brinquedos')
      .then(response => {
        setToys(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar brinquedos:", err);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🧸</span>
          <span className="logo-text">Loja de Brinquedos</span>
        </div>
        
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Início</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/brinquedos'); }}>Brinquedos</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/categorias'); }}>Categorias</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/sobre'); }}>Sobre</a>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" onClick={() => alert('Busca em breve!')}>
            🔍
          </button>
          <button className="icon-btn" onClick={() => alert('Favoritos em breve!')}>
            ❤️
          </button>
          <button className="icon-btn" onClick={() => alert('Carrinho em breve!')}>
            🛒
          </button>
          
          {isAuthenticated ? (
            <>
              <button 
                className="btn-admin"
                onClick={() => navigate('/admin')}
              >
                ⚙️ Admin
              </button>
              <button 
                className="btn-logout"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <button 
              className="btn-login"
              onClick={() => navigate('/login')}
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      {/* Hero Slider com Carrossel de Boas Vindas */}
      <HeroSlider />

      {/* Atalhos Rápidos */}
      <Shortcuts />

      {/* Marcas Parceiras */}
      <BrandsSlider />

      {/* Brinquedos em Destaque */}
      <FeaturedToys toys={toys} />

      {/* Categorias (seu componente existente) */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Brinquedos por Categoria</h2>
          <button 
            className="view-all"
            onClick={() => navigate('/categorias')}
          >
            Ver todas <span>→</span>
          </button>
        </div>
        <CategoryCarousel categories={categories} />
      </section>

      {/* Sobre a Equipe */}
      <TeamSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
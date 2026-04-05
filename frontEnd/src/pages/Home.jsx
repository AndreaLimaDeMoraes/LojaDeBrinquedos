import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import CategoryCarousel from '../components/Categoria/CategoryCarousel';
import './Home.css';
import BrandCarousel from '../components/Marcas/BrandCarousel';

// Foto que aparece no começo (carrossel de fotos iniciais) 
import HeroSlider from '../components/HeroSlider';

import Shortcuts from '../components/Shortcuts';

// Todos os brinquedos
import FeaturedToys from '../components/FeaturedToys';

// info de contato
import Footer from '../components/Footer';

// detalhes dos produtos
import ProductModal from '../components/Produtos/ProductModal';

import TeamSection from '../components/TeamSection';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null); // Começa como null para saber que está carregando
  const [error, setError] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');
  const [Marca, setBrands] = useState(null); // Começa como null para saber que está carregando

  const [brinquedos, setBrinquedos] = useState(null);
  // opcional (para modal)
  // eslint-disable-next-line no-unused-vars
  const [produtoModal, setprodutoModal] = useState(null);


  useEffect(() => {
			
    api.get('/categorias')
      .then(response => {
        setCategories(response.data);
      })
	  
      .catch(err => {
        console.error("Erro ao buscar categorias:", err);
        setError(true);
      });
	  
	  api.get('/brinquedos')
	  		    .then(response => {
	  		      console.log('Brinquedos do BACKEND:', response.data);
	  		      setBrinquedos(response.data);
	  		    })
	  		    .catch(err => {
	  		      console.error("Erro ao buscar brinquedos:", err);
	  		    });
	  			
	  
	  api.get('/marca')
	    .then(response => {
	      console.log('MARCAS DO BACKEND:', response.data);
	      setBrands(response.data);
	    })
	    .catch(err => {
	      console.error("Erro ao buscar marcas:", err);
	    });
		
		
  }, []);

  return (
	
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Vitrine de Brinquedos 🧸</h1>
        
        <div className="home-actions">
		
         
          <button 
            onClick={() => navigate('/sobre')} 
            className="btn-action" 
            style={{ backgroundColor: 'var(--toy-pink)', color: 'var(--toy-peach)' }}
          >
            Sobre a Equipe
          </button>

          {isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate('/admin')} 
                className="btn-action btn-admin"
              >
                Painel Admin
              </button>
              <button 
                onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} 
                className="btn-action btn-del"
              >
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
	  {/* Navegação principal */}

	  <nav className="home-nav-bar">
	    <div className="home-nav">
	      <span onClick={() => navigate('/')}>Início</span>
	      <span onClick={() => navigate('/produtos')}>Produtos</span>
		  
		  <span onClick={() => navigate('/brinquedos')}>Destaques</span>

		  <span onClick={() =>
		    document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' })
		  }>
		    Marcas
		  </span>


	    </div>
	  </nav>

	  {/* Hero Slider com Carrossel de Boas Vindas */}
	  <HeroSlider />
		   
	      
      <hr className="home-divider" />

      {/* VERIFICAÇÃO DE ESTADO */}
	  {error ? (
	    <div className="status-message">
	      <h2 style={{ color: '#e74c3c' }}>
	        Erro ao conectar com o servidor.
	      </h2>
	      <p>
	        Verifique se o seu Back-end (Spring Boot) está rodando na porta 8080.
	      </p>
	    </div>
	  ) : !categories ? (
	    <div className="status-message">
	      <h2>Carregando categorias...</h2>
	    </div>
	  ) : categories.length === 0 ? (
	    <div className="status-message">
	      <h2>Nenhuma categoria encontrada no banco.</h2>
	    </div>
	  ) : (
	    <>
	      {/* Categorias */}
	      <CategoryCarousel categories={categories} />

	      {/* Brinquedos */}
	      {brinquedos && (
	        <FeaturedToys
	          brinquedos={brinquedos}
	          onSelect={setprodutoModal}
	        />
	      )}

	      {/* Marcas */}
	      <section id="marcas">
	        <BrandCarousel />
			
			<hr className="home-divider" />
			{/* Seção sobre a Loja */}
				  <TeamSection />
			
	      </section>
		  
		  
	    </>
	  )}
	  
	 
	  {/* Footer SEMPRE fora do condicional */}
	  <Footer />
    </div>
	
	
  );
  
  
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import CategoryCarousel from '../components/Categoria/CategoryCarousel';
import './Home.css';
import BrandCarousel from '../components/Marcas/BrandCarousel';
import DiscountedToys from '../components/DiscountedToys';

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
	
   <div id="inicio" className="home-container">
      <header className="home-header">
        <h1 className="home-title">Eva Toys 🧸</h1>

		{/* MENU CENTRAL */}
		  <nav className="header-nav">


		  <span
		    onClick={() =>
		      document
		        .getElementById('inicio')
		        ?.scrollIntoView({ behavior: 'smooth' })
		    }
		  >
		    Início
		  </span>


		   <span onClick={() => navigate('/produtos')}>
		     Produtos
		   </span>
		   
		   <span
		       onClick={() =>
		         document
		           .getElementById('categorias')
		           ?.scrollIntoView({ behavior: 'smooth' })
		       }
		     >
		       Categorias
		     </span>

		   <span
		     onClick={() =>
		       document
		         .getElementById('destaques')
		         ?.scrollIntoView({ behavior: 'smooth' })
		     }
		   >
		     Brinquedos
		   </span>

		   

		   <span
		     onClick={() =>
		       document
		         .getElementById('marcas')
		         ?.scrollIntoView({ behavior: 'smooth' })
		     }
		   >
		     Marcas
		   </span>

			
			
		  </nav>

        
        <div className="home-actions">
		
         
          <button 
            onClick={() => navigate('/sobre')} 
            className="btn-action" 
            style={{ backgroundColor: '#888; ', color: '#888;' }}
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


	  {/* Hero Slider com Carrossel de Boas Vindas */}
	  <HeroSlider />
		   
	  
	  {/* BRINQUEDOS */}

	  
	  {/* Brinquedos */}
	  	      {brinquedos && (
	  	        <FeaturedToys
	  	          brinquedos={brinquedos}
	  	          onSelect={setprodutoModal}
	  	        />
	  	      )}
			  
			  <hr className="home-divider" />

			  {/* CATEGORIAS */}

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
		<section id="categorias">
		  <CategoryCarousel categories={categories} />
		</section>

	 

	      {/* Marcas */}
	      <section id="marcas">
	        <BrandCarousel />
			
			<hr className="home-divider" />
					  {/* Promoções com desconto */}
					      <DiscountedToys toys={brinquedos} />
			
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
import React from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  return (
    <div className="hero-slider">
      
      {/* Imagem de fundo */}
      <div
        className="slide-bg"
        style={{
          backgroundImage: "url('azulIris.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Overlay escuro */}
      <div className="slide-overlay"></div>

      {/* Conteúdo */}
      <div className="slide-content">
        <h1>Bem-vindos à Loja de Brinquedos</h1>
        <p>O lugar onde a imaginação ganha vida!</p>
		

		<button
		  className="btn-primary"
		  onClick={() => {
		    document
		      .getElementById('team-section')
		      ?.scrollIntoView({ behavior: 'smooth' });
		  }}
		>

          Conheça a nossa loja
        </button>
      </div>

    </div>
  );
};

export default HeroSlider;
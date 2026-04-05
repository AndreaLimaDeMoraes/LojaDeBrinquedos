import React from 'react';
import './FeaturedToys.css';

const FeaturedToys = ({ brinquedos = [] }) => {

	  const featuredToys = Array.isArray(brinquedos)
    ? brinquedos.slice(0, 6)
    : [];

  if (featuredToys.length === 0) return null;

  return (
	<section id="destaques" className="featured-toys">	  <div className="section-header">
	    <div className="section-title-wrapper">
	      <h2 className="section-title">Nossos Brinquedos</h2>
	    </div>


        <button
          className="view-all"
          onClick={() => window.location.href = '/produtos'}
        >
          Ver todos →
        </button>
      </div>

      <div className="toys-grid">
        {featuredToys.map((toy) => (
          <div key={toy.id} className="toy-card">
            {/* IMAGEM */}
            <div className="toy-image">
              {toy.imagens && toy.imagens.length > 0 ? (
                <img
                  src={toy.imagens[0]}
                  alt={toy.nomeBrinquedo}
                />
              ) : (
                <span className="toy-emoji">🧸</span>
              )}
            </div>

            {/* INFO */}
            <div className="toy-info">
              <h3 className="toy-title">
                {toy.nomeBrinquedo}
              </h3>

              <div className="toy-price">
                R$ {Number(toy.valor).toFixed(2)}
              </div>

              <div className="toy-category">
                📁 {toy.categoria?.nome || 'Sem categoria'}
              </div>

              <div className="toy-stock">
                📦 Estoque: {toy.quantidadeEstoque ?? 0} un.
              </div>

              <div className="toy-actions">
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedToys;
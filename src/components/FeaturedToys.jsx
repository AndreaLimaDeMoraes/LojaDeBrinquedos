import React from 'react';
import './FeaturedToys.css';

const FeaturedToys = ({ toys }) => {
  const featuredToys = toys.slice(0, 4); // Pega os 4 primeiros

  return (
    <section className="featured-toys">
      <div className="section-header">
        <h2 className="section-title">Brinquedos em Destaque</h2>
        <button className="view-all" onClick={() => window.location.href = '/brinquedos'}>
          Ver todos →
        </button>
      </div>
      <div className="toys-grid">
        {featuredToys.map(toy => (
          <div key={toy.id} className="toy-card">
            <div className="toy-image">
              <span className="toy-emoji">🧸</span>
            </div>
            <div className="toy-info">
              <h3 className="toy-title">{toy.nomeBrinquedo}</h3>
              <div className="toy-price">R$ {toy.valor.toFixed(2)}</div>
              <div className="toy-category">
                <span>📁 {toy.categoria || 'Sem categoria'}</span>
              </div>
              <div className="toy-stock">
                📦 Estoque: {toy.quantidadeEstoque} un.
              </div>
              <div className="toy-actions">
                <button className="btn-cart">Comprar</button>
                <button className="btn-wishlist">❤️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedToys;
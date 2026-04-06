import React, { useState } from 'react';
import './FeaturedToys.css';

const DiscountedToys = ({ toys = [] }) => {
  const [selectedToy, setSelectedToy] = useState(null);
  
  // 🔥 Filtra só os brinquedos com desconto
  const discountedToys = Array.isArray(toys)
    ? toys.filter(toy => Number(toy.desconto) > 0)
    : [];

  if (discountedToys.length === 0) return null;

  return (
    <section className="featured-toys">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Promoções</h2>
        </div>

        <button
          className="view-all"
          onClick={() => window.location.href = '/produtos'}
        >
          Ver todos → 
        </button>
      </div>

      <div className="toys-grid">
        {discountedToys.map(toy => (
          <div 
            key={toy.id} 
            className="toy-card"
            onMouseEnter={() => setSelectedToy(toy)}
            onMouseLeave={() => setSelectedToy(null)}
          >
            {/* LADO ESQUERDO - IMAGEM */}
            <div className="toy-image">
              {toy.imagens && toy.imagens.length > 0 ? (
                <img src={toy.imagens[0]} alt={toy.nomeBrinquedo} />
              ) : (
                <span className="toy-emoji">🧸</span>
              )}
            </div>

            {/* LADO DIREITO - DETALHES QUE APARECEM AO PASSAR MOUSE */}
            {selectedToy === toy && (
              <div className="toy-details-sidebar">
                <h4>Detalhes do Produto</h4>
                <p><strong>Nome:</strong> {toy.nomeBrinquedo}</p>
                <p><strong>Marca:</strong> {toy.marca?.nome || 'Não informada'}</p>
                <p><strong>Categoria:</strong> {toy.categoria?.nome || 'Sem categoria'}</p>
                <p><strong>Idade:</strong> {toy.idadeRecomendada || 'Livre'}</p>
                <p><strong>Estoque:</strong> {toy.quantidadeEstoque ?? 0} un.</p>
                <p><strong>Descrição:</strong> {toy.descricao || 'Sem descrição'}</p>
                <button className="btn-buy">Comprar Agora</button>
              </div>
            )}

            {/* INFO PRINCIPAL */}
            <div className="toy-info">
              <h3 className="toy-title">{toy.nomeBrinquedo}</h3>

			  <div className="toy-price">
			    <span className="original-price">
			      R$ {Number(toy.valor).toFixed(2)}
			    </span>
                {' '}→{' '}
				<span className="discounted-price">
				    R$ {(toy.valor - (toy.valor * toy.desconto / 100)).toFixed(2)}
				  </span>
				</div>

              <div className="toy-category">
                📁 {toy.categoria?.nome || 'Sem categoria'}
              </div>

              <div className="toy-stock">
                📦 Estoque: {toy.quantidadeEstoque ?? 0} un.
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscountedToys;
import React from 'react';
import './ProductModal.css';
import Footer from '../../components/Footer';



const ProductModal = ({ produto, onClose }) => {
  if (!produto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
	  
	  
	  
	  
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-image-side">
            {produto.imagens && produto.imagens[0] ? (
              <img src={produto.imagens[0]} alt={produto.nomeBrinquedo} />
            ) : (
              <div className="modal-placeholder">🧸</div>
            )}
          </div>

          <div className="modal-info-side">
            <span className="modal-category">{produto.categoria?.nome}</span>
            <h2>{produto.nomeBrinquedo}</h2>
            <p className="modal-brand">Marca: <strong>{produto.marca?.nome}</strong></p>
            
            <div className="modal-price">
              R$ {produto.valor?.toFixed(2)}
            </div>

            <div className="modal-tags">
              <span className="tag-age">👶 {produto.idadeRecomendada || 'Livre'}</span>
              <span className={`tag-stock ${produto.quantidadeEstoque > 0 ? 'in' : 'out'}`}>
                {produto.quantidadeEstoque > 0 ? `Estoque: ${produto.quantidadeEstoque}` : 'Esgotado'}
              </span>
            </div>

            <div className="modal-description">
              <h3>Sobre o brinquedo</h3>
              <p>{produto.descricao || 'Nenhuma descrição detalhada disponível para este brinquedo.'}</p>
            </div>

            <button className="btn-buy-now">
              Adicionar ao Carrinho 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
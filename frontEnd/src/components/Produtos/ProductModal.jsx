import React, { useState } from 'react'; // Adicionado useState
import './ProductModal.css';

const ProductModal = ({ produto, onClose }) => {
  const [indexFoto, setIndexFoto] = useState(0); // Estado para o carrossel

  if (!produto) return null;

  const imagens = produto.imagens || [];
  const temImagens = imagens.length > 0;
  const temDesconto = Number(produto.desconto) > 0;
  const valorOriginal = Number(produto.valor);
  const valorFinal = temDesconto ? valorOriginal - (valorOriginal * (produto.desconto / 100)) : valorOriginal;

  // Funções de navegação
  const proximaFoto = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) => (prev + 1 === imagens.length ? 0 : prev + 1));
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleWhatsAppClick = () => {
    const telefone = "5511999999999"; // Coloque um número fictício ou o seu para testar
    const mensagem = `Olá! Vi o brinquedo "${produto.nomeBrinquedo}" na vitrine da Eva Toys e gostaria de mais informações.`;
    
    // EncodeURIComponent serve para transformar espaços e símbolos em código de URL
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    
    // Abre em uma nova aba
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="eva-modal-body">
          <div className="modal-image-side">
            {temImagens ? (
              <div className="carousel-container">
                <img src={imagens[indexFoto]} alt={produto.nomeBrinquedo} className="modal-img-main" />
                
                {/* Só mostra setas se tiver mais de uma imagem */}
                {imagens.length > 1 && (
                  <>
                    <button className="nav-btn prev" onClick={fotoAnterior}>&#10094;</button>
                    <button className="nav-btn next" onClick={proximaFoto}>&#10095;</button>
                    <div className="carousel-dots">
                      {imagens.map((_, i) => (
                        <span key={i} className={`dot ${i === indexFoto ? 'active' : ''}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="modal-placeholder">🧸</div>
            )}
          </div>

          <div className="modal-info-side">
            <span className="modal-category">{produto.categoria?.nome}</span>
            <h2>{produto.nomeBrinquedo}</h2>
            <p className="modal-brand">Marca: <strong>{produto.marca?.nome}</strong></p>
            
          <div className="modal-price-container">
            {temDesconto ? (
              <>
                <div className="modal-price-row">
                  <span className="modal-price-original">R$ {valorOriginal.toFixed(2)}</span>
                  <span className="modal-tag-promo">-{produto.desconto}% OFF</span>
                </div>
                <div className="modal-price">R$ {valorFinal.toFixed(2)}</div>
              </>
            ) : (
              <div className="modal-price">R$ {valorOriginal.toFixed(2)}</div>
            )}
          </div>

            <div className="modal-tags">
              <span className="tag-age">👶 {produto.idadeRecomendada || 'Livre'}</span>
              <span className={`tag-stock ${produto.quantidadeEstoque > 0 ? 'in' : 'out'}`}>
                {produto.quantidadeEstoque > 0 ? `Estoque: ${produto.quantidadeEstoque}` : 'Esgotado'}
              </span>
            </div>

            <div className="modal-description">
              <h3>Sobre o brinquedo</h3>
              <p>{produto.descricao || 'Nenhuma descrição detalhada disponível.'}</p>
            </div>

            <button 
              className="btn-buy-now" 
              onClick={handleWhatsAppClick}
              disabled={produto.quantidadeEstoque <= 0} // Desativa se estiver esgotado
              style={{ 
                backgroundColor: '#25D366', // Cor  WhatsApp
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px' 
              }}
            >
              {produto.quantidadeEstoque > 0 ? (
                <>Quero este Brinquedo!</>
              ) : (
                <>Produto Indisponível 😢</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
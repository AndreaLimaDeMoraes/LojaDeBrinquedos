import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedToys.css';

const FeaturedToys = ({ brinquedos = [] }) => {
  const navigate = useNavigate();

  // Lógica de Priorização (Ordenação Multi-nível)
  const sortedToys = Array.isArray(brinquedos)
    ? [...brinquedos] // Criamos uma cópia para não alterar o array original
        .sort((a, b) => {
          // 1º Critério: Destaque (1 vem antes de 0)
          if (Number(b.destacar) !== Number(a.destacar)) {
            return Number(b.destacar) - Number(a.destacar);
          }
          // 2º Critério: Maior Desconto (dentro do grupo de destaque ou fora dele)
          return (Number(b.desconto) || 0) - (Number(a.desconto) || 0);
        })
        .slice(0, 8) // Agora mostramos um pouco mais (ex: 8), já que inclui todos
    : [];

  if (sortedToys.length === 0) return null;

  return (
    <section id="destaques" className="featured-toys">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Brinquedos Em Destaque</h2>
        </div>
        <button className="view-all" onClick={() => navigate('/produtos')}>
          Ver todos →
        </button>
      </div>

      <div className="toys-grid">
        {sortedToys.map((toy) => {
          const temDesconto = Number(toy.desconto) > 0;
          const valorOriginal = Number(toy.valor);
          
          // Cálculo do preço com desconto
          const valorComDesconto = temDesconto 
            ? valorOriginal - (valorOriginal * (Number(toy.desconto) / 100))
            : valorOriginal;

          return (
            <div 
              key={toy.id} 
              className="produto-card" 
              onClick={() => navigate(`/produtos?id=${toy.id}`)}
            >
              <div className="produto-img-wrapper">
                {/* Tag de Desconto (Só aparece se tiver desconto) */}
                {temDesconto && (
                  <div className="tag-desconto">
                    -{toy.desconto}%
                  </div>
                )}
                
                {toy.imagens && toy.imagens[0] ? (
                  <img src={toy.imagens[0]} alt={toy.nomeBrinquedo} className="produto-img" />
                ) : (
                  <div className="produto-placeholder">🧸</div>
                )}
              </div>
              
              <div className="produto-info">
                <h4>{toy.nomeBrinquedo}</h4>
                
                <div className="produto-preco-container">
                  {temDesconto ? (
                    <>
                      <span className="preco-antigo">R$ {valorOriginal.toFixed(2)}</span>
                      <span className="produto-preco">R$ {valorComDesconto.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="produto-preco">R$ {valorOriginal.toFixed(2)}</span>
                  )}
                </div>
                
                <button className="btn-comprar">
                  {temDesconto ? 'Aproveitar Oferta' : 'Ver Detalhes'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedToys;
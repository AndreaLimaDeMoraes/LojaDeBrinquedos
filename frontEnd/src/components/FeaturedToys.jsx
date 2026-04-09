import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedToys.css';

const FeaturedToys = ({ brinquedos = [] }) => {
  const navigate = useNavigate();
  const [quantidadeExibida, setQuantidadeExibida] = useState(4); // Começa com 4 por padrão

  // --- LÓGICA DE RESPONSIVIDADE DINÂMICA ---
  useEffect(() => {
    const atualizarQuantidade = () => {
      const larguraTela = window.innerWidth;
      
      // O seu CSS tem padding de 5% de cada lado (total 10%). 
      // Multiplicar por 0.9 nos dá a largura "útil" real da tela.
      const larguraUtil = larguraTela * 0.9; 
      
      // Cada card tem um min-width de 240px + um gap de 25px no grid = ~265px de espaço ocupado
      const tamanhoOcupadoPorCard = 265;
      
      // Dividimos a tela útil pelo tamanho do card e arredondamos para baixo.
      // O Math.max(1, ...) garante que pelo menos 1 brinquedo sempre apareça no mobile.
      const quantidadeQueCabe = Math.max(1, Math.floor(larguraUtil / tamanhoOcupadoPorCard));
      
      setQuantidadeExibida(quantidadeQueCabe);
    };

    // Executa a conta logo que o componente é montado na tela
    atualizarQuantidade();

    // Fica escutando caso o usuário redimensione a janela (ou vire o celular de lado)
    window.addEventListener('resize', atualizarQuantidade);
    
    // Limpa o event listener quando o componente for desmontado para não pesar a memória
    return () => window.removeEventListener('resize', atualizarQuantidade);
  }, []);

  // --- LÓGICA DE PRIORIZAÇÃO ---
  const sortedToys = Array.isArray(brinquedos)
    ? [...brinquedos] 
        .sort((a, b) => {
          // 1º Critério: Destaque (1 vem antes de 0)
          if (Number(b.destacar) !== Number(a.destacar)) {
            return Number(b.destacar) - Number(a.destacar);
          }
          // 2º Critério: Maior Desconto
          return (Number(b.desconto) || 0) - (Number(a.desconto) || 0);
        })
        // Aqui está a mágica: usamos o número dinâmico calculado acima!
        .slice(0, quantidadeExibida)
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
                {/* Tag de Desconto */}
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
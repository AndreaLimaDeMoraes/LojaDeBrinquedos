import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Certifique-se de que o caminho está correto
import './BrandCarousel.css';
import { useNavigate } from 'react-router-dom';


function BrandCarousel() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Busca as marcas no seu Back-end Spring Boot
    api.get('/marcas')
      .then(response => {
        setBrands(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar marcas:", err);
        setLoading(false);
      });
  }, []);

  if (loading || brands.length === 0) return null;

  // Duplicamos para o efeito de scroll infinito não ter "buracos"
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="brands-section">
      <p className="brands-subtitle">Marcas Parceiras</p>
      <div className="brands-container">
        <div className="brands-track">
          {duplicatedBrands.map((brand, index) => (
        <div 
          className="brand-item" 
          key={`${brand.id}-${index}`} 
          onClick={() => navigate(`/produtos?marca=${brand.id}`)}
        >
          {/* Ajustado para logoUrl que vem do Spring Boot */}
          {brand.logoUrl ? (
            <div className="brand-wrapper">
              <img 
                src={brand.logoUrl} 
                alt={brand.nome} 
                className="brand-logo-img" 
                onError={(e) => {
                  // Caso o link do Cloudinary quebre, ele não mostra um ícone de imagem quebrada
                  e.target.style.display = 'none';
                }}
              />
              <span className="brand-name-under">{brand.nome}</span>
            </div>
          ) : (
            <div className="brand-logo-mockup">
              {brand.nome}
            </div>
          )}
        </div>
      ))}
        </div>
      </div>
    </div>
  );
}

export default BrandCarousel;
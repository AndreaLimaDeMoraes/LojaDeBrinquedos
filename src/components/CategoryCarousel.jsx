// src/components/CategoryCarousel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCarousel.css'; // Vamos criar esse CSS depois

function CategoryCarousel({ categories }) { // Mudado para 'categories' para clareza
  const navigate = useNavigate();

  // Se não houver categorias, mostra uma mensagem de carregamento ou erro
  if (!categories || categories.length === 0) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <div className="category-carousel-container">
      <h2>Explore Nossas Categorias</h2>
      <div className="category-list">
        {categories.map(cat => (
          <div 
            key={cat.id} 
            className="category-card" 
            onClick={() => navigate(`/produtos/${cat.id}`)}
          >
            <p className="category-name">{cat.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
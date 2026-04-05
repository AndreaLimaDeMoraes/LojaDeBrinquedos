import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCarousel.css';

function CategoryCarousel({ categories }) {
  const navigate = useNavigate();

  if (!categories || categories.length === 0) return null;

  // Triplicamos para o efeito de "parede" preencher bem a tela
  const duplicatedCategories = [...categories, ...categories];

  const handleMouseEnter = (e) => {
    const randomDegree = Math.floor(Math.random() * 21) - 10;
    e.currentTarget.style.setProperty('--rotation', `${randomDegree}deg`);
  };

  const RenderRow = ({ id, directionClass }) => (
  <div className="slider-wrapper">
    <div className={`slider-track ${directionClass}`} id={id}>
      {duplicatedCategories.map((cat, index) => (
        /* O hover principal acontece aqui no wrapper */
        <div 
          className="category-wrapper" 
          key={`${id}-${index}`}
          onMouseEnter={handleMouseEnter}
          onClick={() => navigate(`/produtos?categoria=${cat.id}`)}
        >
          <div className="category-card">
            <div className="card-content">
              <p className="category-name">{cat.nome}</p>
              <p className="category-description">
                {cat.descricao || "Confira os melhores produtos desta categoria!"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  return (
    <div className="category-carousel-container">
      <h2 className="carousel-title">Explore Nossas Categorias</h2>
      <p1 className="carousel-subtitle">Clique em uma categoria para ver mais produtos!</p1>
      <RenderRow id="row-1" directionClass="scroll-left" />
      <RenderRow id="row-2" directionClass="scroll-right" />

    </div>
  );
}

export default CategoryCarousel;
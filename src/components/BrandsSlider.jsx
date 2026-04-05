import React from 'react';
import './BrandsSlider.css';

const brands = ['Mattel', 'Estrela', 'Hasbro', 'LEGO', 'Fisher-Price', 'Grow'];

const BrandsSlider = () => {
  return (
    <section className="brands">
      <h2 className="section-title">Marcas Parceiras</h2>
      <div className="brands-slider">
        <div className="brands-track">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-item">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSlider;
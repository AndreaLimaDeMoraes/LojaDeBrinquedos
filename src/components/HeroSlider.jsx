import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const slides = [
  {
    title: 'Bem-vindos à Loja de Brinquedos',
    description: 'O lugar onde a imaginação ganha vida!',
    buttonText: 'Conheça a nossa loja',
    image: '/pelucia1.jpg'
  },
  {
    title: 'Brinquedos para todas as idades',
    description: 'Da infância à adolescência, temos o presente perfeito!',
    buttonText: 'Explorar agora',
    image: '/carros.jpg'
  },
  {
    title: 'Frete Grátis para todo o Brasil',
    description: 'Nas compras acima de R$ 199,90',
    buttonText: 'Ver ofertas',
    image: '/lego.jpg'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          {/* Imagem de fundo separada */}
          <div 
            className="slide-bg"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Overlay escuro APENAS sobre a imagem */}
          <div className="slide-overlay"></div>
          
          {/* Conteúdo (texto e botão) fica acima */}
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className="btn-primary">{slide.buttonText}</button>
          </div>
        </div>
      ))}
      
      <button className="slider-btn prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}>
        ❮
      </button>
      <button className="slider-btn next" onClick={() => goToSlide((currentSlide + 1) % slides.length)}>
        ❯
      </button>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
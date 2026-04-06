import React from 'react';
import './Shortcuts.css';

const shortcuts = [
  { icon: '🏷️', label: 'Ofertas' },
  { icon: '⭐', label: 'Mais Vendidos' },
  { icon: '🎁', label: 'Lançamentos' },
  { icon: '👶', label: 'Por Idade' },
  { icon: '🚚', label: 'Frete Grátis' },
  { icon: '%', label: 'Descontos' }
];

const Shortcuts = () => {
  return (
    <section className="shortcuts">
      <h2 className="section-title">Atalhos</h2>
      <div className="shortcuts-grid">
        {shortcuts.map((item, index) => (
          <div key={index} className="shortcut-card">
            <div className="shortcut-icon">{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shortcuts;
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#2C2C1F', 
      color: 'white', 
      paddingTop: '3rem',
      marginTop: '2rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        padding: '0 5% 3rem'
      }}>
        <div>
          <h4>Loja de Brinquedos</h4>
          <p>Levando alegria e diversão para crianças de todas as idades desde 2026.</p>
        </div>
        <div>
          <h4>Institucional</h4>
          <a href="#" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Sobre nós</a>
          <a href="#" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Nossa equipe</a>
        </div>
        <div>
          <h4>Atendimento</h4>
          <a href="#" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Central de ajuda</a>
          <a href="#" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Fale conosco</a>
          <a href="#" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Trocas e devoluções</a>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Receba ofertas exclusivas</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                border: 'none', 
                borderRadius: '5px' 
              }} 
            />
            <button style={{ 
              padding: '0.5rem 1rem', 
              background: '#CCD5AE', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}>
              📧
            </button>
          </div>
        </div>
      </div>
      <div style={{ 
        textAlign: 'center', 
        padding: '1.5rem', 
        borderTop: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <p>&copy; 2026 Loja de Brinquedos do AVA - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
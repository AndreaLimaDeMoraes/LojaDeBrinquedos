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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5% 3rem',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
	  
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h4>Loja de Brinquedos</h4>
          <p>Levando alegria e diversão para crianças de todas as idades desde 2026.</p>
        </div>
		
		<div style={{ flex: 1, textAlign: 'right' }}>
		  <h4>Institucional</h4>
		  <a href="#team-section" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Sobre nós</a>
		  <a href="/sobre" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Nossa equipe</a>
		  <a href="#fale-conosco" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '0.5rem' }}>Fale conosco</a>
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
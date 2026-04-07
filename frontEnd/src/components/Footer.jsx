import React from 'react';

const Footer = () => {
  return (
    <footer>
      
      <div style={{
        borderTop: '3px dashed var(--toy-blue)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop : '50px',
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
		  <a href="#team-section" style={{ display: 'block', color: '#5a5a5a', textDecoration: 'none', marginBottom: '0.5rem' }}>Sobre nós</a>
		  <a href="/sobre" style={{ display: 'block', color: '#5a5a5a', textDecoration: 'none', marginBottom: '0.5rem' }}>Nossa equipe</a>
		  <a href="#fale-conosco" style={{ display: 'block', color: '#5a5a5a', textDecoration: 'none', marginBottom: '0.5rem' }}>Fale conosco</a>
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
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollOrNavigate = (id) => {
    // Se já está na Home → scroll
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
navigate(`/?scrollTo=${id}`);    }
  };

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
          <h4>Eva Toys</h4>
          <p>Levando alegria e diversão para crianças de todas as idades desde 2026.</p>
        </div>
		
		<div style={{ flex: 1, textAlign: 'right' }}>
		  <h4>Institucional</h4>

		  {/* SOBRE (TEAM) */}
		  <span 
        onClick={() => handleScrollOrNavigate('team-section')}
        style={{ display: 'block', color: '#5a5a5a', marginBottom: '0.5rem', cursor: 'pointer' }}
      >
        Sobre nós
      </span>

		  {/* NOSSA EQUIPE (rota) */}
		  <span 
        onClick={() => navigate('/sobre')}
        style={{ display: 'block', color: '#5a5a5a', marginBottom: '0.5rem', cursor: 'pointer' }}
      >
        Nossa equipe
      </span>

		  {/* CONTATO */}
		  <span 
        onClick={() => handleScrollOrNavigate('fale-conosco')}
        style={{ display: 'block', color: '#5a5a5a', marginBottom: '0.5rem', cursor: 'pointer' }}
      >
        Fale conosco
      </span>

		</div>
		
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '1.5rem', 
        borderTop: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <p>&copy; 2026 Loja de Brinquedos do EVA - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
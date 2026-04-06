import React from 'react';
import './TeamSection.css';



const about = [
  {
    title: 'Nossa História',
    text: 'A Loja de Brinquedos EVA nasceu com o objetivo de levar alegria e diversão para crianças de todas as idades, oferecendo produtos de qualidade e confiança.',
    image: '/loja.jpg'
  },
  {
    title: 'Nossa Missão',
    text: 'Proporcionar momentos felizes através de brinquedos que estimulam a criatividade, imaginação e desenvolvimento infantil.',
    image: '/missao.jpg'
  },
  {
    title: 'Nossos Valores',
    text: 'Trabalhamos com amor, qualidade e responsabilidade, sempre pensando no bem-estar das crianças e na satisfação dos nossos clientes.',
    image: '/valores.jpg'
  },
  {
    title: 'Nossa Visão',
    text: 'Ser referência no mercado de brinquedos, reconhecida pela excelência no atendimento e pela experiência encantadora oferecida.',
    image: '/visao.jpg'
  }
];


const TeamSection = () => {
  return (
	
    <section id="team-section" className="team">
      <h2 className="section-title">Sobre a Loja EVA 🧸</h2>
	  
	  {/* 🔥 BANNER */}
	    <div className="team-banner">
	      <div className="team-banner-text">
	        <h2>Sobre Nós</h2>
	        <p>
	          A Loja de Brinquedos EVA foi criada para levar alegria, diversão e
	          esperança para todos, independente da idade, com produtos de
	          qualidade e muito carinho em cada detalhe.
	        </p>
	      </div>

	      <div className="team-banner-image">
	        🦊
	      </div>
	    </div>

      <div className="team-grid">
        {about.map((item, index) => (
          <div key={index} className="team-card">

            <div className="team-image">
              <img src={item.image} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p>{item.text}</p>
			
          </div>
		  
		  
        ))}
      </div>
	  <hr className="home-divider" />
	  
	  <div id="fale-conosco" className="store-header">
	  	      <h3>Fale Conosco</h3>
	  	      <p>Estamos aqui para ajudar e responder suas perguntas</p>
	  	    </div>
	  
	  <div className="store-info-section">

	    <div className="store-info-grid">
	      {/* Coluna da esquerda - Informações de contato */}
	      <div className="store-contact">
	        <div className="contact-item">
	          <div className="contact-icon">📍</div>
	          <div className="contact-details">
	            <h4>Endereço</h4>
	            <p>Rua dos Brinquedos, 123</p>
	            <p>Centro - São Paulo, SP</p>
	            <p>CEP: 01000-000</p>
	          </div>
	        </div>

	        <div className="contact-item">
	          <div className="contact-icon">📞</div>
	          <div className="contact-details">
	            <h4>Telefone</h4>
	            <p>(11) 99999-9999</p>
	            <p>Segunda a Sexta, 9h às 18h</p>
	          </div>
	        </div>

	        <div className="contact-item">
	          <div className="contact-icon">✉️</div>
	          <div className="contact-details">
	            <h4>Email</h4>
	            <p>contato@evatoys.com.br</p>
	            <p>Respondemos em até 24h</p>
	          </div>
	        </div>

	        <div className="contact-item">
	          <div className="contact-icon">🕒</div>
	          <div className="contact-details">
	            <h4>Horário de Funcionamento</h4>
	            <p>Segunda a Sexta: 9h às 18h</p>
	            <p>Sábado: 9h às 14h</p>
	            <p>Domingo: Fechado</p>
	          </div>
	        </div>
	      </div>
	  	      
		  <div className="store-map">
		    <h4>🗺️ Como Chegar</h4>
		    <iframe 
		      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.091!2d-46.633308!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
		      width="100%" 
		      height="400"  /* ← MUDE AQUI: 250 para 350 ou 400 */
		      style={{ border: 0, borderRadius: '10px' }}
		      allowFullScreen=""
		      loading="lazy"
		      title="Mapa da loja"
		    ></iframe>
		  </div>
	  	    </div>
	  	  </div>
	  
	  
    </section>
	
	
  );
};

export default TeamSection;
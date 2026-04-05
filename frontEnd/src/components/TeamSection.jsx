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
    <section className="team">
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
	  
	  
    </section>
  );
};

export default TeamSection;
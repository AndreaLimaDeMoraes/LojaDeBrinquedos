import React, { useState } from 'react';
import './Sobre.css';

const Sobre = () => {
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const equipe = [
    { 
      nome: "ANDREA LIMA", 
      ra: "1234567890", 
      cargo: "Desenvolvedora Full Stack", 
      icone: "👩‍💻",
      github: "https://github.com/AndreaLimaDeMoraes",
      linkedin: "https://www.linkedin.com/in/andrea-moraes-lm/",
      bio: "Apaixonada por tecnologia e por transformar ideias em código funcional. Responsável por integrar o front-end com o back-end Spring Boot."
    },
    { 
      nome: "ANGELO CORREIA", 
      ra: "1234567890", 
      cargo: "Desenvolvedor Front-end", 
      icone: "🚀",
      github: "https://github.com/christoferoAngelo",
      linkedin: "https://www.linkedin.com/in/angelo-christofero-211207373/",
      bio: "Focado em criar interfaces modernas e responsivas. Especialista em garantir que a experiência do usuário seja fluida e intuitiva."
    },
    { 
      nome: "AYLA PEDROGA", 
      ra: "1234567890", 
      cargo: "UX/UI Design", 
      icone: "🎨",
      github: "https://github.com/Ayla-05",
      linkedin: "https://www.linkedin.com/in/ayla-pedroga-rossi-6b9210320/",
      bio: "Criativa e detalhista, responsável pela identidade visual mágica e pelas cores pastéis que dão vida à nossa vitrine."
    },
    { 
      nome: "FERNANDO DOMINGOS", 
      ra: "1234567890", 
      cargo: "Analista de Sistemas", 
      icone: "⚙️",
      github: "https://github.com/fernandokeijo",
      linkedin: "https://www.linkedin.com/in/fernandokdomingos/",
      bio: "Especialista em lógica e estrutura de dados. Garante que todo o fluxo do sistema esteja funcionando de forma robusta e segura."
    },
  ];

  return (
    <div className="sobre-container">
      <div className="sobre-header">
        <h1>Nossa Equipe Mágica 🌟</h1>
        <p>Clique em um integrante para saber mais!</p>
      </div>

      <div className="equipe-grid">
        {equipe.map((membro, index) => (
          <div 
            className="membro-circle" 
            key={index} 
            onClick={() => setMembroSelecionado(membro)}
            style={{ cursor: 'pointer' }}
          >
            <div className="foto-wrapper">
              <div className="foto-placeholder-new">
                <span>{membro.icone}</span>
              </div>
            </div>
            <h3>{membro.nome}</h3>
            <p className="cargo-text">{membro.cargo}</p>
            <span className="ra-text">RA {membro.ra}</span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {membroSelecionado && (
        <div className="modal-overlay" onClick={() => setMembroSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setMembroSelecionado(null)}>&times;</button>
            
            <div className="modal-header">
                <span className="modal-icon">{membroSelecionado.icone}</span>
                <h2>{membroSelecionado.nome}</h2>
                <p className="modal-cargo">{membroSelecionado.cargo}</p>
            </div>
            
            <p className="modal-bio">{membroSelecionado.bio}</p>
            
            <div className="modal-links">
              <a href={membroSelecionado.github} target="_blank" rel="noreferrer" className="link-btn github">
                GitHub
              </a>
              <a href={membroSelecionado.linkedin} target="_blank" rel="noreferrer" className="link-btn linkedin">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sobre;
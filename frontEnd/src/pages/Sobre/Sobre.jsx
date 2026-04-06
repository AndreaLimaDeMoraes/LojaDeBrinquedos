import React, { useState } from 'react';
import './Sobre.css';
import { useNavigate } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTrello, 
  FaCode, 
  FaArrowLeft 
} from 'react-icons/fa';

// Importação das fotos
import fotoAndrea from '../../assets/equipe/andrea.jpg';
import fotoAngelo from '../../assets/equipe/angelo.jpg';
import fotoAyla from '../../assets/equipe/ayla.jpg';
import fotoFernando from '../../assets/equipe/fernando.jpg';

const Sobre = () => {
  const navigate = useNavigate();
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const equipe = [
    { 
      nome: "ANDREA LIMA", 
      ra: "1670482412033", 
      cargo: "Desenvolvedora Full Stack", 
      foto: fotoAndrea,
      github: "https://github.com/AndreaLimaDeMoraes",
      linkedin: "https://www.linkedin.com/in/andrea-moraes-lm/",
      bio: "Atuou na criação do backend da categoria e no front end das telas 'Sobre a Equipe' e 'Administração do Site'."
    },
    { 
      nome: "ANGELO CORREIA", 
      ra: "1670482412029", 
      cargo: "Desenvolvedor Full Stack", 
      foto: fotoAngelo,
      github: "https://github.com/christoferoAngelo",
      linkedin: "https://www.linkedin.com/in/angelo-christofero-211207373/",
      bio: "Atuou na criação do backend de usuários e no front end das telas de Marcas, Promoções e Categorias."
    },
    { 
      nome: "AYLA PEDROGA", 
      ra: "1670482412034", 
      cargo: "Desenvolvedora Full Stack", 
      foto: fotoAyla,
      github: "https://github.com/Ayla-05",
      linkedin: "https://www.linkedin.com/in/ayla-pedroga-rossi-6b9210320/",
      bio: "Atuou na criação do backend de brinquedos e no front end das telas de Início e Destaques."
    },
    { 
      nome: "FERNANDO DOMINGOS", 
      ra: "1670482412014", 
      cargo: "Desenvolvedor Full Stack", 
      foto: fotoFernando,
      github: "https://github.com/fernandokeijo",
      linkedin: "https://www.linkedin.com/in/fernandokdomingos/",
      bio: "Atuou na arquitetura robusta do sistema e na segurança da informação. Colaborou no desenvolvimento de marcas no back-end e na implementação segura dos módulos de autenticação, login e registro de novos membros."
    },
  ];

  return (
    <div className="sobre-container">
      {/* Botão de Voltar posicionado no topo */}
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft /> Voltar para o Início
      </button>

      <div className="sobre-header">
        <h1>Equipe de Desenvolvimento 🌟</h1>
        <p>Unidos para transformar o Mundo Eva em realidade.</p>
        
        <div className="projeto-links">
          <a href="https://github.com/AndreaLimaDeMoraes/LojaDeBrinquedos.git" target="_blank" rel="noreferrer" className="proj-btn">
            <FaCode /> Repositório
          </a>
          <a href="https://trello.com/b/zUo1sKb7/catalogo-de-brinquedos" target="_blank" rel="noreferrer" className="proj-btn">
            <FaTrello /> Trello do Projeto
          </a>
        </div>
      </div>

      <div className="equipe-grid">
        {equipe.map((membro, index) => (
          <div 
            className="membro-circle" 
            key={index} 
            onClick={() => setMembroSelecionado(membro)}
          >
            <div className="foto-wrapper">
                <img src={membro.foto} alt={membro.nome} className="foto-membro-img" />
            </div>
            <h3>{membro.nome}</h3>
            <p className="cargo-text">{membro.cargo}</p>
            <span className="ra-text-pills">RA: {membro.ra}</span>
          </div>
        ))}
      </div>

      {/* MODAL DE DETALHES */}
      {membroSelecionado && (
        <div className="modal-overlay" onClick={() => setMembroSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setMembroSelecionado(null)}>&times;</button>
            
            <div className="modal-header-info">
                <img src={membroSelecionado.foto} alt={membroSelecionado.nome} className="modal-foto-img" />
                <h2>{membroSelecionado.nome}</h2>
                <p className="modal-cargo">{membroSelecionado.cargo}</p>
                <span className="modal-ra-simple">RA: {membroSelecionado.ra}</span>
            </div>
            
            {/* Bio centralizada que agora ocupa todo o espaço horizontal do modal */}
            <p className="modal-bio">{membroSelecionado.bio}</p>
            
            <div className="modal-links">
              <a href={membroSelecionado.github} target="_blank" rel="noreferrer" className="link-btn github">
                <FaGithub /> GitHub
              </a>
              <a href={membroSelecionado.linkedin} target="_blank" rel="noreferrer" className="link-btn linkedin">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sobre;
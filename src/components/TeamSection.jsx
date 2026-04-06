import React from 'react';
import './TeamSection.css';

const team = [
  { name: 'Andrea Moraes', role: 'Aquela que ama gatos e The Sims', image: '/andrea.jpg' },
  { name: 'Angelo Christófero', role: 'Aquele que nunca errou no Duolingo e adora francês', image: '/angelo.jpg' },
  { name: 'Ayla Rossi', role: 'Aquela que ama ursos e café', image: '/ayla.jpg' },
  { name: 'Fernando Kenji', role: 'Aquele que ama perfumes de grife e algum jogo que eu não sei o nome ', image: 'fernando.jpg' }
];

const TeamSection = () => {
  return (
    <section className="team">
      <h2 className="section-title">Nossa Equipe</h2>
      <div className="team-grid">
        {team.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="team-social">
              <a href="#">🔗</a>
              <a href="#">📷</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
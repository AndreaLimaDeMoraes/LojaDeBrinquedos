import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CategoryCarousel from '../components/CategoryCarousel';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  // Verifica se o usuário está logado (se tem token)
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    api.get('/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar categorias:", err);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Vitrine de Brinquedos 🧸</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* BOTÃO ADMIN: Só aparece se estiver logado */}
          {isAuthenticated && (
            <button 
              onClick={() => navigate('/admin')}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#27ae60', // Verde para diferenciar
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Painel Admin ⚙️
            </button>
          )}

          {/* BOTÃO DE LOGIN OU SAIR */}
          {isAuthenticated ? (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.reload(); // Recarrega para sumir o botão admin
              }}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#e74c3c', // Vermelho para Sair
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Sair
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Entrar (Login)
            </button>
          )}
        </div>
      </header>

      <hr />
      <section style={{ marginTop: '30px' }}>
        <CategoryCarousel categories={categories} />
      </section>
    </div>
  );
};

export default Home;
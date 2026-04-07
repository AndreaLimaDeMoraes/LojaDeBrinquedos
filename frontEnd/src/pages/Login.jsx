import React, { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [username,setUsername] = useState("")
  const [senha,setSenha] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try{

      const response = await api.post("/auth/login",{
        username,
        senha
      })

      localStorage.setItem("token", response.data.token)
      window.location.href="/"

    }catch(err){
      alert("Erro no login")
    }
  }

  return (

    <div className="login-page">

  {/* HEADER */}
  <header className="home-header">
    <h1 className="home-title">Vitrine de Brinquedos 🧸</h1>

    <button 
              type="button"
              className="btn-voltar"
              onClick={() => navigate("/")}
              >
              Voltar para Home
    </button>

  </header>

  <div className="login-center">

    <div className="login-card">

      {/* IMAGEM */}
      <div className="login-card-image">
        <img src="/login-image.jpeg" alt="login"/>
      </div>

      {/* FORM */}
      <div className="login-card-form">

        <h2>Entrar</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
          />

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>

  </div>

</div>

  );
};

export default Login;

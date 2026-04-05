import React, { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {

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

      {/* HEADER igual da home */}
      <header className="home-header">
        <h1 className="home-title">Vitrine de Brinquedos 🧸</h1>
      </header>

      <div className="login-layout">

        {/* LADO ESQUERDO (IMAGEM) */}
        <div className="login-image">
          <img src="/login-image.jpeg"/>
        </div>

        {/* LADO DIREITO (LOGIN) */}
        <div className="login-form-area">

          <div className="login-box">

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

            <p className="login-register">
              Não tem conta? <Link to="/register">Criar conta</Link>
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;

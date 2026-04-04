import React, { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { Link } from "react-router-dom";

const Register = () => {

  const [username,setUsername] = useState("")
  const [senha,setSenha] = useState("")
  const [confirmarSenha,setConfirmarSenha] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    if(senha !== confirmarSenha){
      alert("As senhas não coincidem")
      return
    }

    try{

      await api.post("/auth/register",{
        username,
        senha
      })

      alert("Conta criada com sucesso!")
      window.location.href="/login"

    }catch(err){
      alert("Erro ao registrar usuário")
    }

  }

  return (

    <div className="login-page">

      {/* HEADER igual da home */}
      <header className="home-header">
        <h1 className="home-title">Vitrine de Brinquedos 🧸</h1>
      </header>

      <div className="login-layout">

        {/* IMAGEM */}
        <div className="login-image">
          <img src="/login-image.jpeg" alt="login"/>
        </div>

        {/* FORM */}
        <div className="login-form-area">

          <div className="login-box">

            <h2>Criar Conta</h2>

            <form onSubmit={handleRegister}>

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

              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e)=>setConfirmarSenha(e.target.value)}
              />

              <button type="submit">
                Registrar
              </button>

            </form>

            <p className="login-register">
              Já tem conta? <Link to="/login">Entrar</Link>
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Register;

package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Usuario registrar(Usuario usuario) {

        usuario.setPassword(encoder.encode(usuario.getPassword()));

        if (usuario.getRole() == null) {
            usuario.setRole("USER");
        }

        return repository.save(usuario);
    }

    public Usuario login(String username, String password) {

        Usuario usuario = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!encoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }
}
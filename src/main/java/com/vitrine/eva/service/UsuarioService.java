package com.vitrine.eva.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitrine.eva.model.entity.Usuario;
import com.vitrine.eva.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired 
    private BCryptPasswordEncoder encoder;

    public Usuario registrar(Usuario usuario) {

        if (usuario.getUsername() == null || usuario.getUsername().isBlank()) {
            throw new RuntimeException("Nome de usuário é obrigatório");
        }

        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new RuntimeException("Senha é obrigatória");
        }

        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new RuntimeException("Email é obrigatório");
        }

        if (repository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new RuntimeException("Nome de usuário já existe");
        }

        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        usuario.setSenha(encoder.encode(usuario.getSenha()));

        return repository.save(usuario);
    }
    

    public Usuario login(String username, String password) {
        Usuario usuario = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (!encoder.matches(password, usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }
        return usuario;
    }
}
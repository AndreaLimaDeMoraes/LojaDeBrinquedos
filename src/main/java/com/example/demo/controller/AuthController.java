package com.example.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Usuario;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/register")
    public String register(Usuario usuario) {
        service.registrar(usuario);
        return "redirect:/dashboard";
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return service.login(usuario.getUsername(), usuario.getPassword());
    }
    
    @GetMapping("/me")
    public Usuario me(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userDetails.getUsuario();
    }
}
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.service.UsuarioService;

import org.springframework.security.core.Authentication;

@Controller
public class PageController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private UsuarioService service;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("usuarios", repository.findAll());
        return "dashboard";
    }

    @GetMapping("/register")
    public String registerPage(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "register";
    }

    @PostMapping("/register")
    public String register(Usuario usuario) {
        service.registrar(usuario);
        return "redirect:/dashboard";
    }
    
    @GetMapping("/edit/{id}")
    public String editPage(@PathVariable Integer id, Model model, Authentication auth) {
        checkAdmin(auth);

        Usuario usuario = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        model.addAttribute("usuario", usuario);
        return "edit";
    }
    
    @PostMapping("/edit")
    public String edit(Usuario usuario, Authentication auth) {
        checkAdmin(auth);
        Usuario existente = repository.findById(usuario.getId())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        existente.setNome(usuario.getNome());
        existente.setEmail(usuario.getEmail());

        repository.save(existente);

        return "redirect:/dashboard";
    }
    
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Integer id, Authentication auth) {
        checkAdmin(auth);
        repository.deleteById(id);
        return "redirect:/dashboard";
    }
    
    private void checkAdmin(Authentication auth) {
        boolean isAdmin = auth.getAuthorities()
            .stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            throw new RuntimeException("Acesso negado");
        }
    }
}

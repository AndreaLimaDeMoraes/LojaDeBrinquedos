package com.vitrine.eva.controller;

import com.vitrine.eva.model.entity.Usuario;
import com.vitrine.eva.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*=============================================================================================
 * 
 * 
 * 			ESSA CLASSE É UM CONTROLLER DAS AÇOES RELACIONADAS A USUÁRIO
 * 			'/me' PARA RETORNAR UM OBJETO DO USUARIO LOGADO
 * 			GET /USUARIOS PARA LISTAR TODOS E DELETE /USUARIOS/ID 
 * 			SOMENTE ADMIN*
 * 
 * ========================================================================================== */

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    // 1. Perfil do usuário logado
    @GetMapping("/me")
    public ResponseEntity<Usuario> getMeuPerfil(Authentication auth) {
        String username = auth.getName(); // Pega o username do token JWT
        return repository.findByUsername(username)
                .map(user -> {
                    user.setSenha(null); // Segurança: esconde o hash da senha no retorno
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 2. Lista todos os usuários (Apenas para ADMIN)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Usuario> listarTodos() {
        List<Usuario> usuarios = repository.findAll();
        // Limpa as senhas antes de enviar a lista
        usuarios.forEach(u -> u.setSenha(null));
        return usuarios;
    }
    
    // 3. Deletar um usuário (Apenas para ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
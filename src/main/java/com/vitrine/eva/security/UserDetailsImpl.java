package com.vitrine.eva.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.vitrine.eva.model.entity.Usuario;


/*=============================================================================================
 * 
 * 
 * 			ESSA CLASSE PRECISA EXISTIR PRA DAR OVERRIDE EM MÉTODOS 
 * 			PRÉ CONFIGURADOS DO SPRING SECURITY QUE NÓS NÃO UTILIZAMOS
 * 			NESSE PROJETO
 * 
 * 
 * ========================================================================================== */


public class UserDetailsImpl implements UserDetails {

    private Usuario usuario;

    public UserDetailsImpl(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRole()));
    }

    @Override
    public String getPassword() {
        return usuario.getSenha();
    }

    @Override
    public String getUsername() {
        return usuario.getUsername();
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public boolean isAccountNonExpired() { return true; }
    public boolean isAccountNonLocked() { return true; }
    public boolean isCredentialsNonExpired() { return true; }
    public boolean isEnabled() { return true; }
}
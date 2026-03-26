package com.vitrine.eva.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.vitrine.eva.security.JwtFilter;

import jakarta.servlet.Filter;

/*=============================================================================================
 * 
 * 
 * 			ESSA CLASSE CRIA AS CONFIGURAÇÕES DO SISTEMA DE SEGURANÇA
 * 			- /LOGIN E /REGISTER SÃO LIBERADOS PARA TODOS
 * 			- /BRINQUEDOS, /MARCAS, /CATEGORIAS E /USUARIOS SÓ É LIBERADO PARA QUEM TA LOGADO COMO ADMIN
 * 
 * 
 * ========================================================================================== */

@Configuration 
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
    private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf(csrf -> csrf.disable())
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // API sem estado
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/auth/**").permitAll() // Login e Register liberados
	            .requestMatchers("/brinquedos/**").hasRole("ADMIN") // Só admin mexe em brinquedo
	            .requestMatchers("/marcas/**").hasRole("ADMIN") // Só admin mexe em brinquedo
	            .requestMatchers("/categorias/**").hasRole("ADMIN") // Só admin mexe em brinquedo
	            .anyRequest().authenticated()
	        );
	    
	  
		// Diz para o Spring usar seu filtro de JWT antes do filtro padrão de Username/Password
	    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

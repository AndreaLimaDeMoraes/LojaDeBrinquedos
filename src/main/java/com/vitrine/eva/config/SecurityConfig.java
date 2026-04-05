package com.vitrine.eva.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .csrf(csrf -> csrf.disable())
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authorizeHttpRequests(auth -> auth
	            // 1. Liberação de GETs (Público)
	            // Adicionei "/brinquedos" e "/marcas" sem o "**" para garantir o match na raiz da rota
	            .requestMatchers(HttpMethod.GET, "/brinquedos", "/brinquedos/**").permitAll()
	            .requestMatchers(HttpMethod.GET, "/categorias", "/categorias/**").permitAll()
	            .requestMatchers(HttpMethod.GET, "/marcas", "/marcas/**", "/marca", "/marca/**").permitAll()
	            
	            // 2. Libera login e cadastro
	            .requestMatchers("/auth/**").permitAll()

	            // 3. Operações Restritas (ADMIN)
	            // Aqui o Spring vai exigir que o Token tenha o Role "ROLE_ADMIN"
	            .requestMatchers("/brinquedos/**").hasRole("ADMIN")
	            .requestMatchers("/categorias/**").hasRole("ADMIN")
	            .requestMatchers("/marcas/**").hasRole("ADMIN")
	            .requestMatchers("/marca/**").hasRole("ADMIN")
	            
	            // 4. Qualquer outra coisa exige apenas estar logado
	            .anyRequest().authenticated()
	        );
	    
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
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Libera o endereço do seu Front-end
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        // Libera os métodos que você vai usar
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Libera os headers (importante para o Token JWT funcionar)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

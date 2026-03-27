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
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // API sem estado
	        .authorizeHttpRequests(auth -> auth
	        	    // 1. Libera tudo que for do tipo GET para qualquer um (público)
	        	    .requestMatchers(HttpMethod.GET, "/brinquedos/**").permitAll()
	        	    .requestMatchers(HttpMethod.GET, "/categorias/**").permitAll()
	        	    .requestMatchers(HttpMethod.GET, "/marcas/**").permitAll()
	        	    
	        	    // 2. Libera o login e cadastro para todos
	        	    .requestMatchers("/auth/**").permitAll()

	        	    // 3. Qualquer outra operação (POST, PUT, DELETE) nesses endpoints exige ADMIN
	        	    .requestMatchers("/brinquedos/**").hasRole("ADMIN")
	        	    .requestMatchers("/categorias/**").hasRole("ADMIN")
	        	    .requestMatchers("/marcas/**").hasRole("ADMIN")
	        	    
	        	    // 4. O resto (como /usuarios/me) precisa estar apenas logado
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

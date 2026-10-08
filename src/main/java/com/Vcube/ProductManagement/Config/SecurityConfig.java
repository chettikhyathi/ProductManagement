package com.Vcube.ProductManagement.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Only ADMIN can create
                .requestMatchers(HttpMethod.POST, "/**").hasRole("ADMIN")

                // Only ADMIN can update
                .requestMatchers(HttpMethod.PUT, "/**").hasRole("ADMIN")

                // Only ADMIN can delete
                .requestMatchers(HttpMethod.DELETE, "/**").hasRole("ADMIN")

                // ADMIN + USER can view
                .requestMatchers(HttpMethod.GET, "/**").hasAnyRole("ADMIN", "USER")

                .anyRequest().authenticated()
            )
            .httpBasic(httpBasic -> {});

        return http.build();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {

        org.springframework.web.cors.CorsConfiguration configuration =
                new org.springframework.web.cors.CorsConfiguration();

        configuration.setAllowedOrigins(
                java.util.List.of("http://localhost:3001")
        );

        configuration.setAllowedMethods(
                java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                java.util.List.of("*")
        );

        configuration.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
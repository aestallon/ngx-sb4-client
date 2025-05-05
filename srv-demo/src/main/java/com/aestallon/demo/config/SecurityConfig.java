package com.aestallon.demo.config;

import java.util.Collections;
import org.smartbit4all.api.localauthentication.restserver.config.LocalAuthenticationSrvRestConfig;
import org.smartbit4all.api.session.SessionApi;
import org.smartbit4all.api.session.SessionManagementApi;
import org.smartbit4all.api.session.restserver.config.FilterChainExceptionHandler;
import org.smartbit4all.api.session.restserver.config.SessionSrvRestConfig;
import org.smartbit4all.sec.jwt.JwtSessionRequestFilter;
import org.smartbit4all.sec.jwt.JwtUtil;
import org.smartbit4all.sec.localauth.DefaultLocalAuthenticationConfig;
import org.smartbit4all.sec.localauth.SessionLocalAuthenticationProvider;
import org.smartbit4all.sec.session.SessionApiImpl;
import org.smartbit4all.sec.session.SessionManagementApiImpl;
import org.smartbit4all.sec.token.SessionTokenHandler;
import org.smartbit4all.sec.token.SessionTokenHandlerJWT;
import org.smartbit4all.sec.utils.SecurityConfigUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Import({
  SessionSrvRestConfig.class,
  LocalAuthenticationSrvRestConfig.class,
})
@Configuration
public class SecurityConfig extends DefaultLocalAuthenticationConfig {

  @Bean
  JwtUtil jwtUtil() {
    return new JwtUtil();
  }

  @Bean
  JwtSessionRequestFilter jwtFilter() {
    final var filter = new JwtSessionRequestFilter();
    final String notSkippable = "/api/";
    filter.addNotSkippableCall(HttpMethod.GET, notSkippable);
    filter.addNotSkippableCall(HttpMethod.PUT, notSkippable);
    filter.addNotSkippableCall(HttpMethod.POST, notSkippable);
    filter.addNotSkippableCall(HttpMethod.DELETE, notSkippable);
    return filter;
  }

  @Bean
  SessionTokenHandler sessionTokenHandler() {
    return new SessionTokenHandlerJWT();
  }

  @Bean
  public SessionManagementApi sessionManagementApi() {
    return new SessionManagementApiImpl();
  }

  @Bean
  public SessionApi sessionApi() {
    return new SessionApiImpl();
  }

  @Bean
  AuthenticationManager authenticationManager(
    SessionLocalAuthenticationProvider sessionLocalAuthenticationProvider) {
    return new ProviderManager(Collections.singletonList(sessionLocalAuthenticationProvider));
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http,
                                          FilterChainExceptionHandler filterChainExceptionHandler,
                                          JwtSessionRequestFilter jwtSessionRequestFilter)
    throws Exception {
    http = http
      .cors(AbstractHttpConfigurer::disable)
      .csrf(AbstractHttpConfigurer::disable)
      .sessionManagement(it -> it.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .exceptionHandling(it -> it.accessDeniedHandler(
        (req, resp, ex) -> resp.setStatus(HttpStatus.FORBIDDEN.value())))
      .authorizeHttpRequests(it -> it.anyRequest().permitAll())
      .addFilterBefore(jwtSessionRequestFilter, AnonymousAuthenticationFilter.class)
      .addFilterBefore(jwtSessionRequestFilter, UsernamePasswordAuthenticationFilter.class)
      .addFilterBefore(filterChainExceptionHandler, JwtSessionRequestFilter.class);

    SecurityConfigUtils.disableRedirectOnAccessDeniedForAnonymous(http);
    return http.build();
  }

}

package com.hotelmanagementsys.hotelmang.config;

import com.hotelmanagementsys.hotelmang.entity.SysUser;
import com.hotelmanagementsys.hotelmang.service.UserServiceImpl;
import com.hotelmanagementsys.hotelmang.util.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import static java.lang.String.format;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserServiceImpl userRepo;

	private final JwtTokenFilter jwtTokenFilter;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Qualifier("userDetailsServiceImpl")
	@Autowired
	private UserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	public WebSecurityConfig(UserServiceImpl userRepo, JwtTokenFilter jwtTokenFilter) {
		this.userRepo = userRepo;
		this.jwtTokenFilter = jwtTokenFilter;
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// configure AuthenticationManager so that it knows from where to load user for matching credentials
		// Use BCryptPasswordEncoder
		auth.userDetailsService(username -> userRepo.findByUsername(username)).orElseThrow(() -> new UsernameNotFoundException(format("User %s is not found", username)));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//
//		httpSecurity = httpSecurity.cors().and().csrf().disable()
//
//						// dont authenticate this particular request
//				httpSecurity  = httpSecurity.authorizeRequests()
//				.antMatchers("/login2", "/register", "/filterHotel", "/hotel/**", "/testingPayment", "/bookingRecord/**").permitAll()
//
//				// all other requests need to be authenticated
//				.anyRequest()
//				.authenticated()
//				.and()
//
//				// make sure we use stateless session; session won't be used to store user's state.
//				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//
//		// Add a filter to validate the tokens with every request
//		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class).cors();


		// Enable CORS and disable CSRF
		http = http.cors().and().csrf().disable();

		// Set session management to stateless
		http = http
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and();

		// Set unauthorized requests exception handler
		http = http
				.exceptionHandling()
				.authenticationEntryPoint(
						(request, response, ex) -> {
							response.sendError(
									HttpServletResponse.SC_UNAUTHORIZED,
									ex.getMessage()
							);
						}
				)
				.and();

		// Set permissions on endpoints

		http.authorizeRequests()
				.antMatchers("/register").permitAll()
				.antMatchers(HttpMethod.GET, "/filterHotel").permitAll()
				.antMatchers(HttpMethod.POST, "/hotel/**").permitAll()
				.antMatchers(HttpMethod.GET, "/testingPayment").permitAll()
				.antMatchers(HttpMethod.POST, "/bookingRecord/**").permitAll()

				//it is from the tutorial
				.antMatchers("/api/public/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/author/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/author/search").permitAll()
				.antMatchers(HttpMethod.GET, "/api/book/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/book/search").permitAll()
				// Our private endpoints
				.anyRequest().authenticated();

		// Add JWT token filter
		http.addFilterBefore(
				jwtTokenFilter,
				UsernamePasswordAuthenticationFilter.class
		);
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source =
				new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);

		assert source instanceof CorsConfigurationSource;
		return new CorsFilter((CorsConfigurationSource) source);
	}
}


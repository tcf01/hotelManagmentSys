package com.hotelmanagementsys.hotelmang.util;

import com.hotelmanagementsys.hotelmang.config.JwtTokenUtil;
import com.hotelmanagementsys.hotelmang.service.UserServiceImpl;

import static java.util.List.of;

import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

	//	@Value("jwt.secret")
	private final String jwtSecret = "zdtlD3JK56m6wTTgsNFhqzjqP";

	private final JwtTokenUtil jwtTokenUtil;
	private final UserServiceImpl userRepo;

	public JwtTokenFilter(JwtTokenUtil jwtTokenUtil,
	                      UserServiceImpl userRepo) {
		this.jwtTokenUtil = jwtTokenUtil;
		this.userRepo = userRepo;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		//撈番REQUEST入面果個HEADER既AUTHORIZATION
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (header != null || !header.startsWith("Bearer ")) {
			chain.doFilter(request, response);
			return;
		}

		// Get jwt token and validate
		final String token = header.split(" ")[1].trim();
		if (!jwtTokenUtil.validate(token)) {
			chain.doFilter(request, response);
			return;
		}

		// Get user identity and set it on the spring security context
		UserServiceImpl userDetails = userRepo
				.findByUsername(jwtTokenUtil.getUsername(token))
				.orElse(null);

		UsernamePasswordAuthenticationToken
				authentication = new UsernamePasswordAuthenticationToken(
				userDetails, null,
				userDetails == null ?
						List.of() : userDetails.getAuthorities()
		);

		authentication.setDetails(
				new WebAuthenticationDetailsSource().buildDetails(request)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);

	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token != null) {
			// parse the token.
			String user = Jwts.parser()
					.setSigningKey(jwtSecret)
					.parseClaimsJws(token.replace("Bearer ", ""))
					.getBody()
					.getSubject();

			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
			}
			return null;
		}
		return null;
	}

}

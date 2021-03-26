package com.hotelmanagementsys.hotelmang.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelmanagementsys.hotelmang.entity.SysUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTLoginFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;

	public JWTLoginFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	// 接收并解析用户凭证
	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
		try {
			SysUser user = new ObjectMapper()
					.readValue(req.getInputStream(), SysUser.class);

			System.out.println("attemptAuthentication係咪有做野？");

			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							user.getUsername(),
							user.getPassword(),
							new ArrayList<>())
			);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}


	// 用户成功登录后，这个方法会被调用，我们在这个方法里生成token
	@Override
	protected void successfulAuthentication(HttpServletRequest req,
	                                        HttpServletResponse res,
	                                        FilterChain chain,
	                                        Authentication auth) throws IOException, ServletException {

		System.out.println("successfulAuthentication係咪有做野？");
		String token = Jwts.builder()
				.setSubject(((User) auth.getPrincipal()).getUsername())
				.setPayload("userId")
				.setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 24 * 1000))
				.signWith(SignatureAlgorithm.HS512, "MyJwtSecret")
				.compact();
		res.addHeader("Authorization", "Bearer " + token);
	}
//
//	protected String responseHandler() {
//		String msg = "successful login";
//		return msg;
//	}

}

package com.hotelmanagementsys.hotelmang.controller.authController;

import com.hotelmanagementsys.hotelmang.config.JwtTokenUtil;
import com.hotelmanagementsys.hotelmang.entity.SysUser;
import com.hotelmanagementsys.hotelmang.entity.User;
import io.swagger.annotations.Api;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = "Authentication")
@RestController
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtTokenUtil jwtTokenUtil;
	private final UserViewMapper userViewMapper;


//	@Autowired
//	private UserServiceImpl userServiceImpl;
//	private AuthMapper authMapper;
//
//	@Value("${jwt.header}")
//	private String tokenHeader;
//	WebSecurityConfigurerAdapter
//
//	@Value("${STRIPE_PUBLIC_KEY}")
//	private String stripePublicKey;

	public AuthController(AuthenticationManager authenticationManager,
	                      JwtTokenUtil jwtTokenUtil,
	                      UserViewMapper userViewMapper) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenUtil = jwtTokenUtil;
		this.userViewMapper = userViewMapper;
	}

	@PostMapping(value = "/login")
	public ResponseEntity<Object> login(@RequestBody @Valid AuthRequest request) {
		/*//以下既野唔會行，因為/LOGIN果個REQUEST會比JWTLOGINFILTER接管左
		String username = userInput.getUsername();
		String password = userInput.getPassword();
		System.out.println("login係咪有做野？");
		SysUser userInfoFromBackend = userServiceImpl.findByUsername(username);
		if (userInfoFromBackend.getUsername() != null) {
			return userServiceImpl.checkPassword(password, userInfoFromBackend.getPassword());
		} else {
			return false;
		}*/
		try {
			Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

			User user = (User) authenticate.getPrincipal();

			return ResponseEntity.ok()
					.header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateAccessToken(user))
					.body(userViewMapper.toUserView(user));
		} catch (BadCredentialsException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public Integer register(@RequestBody User user) {
		return userServiceImpl.registerUser(user);
	}

	//	===================testing 2 are as below=============================
	@PostMapping(value = "api/user/signup")
	public SysUser signup(@RequestBody SysUser user) {
		user = userServiceImpl.signup(user);
		return user;
	}

}

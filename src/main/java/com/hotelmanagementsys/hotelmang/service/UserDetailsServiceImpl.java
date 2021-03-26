package com.hotelmanagementsys.hotelmang.service;

import com.hotelmanagementsys.hotelmang.dao.UserMapper;
import com.hotelmanagementsys.hotelmang.entity.SysUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private UserMapper userMapper;

	// 通过构造器注入UserRepository
	public UserDetailsServiceImpl(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SysUser user = userMapper.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("cannot find the following user: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), emptyList());
	}
}

package com.hotelmanagementsys.hotelmang.service;

import com.hotelmanagementsys.hotelmang.dao.UserMapper;
import com.hotelmanagementsys.hotelmang.entity.SysUser;
import com.hotelmanagementsys.hotelmang.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl {
	@Autowired
	public UserMapper userMapper;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;


	public List<SysUser> getAll() {
		return userMapper.getAll();
	}

	public SysUser getUserById(Integer id) {
		System.out.println("id passed in: " + id);
		return userMapper.getUserById(id);
	}

	public SysUser findByUsername(String username) {
		return userMapper.findByUsername(username);
	}

	public Boolean checkPassword(String password, String passwordFromBackend) {
		return bCryptPasswordEncoder.matches(passwordFromBackend, password);
	}

	public Integer registerUser(User user) {
		//如果USERNAME撞左，應該係即時有提醒，而唔係禁完SUBMIT之後先講，呢個諗計解決 -> add a 'check' button in fn
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		//未INSERT就GET果個USER既ID就只會係NULL
		System.out.println("fajsl" + user.getId());
		userMapper.insertUser(user);

		//呢度因為INSERT完USER, 所以會拎到果個USER既ID
		return user.getId();
	}

	//	===================testing are as below=============================

	public SysUser signup(SysUser user) {
		try {
			user.setId(UUID.randomUUID().toString());
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			userMapper.insertSelective(user);
			return user;

		} catch (Exception e) {
			System.out.print(e);
			return user;
		}
	}

}

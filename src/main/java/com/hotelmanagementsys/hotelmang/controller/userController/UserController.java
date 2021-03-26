package com.hotelmanagementsys.hotelmang.controller.userController;

import com.hotelmanagementsys.hotelmang.entity.SysUser;
import com.hotelmanagementsys.hotelmang.entity.User;
import com.hotelmanagementsys.hotelmang.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

	@Autowired
	private UserServiceImpl userServiceImpl;

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	private List<SysUser> getAllUsers() {
		return userServiceImpl.getAll();
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	private SysUser getUserById(@PathVariable String id) {
		Integer idInInt = Integer.parseInt(id);
		System.out.println(idInInt);
		return userServiceImpl.getUserById(idInInt);
	}
}

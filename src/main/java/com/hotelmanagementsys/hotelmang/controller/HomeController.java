package com.hotelmanagementsys.hotelmang.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@RequestMapping("/")
	public String index(Model model) {
		return "index";
	}

	@PreAuthorize("hasAuthority('ROLE_USER')")
	@RequestMapping(value = "/admin/test1")
	@ResponseBody
	public String adminTest1() {
		return "ROLE_USER";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@RequestMapping("/admin/test2")
	@ResponseBody
	public String adminTest2() {
		return "ROLE_ADMIN";
	}
}
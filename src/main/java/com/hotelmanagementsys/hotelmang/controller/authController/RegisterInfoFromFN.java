package com.hotelmanagementsys.hotelmang.controller.authController;

import java.io.Serializable;

public class RegisterInfoFromFN implements Serializable {
	private Integer id;
	private String username;
	private String password;
	private String telephone;
	private String chiName;
	private String engName;
	private String email;
	private String sex;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getChiName() {
		return chiName;
	}

	public void setChiName(String chiName) {
		this.chiName = chiName;
	}

	public String getEngName() {
		return engName;
	}

	public void setEngName(String engName) {
		this.engName = engName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}

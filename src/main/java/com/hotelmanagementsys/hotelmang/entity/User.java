package com.hotelmanagementsys.hotelmang.entity;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class User implements Serializable {
	private Integer id;
	private String username;
	private String password;
	private String chiName;
	private String engName;
	private String sex;
	private String telephone;
	private String email;
	private List<String> role;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRole() {
		return role;
	}

	public void setRole(List<String> role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				", chiName='" + chiName + '\'' +
				", engName='" + engName + '\'' +
				", sex='" + sex + '\'' +
				", telephone='" + telephone + '\'' +
				", email='" + email + '\'' +
				", role=" + role +
				'}';
	}
}

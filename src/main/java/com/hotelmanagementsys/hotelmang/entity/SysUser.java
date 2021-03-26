package com.hotelmanagementsys.hotelmang.entity;

import javax.persistence.*;
import java.io.Serializable;

import java.util.Date;

@Entity
public class SysUser {
	private String id;

	private String username;

	private String password;

	private String email;

	private String telephone;

	private String sex;

	private String chiName;

	private String engName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	@Override
	public String toString() {
		return "SysUser{" +
				"id='" + id + '\'' +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				", email='" + email + '\'' +
				", telephone='" + telephone + '\'' +
				", sex='" + sex + '\'' +
				", chiName=" + chiName +
				", engName=" + engName +
				'}';
	}
}

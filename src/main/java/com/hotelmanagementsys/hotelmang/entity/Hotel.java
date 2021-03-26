package com.hotelmanagementsys.hotelmang.entity;


import java.io.Serializable;
import java.util.List;

public class Hotel implements Serializable {
	private Integer id;
	private String chiName;
	private String engName;
	private String telephone;
	private List<Class> classes;

	@Override
	public String toString() {
		return "Hotel{" +
				"id=" + id +
				", chiName='" + chiName + '\'' +
				", engName='" + engName + '\'' +
				", telephone='" + telephone + '\'' +
				", classes=" + classes +
				'}';
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public List<Class> getClasses() {
		return classes;
	}

	public void setClasses(List<Class> classes) {
		this.classes = classes;
	}
}

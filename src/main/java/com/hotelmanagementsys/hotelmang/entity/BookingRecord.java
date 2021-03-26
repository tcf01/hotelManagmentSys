package com.hotelmanagementsys.hotelmang.entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

public class BookingRecord implements Serializable {

	private Integer id;
	private Integer userId;
	private Integer classId;
	private Date date;
	private boolean isActivate;
	//	private List<BookingRecord> bookingRecords;
	private List<Class> classes;


	@Override
	public String toString() {
		return "BookingRecord{" +
				"id=" + id +
				", userId=" + userId +
				", classId=" + classId +
				", date=" + date +
				", isActivate=" + isActivate +
				", classes=" + classes +
				'}';
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isActivate() {
		return isActivate;
	}

	public void setActivate(boolean activate) {
		isActivate = activate;
	}

//	public List<BookingRecord> getBookingRecords() {
//		return bookingRecords;
//	}
//
//	public void setBookingRecords(List<BookingRecord> bookingRecords) {
//		this.bookingRecords = bookingRecords;
//	}

	public List<Class> getClasses() {
		return classes;
	}

	public void setClasses(List<Class> classes) {
		this.classes = classes;
	}
}

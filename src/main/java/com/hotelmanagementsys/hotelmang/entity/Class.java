package com.hotelmanagementsys.hotelmang.entity;

import java.io.Serializable;
import java.util.List;


public class Class implements Serializable {
	private Integer id;
	private Integer hotelId;
	private String className;
	private boolean isActivate;
	private Integer totalRoom;
	private Integer availableRoom;
	private List<BookingRecord> bookingRecords;
	private List<Hotel> hotels;

	@Override
	public String toString() {
		return "Class{" +
				"id=" + id +
				", hotelId=" + hotelId +
				", className='" + className + '\'' +
				", isActivate=" + isActivate +
				", totalRoom=" + totalRoom +
				", availableRoom=" + availableRoom +
				", bookingRecords=" + bookingRecords +
				", hotels=" + hotels +
				'}';
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getHotelId() {
		return hotelId;
	}

	public void setHotelId(Integer hotelId) {
		this.hotelId = hotelId;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public boolean isActivate() {
		return isActivate;
	}

	public void setActivate(boolean activate) {
		isActivate = activate;
	}

	public Integer getTotalRoom() {
		return totalRoom;
	}

	public void setTotalRoom(Integer totalRoom) {
		this.totalRoom = totalRoom;
	}

	public Integer getAvailableRoom() {
		return availableRoom;
	}

	public void setAvailableRoom(Integer availableRoom) {
		this.availableRoom = availableRoom;
	}

	public List<BookingRecord> getBookingRecords() {
		return bookingRecords;
	}

	public void setBookingRecords(List<BookingRecord> bookingRecords) {
		this.bookingRecords = bookingRecords;
	}

	public List<Hotel> getHotels() {
		return hotels;
	}

	public void setHotels(List<Hotel> hotels) {
		this.hotels = hotels;
	}
}

package com.hotelmanagementsys.hotelmang.controller.bookingRecordController;

public class BookingInfo {
	private String startDate;
	private String endDate;
	private String userId;
	private Integer classId;
	private Boolean isActivate;

	public Boolean getActivate() {
		return isActivate;
	}

	public void setActivate(Boolean activate) {
		isActivate = activate;
	}

	@Override
	public String toString() {
		return "BookingInfo{" +
				"startDate='" + startDate + '\'' +
				", endDate='" + endDate + '\'' +
				", userId='" + userId + '\'' +
				", classId=" + classId +
				", isActivate=" + isActivate +
				'}';
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}
}

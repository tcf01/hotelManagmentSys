package com.hotelmanagementsys.hotelmang.service;

import com.hotelmanagementsys.hotelmang.controller.bookingRecordController.BookingInfo;
import com.hotelmanagementsys.hotelmang.dao.BookingRecordsMapper;
import com.hotelmanagementsys.hotelmang.entity.BookingRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingRecordsServiceImpl {

	@Autowired
	private BookingRecordsMapper bookingRecordsMapper;

	public List<BookingRecord> getAllBookingRecordsByUserId(Integer id) {
		return bookingRecordsMapper.getAllBookingRecordsByUserId(id);
	}

	public Integer insertBookingRecord(BookingInfo bookingInfo) {
		bookingRecordsMapper.insertBookingRecordToBackend(bookingInfo);
		return bookingInfo.getClassId();
	}
}

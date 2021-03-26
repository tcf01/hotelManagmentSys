package com.hotelmanagementsys.hotelmang.controller.bookingRecordController;

import com.hotelmanagementsys.hotelmang.entity.BookingRecord;
import com.hotelmanagementsys.hotelmang.service.BookingRecordsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static java.lang.Integer.parseInt;

@RestController
@CrossOrigin
public class bookingRecordController {
	@Autowired
	private BookingRecordsServiceImpl bookingRecordsServiceImpl;

	@GetMapping(value = "/bookingRecord/{id}", produces = "application/json")
//	public List<BookingRecord> getBookingRecordById(@RequestBody JSONObject id) {
	public List<BookingRecord> getBookingRecordById(@PathVariable("id") String idFromUrl) {
		Integer id = parseInt(idFromUrl);
		return bookingRecordsServiceImpl.getAllBookingRecordsByUserId(id);
	}

	@PostMapping(value = "/insertBookingRecord")
	public Integer insertBookingRecord(@RequestBody BookingInfo bookingInfo) {
		return bookingRecordsServiceImpl.insertBookingRecord(bookingInfo);
	}
}

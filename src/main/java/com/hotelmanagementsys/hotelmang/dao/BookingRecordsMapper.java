package com.hotelmanagementsys.hotelmang.dao;

import com.hotelmanagementsys.hotelmang.controller.bookingRecordController.BookingInfo;
import com.hotelmanagementsys.hotelmang.entity.BookingRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BookingRecordsMapper {
	//	@Select("Select u.id , br.*, " +
//			"h.id, h.chiName, h.engName," +
//			"c.hotelId,c.date,c.className,c.isActivate,c.totalRoom,c.availableRoom " +
//			"from users u " +
//			"INNER JOIN booking_records br ON br.userId = u.id" +
//			"INNER JOIN classes c ON c.id = br.classId " +
//			"INNER JOIN hotels h ON h.id = c.hotelId " +
//			"WHERE u.id = #{userId}")
	List<BookingRecord> getAllBookingRecordsByUserId(Integer id);


	@Insert("INSERT into booking_records(id, date, userId, classId, isActivate) values (null, #{startDate}, #{userId}, #{classId}, #{isActivate})")
	@Options(useGeneratedKeys = true, keyProperty = "userId")
	Integer insertBookingRecordToBackend(BookingInfo bookingInfo);
}

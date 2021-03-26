package com.hotelmanagementsys.hotelmang.dao;

import com.hotelmanagementsys.hotelmang.entity.Hotel;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

public interface SearchMapper {

	List filterHotel(@Param("startDate") String startDate, @Param("endDate") String endDate);

	List<Hotel> getHotelById(@Param("id") Integer id);

	@Results(value = {
			@Result(column = "id", property = "id", id = true),
			@Result(column = "chiName", property = "chiName"),
			@Result(column = "engName", property = "engName"),
			@Result(column = "id", property = "classes", many = @Many(select = "getAllClass")),
			@Result(column = "telephone", property = "telephone")
	})
	@Select("Select * from hotels")
	List<Map<String, Hotel>> getAllHotels();

	@Select("Select * from classes " +
			"left join hotels on hotels.id = classes.hotelId " +
			"WHERE classes.hotelId = #{hotels.id}")
	@Results({
//			@Result(column = "id", property = "id", id = true),
			@Result(column = "hotelId", property = "hotelId"),
			@Result(column = "className", property = "className"),
			@Result(column = "isActivate", property = "isActivate"),
			@Result(column = "totalRoom", property = "totalRoom"),
			@Result(column = "availableRoom", property = "availableRoom"),
//			@Result(column = "{id, startDate, endDate}", property = "bookingRecords", many = @Many(select = "getBookingRecords"))
	})
	List<Map<String, Class>> getAllClass();

}



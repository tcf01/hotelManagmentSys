package com.hotelmanagementsys.hotelmang.service;

import com.hotelmanagementsys.hotelmang.dao.SearchMapper;
import com.hotelmanagementsys.hotelmang.entity.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SearchServiceImpl {
	@Autowired
	public SearchMapper searchMapper;
	private Hotel hotel;

	public List<Hotel> getHotelById(Integer id) {
		return searchMapper.getHotelById(id);
	}

	public List<Map<String, Hotel>> getAllHotels() {
		return searchMapper.getAllHotels();
	}

//	public List<Hotel> getAllHotels() {
//		return searchMapper.getAllHotelRecentTesting();
//	}

	public List<Hotel> filterHotel(String startDate, String endDate) {
		List<Hotel> result = searchMapper.filterHotel(startDate, endDate);
		System.out.println("this is the result " + result);
		return result;
	}
//
}

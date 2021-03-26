package com.hotelmanagementsys.hotelmang.controller.searchController;

import com.hotelmanagementsys.hotelmang.entity.Hotel;
import com.hotelmanagementsys.hotelmang.service.SearchServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SearchController {
	@Autowired
	private SearchServiceImpl searchServiceImpl;


	@RequestMapping(value = "/filterHotel", method = RequestMethod.POST)
	public List getFilterHotels(@RequestBody dataFromFn data) {
		return searchServiceImpl.filterHotel(data.getStartDate(), data.getEndDate());
	}

	@GetMapping(value = "/hotel")
	public List<Hotel> getHotelById(@RequestParam(name = "id") Integer id) {
		return searchServiceImpl.getHotelById(id);
	}

	@RequestMapping(value = "/hotels", method = RequestMethod.GET)
	public List getAllHotels() {
		return searchServiceImpl.getAllHotels();
	}
}

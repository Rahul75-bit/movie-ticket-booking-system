package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.SeatService;

@RestController
@RequestMapping("/api/v1/seats")
@CrossOrigin(origins = "http://localhost:5173")
public class UserSeatController {
	
	   @Autowired
	    private SeatService seatService;

	    @GetMapping("/screen/{screenId}")
	    public ResponseEntity<ResponseWrapper> getSeatsByScreenId(
	            @PathVariable Long screenId
	    ) {
	        return seatService.getSeatsByScreenId(screenId);
	    }
	    
	    @GetMapping("/show/{showId}")
	    public ResponseEntity<ResponseWrapper> getSeatsByShowId(@PathVariable Long showId) {
	        return seatService.getSeatsByShowId(showId);
	    }

}

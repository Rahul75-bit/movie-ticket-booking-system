package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.TheaterService;

@RestController
@RequestMapping("/api/v1/theaters")
@CrossOrigin(origins = "http://localhost:5173")
public class UserTheaterController {
	
	   @Autowired
	    private TheaterService theaterService;

	    @GetMapping
	    public ResponseEntity<ResponseWrapper> getAllTheatersForUser() {
	        return theaterService.getAllTheatersForUser();
	    }

	    @GetMapping("/city/{city}")
	    public ResponseEntity<ResponseWrapper> getTheatersByCity(@PathVariable String city) {
	        return theaterService.getTheatersByCity(city);
	    }

}

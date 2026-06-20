package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.entities.Theater;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.TheaterService;

@RestController
@RequestMapping("/api/v1/admin/theaters")
@CrossOrigin(origins = "http://localhost:5173")
public class TheaterController {
	
	 @Autowired
	    private TheaterService theaterService;

	    @PostMapping
	    public ResponseEntity<ResponseWrapper> addTheater(@RequestBody Theater theater) {
	        return theaterService.addTheater(theater);
	    }

	    @GetMapping
	    public ResponseEntity<ResponseWrapper> getAllTheaters() {
	        return theaterService.getAllTheaters();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> getTheaterById(@PathVariable Long id) {
	        return theaterService.getTheaterById(id);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> updateTheaterById(
	            @RequestBody Theater theater,
	            @PathVariable Long id
	    ) {
	        return theaterService.updateTheaterById(theater, id);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> deleteTheaterById(@PathVariable Long id) {
	        return theaterService.deleteTheaterById(id);
	    }

}

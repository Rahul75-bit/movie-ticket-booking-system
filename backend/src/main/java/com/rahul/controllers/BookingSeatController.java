package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.repositories.BookingSeatRepository;

@RestController
@RequestMapping("/api/v1/booking-seats")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingSeatController {
	
	 @Autowired
	    private BookingSeatRepository bookingSeatRepository;

	    @GetMapping("/booking/{bookingId}")
	    public ResponseEntity<?> getSeatsByBookingId(@PathVariable Long bookingId) {
	        return ResponseEntity.ok(
	                bookingSeatRepository.findByBookingBookingId(bookingId)
	        );
	    }

}

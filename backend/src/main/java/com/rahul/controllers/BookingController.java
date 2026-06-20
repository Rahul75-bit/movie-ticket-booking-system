package com.rahul.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.BookingService;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
	
	 @Autowired
	    private BookingService bookingService;

	    @PostMapping("/user/{userId}/show/{showId}")
	    public ResponseEntity<ResponseWrapper> createBooking(
	            @PathVariable Long userId,
	            @PathVariable Long showId,
	            @RequestBody List<Long> seatIds
	    ) {
	        return bookingService.createBooking(userId, showId, seatIds);
	    }

	    @GetMapping
	    public ResponseEntity<ResponseWrapper> getAllBookings() {
	        return bookingService.getAllBookings();
	    }

	    @GetMapping("/{bookingId}")
	    public ResponseEntity<ResponseWrapper> getBookingById(@PathVariable Long bookingId) {
	        return bookingService.getBookingById(bookingId);
	    }

	    @GetMapping("/user/{userId}")
	    public ResponseEntity<ResponseWrapper> getBookingsByUserId(@PathVariable Long userId) {
	        return bookingService.getBookingsByUserId(userId);
	    }

	    @PutMapping("/cancel/{bookingId}")
	    public ResponseEntity<ResponseWrapper> cancelBooking(@PathVariable Long bookingId) {
	        return bookingService.cancelBooking(bookingId);
	    }

}

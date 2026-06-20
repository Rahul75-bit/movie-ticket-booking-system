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

import com.rahul.entities.Seat;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.SeatService;

@RestController
@RequestMapping("/api/v1/admin/seats")
@CrossOrigin(origins = "http://localhost:5173")
public class SeatController {
	
	 @Autowired
	    private SeatService seatService;

	    @PostMapping("/screen/{screenId}")
	    public ResponseEntity<ResponseWrapper> addSeat(
	            @PathVariable Long screenId,
	            @RequestBody Seat seat
	    ) {
	        return seatService.addSeat(screenId, seat);
	    }

	    @GetMapping
	    public ResponseEntity<ResponseWrapper> getAllSeats() {
	        return seatService.getAllSeats();
	    }

	    @GetMapping("/{seatId}")
	    public ResponseEntity<ResponseWrapper> getSeatById(@PathVariable Long seatId) {
	        return seatService.getSeatById(seatId);
	    }

	    @GetMapping("/screen/{screenId}")
	    public ResponseEntity<ResponseWrapper> getSeatsByScreenId(@PathVariable Long screenId) {
	        return seatService.getSeatsByScreenId(screenId);
	    }

	    @PutMapping("/{seatId}")
	    public ResponseEntity<ResponseWrapper> updateSeatById(
	            @PathVariable Long seatId,
	            @RequestBody Seat seat
	    ) {
	        return seatService.updateSeatById(seatId, seat);
	    }

	    @DeleteMapping("/{seatId}")
	    public ResponseEntity<ResponseWrapper> deleteSeatById(@PathVariable Long seatId) {
	        return seatService.deleteSeatById(seatId);
	    }
	    
	    @PostMapping("/generate/{screenId}")
	    public ResponseEntity<ResponseWrapper> generateSeats(@PathVariable Long screenId) {
	        return seatService.generateSeats(screenId);
	    }

}

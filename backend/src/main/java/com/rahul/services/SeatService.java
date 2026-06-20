package com.rahul.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rahul.dto.SeatResponseDto;
import com.rahul.entities.MovieShow;
import com.rahul.entities.Screen;
import com.rahul.entities.Seat;
import com.rahul.repositories.BookingSeatRepository;
import com.rahul.repositories.MoviesShowRepository;
import com.rahul.repositories.ScreenRepository;
import com.rahul.repositories.SeatRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class SeatService {

	   @Autowired
	    private SeatRepository seatRepository;

	    @Autowired
	    private ScreenRepository screenRepository;

	    @Autowired
	    private UniversalResponse response;
	    
	    @Autowired
	    private MoviesShowRepository moviesShowRepository;
	    
	    @Autowired
	    private BookingSeatRepository bookingSeatRepository;

	    public ResponseEntity<ResponseWrapper> addSeat(Long screenId, Seat seat) {

	        Optional<Screen> screenOptional = screenRepository.findById(screenId);

	        if (screenOptional.isEmpty()) {
	            return response.send("Screen not found with id " + screenId, null, HttpStatus.NOT_FOUND);
	        }

	        seat.setScreen(screenOptional.get());

	        if (seat.getIsBooked() == null) {
	            seat.setIsBooked(false);
	        }

	        Seat savedSeat = seatRepository.save(seat);

	        return response.send("Seat added successfully", savedSeat, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getAllSeats() {
	        return response.send("Seats found successfully", seatRepository.findAll(), HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getSeatById(Long seatId) {

	        Optional<Seat> seatOptional = seatRepository.findById(seatId);

	        if (seatOptional.isPresent()) {
	            return response.send("Seat found successfully", seatOptional.get(), HttpStatus.OK);
	        }

	        return response.send("Seat not found with id " + seatId, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> getSeatsByScreenId(Long screenId) {
	        return response.send(
	                "Seats found successfully",
	                seatRepository.findByScreenScreenId(screenId),
	                HttpStatus.OK
	        );
	    }

	    public ResponseEntity<ResponseWrapper> updateSeatById(Long seatId, Seat seat) {

	        Optional<Seat> seatOptional = seatRepository.findById(seatId);

	        if (seatOptional.isEmpty()) {
	            return response.send("Seat not found with id " + seatId, null, HttpStatus.NOT_FOUND);
	        }

	        Seat existingSeat = seatOptional.get();

	        existingSeat.setSeatNumber(seat.getSeatNumber());
	        existingSeat.setSeatType(seat.getSeatType());
	        existingSeat.setIsBooked(seat.getIsBooked());

	        Seat updatedSeat = seatRepository.save(existingSeat);

	        return response.send("Seat updated successfully", updatedSeat, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> deleteSeatById(Long seatId) {

	        Optional<Seat> seatOptional = seatRepository.findById(seatId);

	        if (seatOptional.isPresent()) {
	            Seat seat = seatOptional.get();
	            seatRepository.deleteById(seatId);

	            return response.send("Seat deleted successfully", seat, HttpStatus.OK);
	        }

	        return response.send("Seat not found with id " + seatId, null, HttpStatus.NOT_FOUND);
	    }
	    
	    public ResponseEntity<ResponseWrapper> getSeatsByShowId(Long showId) {

	        MovieShow show = moviesShowRepository.findById(showId).orElse(null);

	        if (show == null) {
	            return response.send("Show not found", null, HttpStatus.NOT_FOUND);
	        }

	        Long screenId = show.getScreen().getScreenId();

	        List<Seat> seats = seatRepository.findByScreenScreenId(screenId);

	        List<SeatResponseDto> seatResponse = seats.stream().map(seat -> {

	        	boolean booked = bookingSeatRepository
	        	        .existsBySeatSeatIdAndBookingMovieShowShowIdAndBookingBookingStatus(
	        	                seat.getSeatId(),
	        	                showId,
	        	                "CONFIRMED"
	        	        );

	            return new SeatResponseDto(
	                    seat.getSeatId(),
	                    seat.getSeatNumber(),
	                    seat.getSeatType(),
	                    booked
	            );
	        }).toList();

	        return response.send("Seats found successfully", seatResponse, HttpStatus.OK);
	    }
	    
	    public ResponseEntity<ResponseWrapper> generateSeats(Long screenId) {

	        Optional<Screen> screenOptional = screenRepository.findById(screenId);

	        if (screenOptional.isEmpty()) {
	            return response.send("Screen not found with id " + screenId, null, HttpStatus.NOT_FOUND);
	        }

	        Screen screen = screenOptional.get();

	        String[] rows = {"A", "B", "C", "D", "E"};

	        for (String row : rows) {
	            for (int i = 1; i <= 10; i++) {

	                String seatNumber = row + i;

	                boolean exists = seatRepository
	                        .existsByScreenScreenIdAndSeatNumber(screenId, seatNumber);

	                if (exists) {
	                    continue;
	                }

	                Seat seat = new Seat();
	                seat.setSeatNumber(seatNumber);

	                if (row.equals("A") || row.equals("B")) {
	                    seat.setSeatType("REGULAR");
	                } else if (row.equals("C") || row.equals("D")) {
	                    seat.setSeatType("PREMIUM");
	                } else {
	                    seat.setSeatType("VIP");
	                }

	                seat.setIsBooked(false);
	                seat.setScreen(screen);

	                seatRepository.save(seat);
	            }
	        }

	        return response.send("50 seats generated successfully", null, HttpStatus.OK);
	    }
}

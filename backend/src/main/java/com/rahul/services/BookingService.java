package com.rahul.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rahul.entities.Booking;
import com.rahul.entities.BookingSeat;
import com.rahul.entities.MovieShow;
import com.rahul.entities.Seat;
import com.rahul.entities.User;
import com.rahul.repositories.BookingRepository;
import com.rahul.repositories.BookingSeatRepository;
import com.rahul.repositories.MoviesShowRepository;
import com.rahul.repositories.SeatRepository;
import com.rahul.repositories.UserRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class BookingService {

	  @Autowired
	    private BookingRepository bookingRepository;

	    @Autowired
	    private BookingSeatRepository bookingSeatRepository;

	    @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private MoviesShowRepository movieShowRepository;

	    @Autowired
	    private SeatRepository seatRepository;

	    @Autowired
	    private UniversalResponse response;
   
	    
	    public ResponseEntity<ResponseWrapper> createBooking(
	            Long userId,
	            Long showId,
	            List<Long> seatIds
	    ) {
	        Optional<User> userOptional = userRepository.findById(userId);

	        if (userOptional.isEmpty()) {
	            return response.send("User not found with id " + userId, null, HttpStatus.NOT_FOUND);
	        }

	        Optional<MovieShow> showOptional = movieShowRepository.findById(showId);

	        if (showOptional.isEmpty()) {
	            return response.send("Show not found with id " + showId, null, HttpStatus.NOT_FOUND);
	        }

	        MovieShow movieShow = showOptional.get();

	        for (Long seatId : seatIds) {
	            Optional<Seat> seatOptional = seatRepository.findById(seatId);

	            if (seatOptional.isEmpty()) {
	                return response.send("Seat not found with id " + seatId, null, HttpStatus.NOT_FOUND);
	            }

	            boolean alreadyBooked = bookingSeatRepository
	                    .existsBySeatSeatIdAndBookingMovieShowShowIdAndBookingBookingStatus(
	                            seatId,
	                            showId,
	                            "CONFIRMED"
	                    );

	            if (alreadyBooked) {
	                return response.send(
	                        "Seat already booked for this show: " + seatOptional.get().getSeatNumber(),
	                        null,
	                        HttpStatus.BAD_REQUEST
	                );
	            }
	        }

	        double totalAmount = movieShow.getTicketPrice() * seatIds.size();

	        Booking booking = new Booking();
	        booking.setUser(userOptional.get());
	        booking.setMovieShow(movieShow);
	        booking.setBookingDate(LocalDateTime.now());
	        booking.setTotalAmount(totalAmount);
	        booking.setBookingStatus("CONFIRMED");

	        Booking savedBooking = bookingRepository.save(booking);

	        for (Long seatId : seatIds) {
	            Seat seat = seatRepository.findById(seatId).get();

	            BookingSeat bookingSeat = new BookingSeat();
	            bookingSeat.setBooking(savedBooking);
	            bookingSeat.setSeat(seat);

	            bookingSeatRepository.save(bookingSeat);
	        }

	        return response.send("Booking confirmed successfully", savedBooking, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getAllBookings() {
	        return response.send("Bookings found successfully", bookingRepository.findAll(), HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getBookingById(Long bookingId) {
	        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);

	        if (bookingOptional.isPresent()) {
	            return response.send("Booking found successfully", bookingOptional.get(), HttpStatus.OK);
	        }

	        return response.send("Booking not found with id " + bookingId, null, HttpStatus.NOT_FOUND);
	    }

//	    public ResponseEntity<ResponseWrapper> getBookingsByUserId(Long userId) {
//	        return response.send(
//	                "User bookings found successfully",
//	                bookingRepository.findByUserUserId(userId),
//	                HttpStatus.OK
//	        );
//	    }
	    
	    public ResponseEntity<ResponseWrapper> getBookingsByUserId(Long userId) {
	        return response.send(
	                "User bookings found successfully",
	                bookingRepository.findByUserUserIdAndHiddenByUserFalse(userId),
	                HttpStatus.OK
	        );
	    }


	    
	    public ResponseEntity<ResponseWrapper> cancelBooking(Long bookingId) {
	        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);

	        if (bookingOptional.isEmpty()) {
	            return response.send("Booking not found with id " + bookingId, null, HttpStatus.NOT_FOUND);
	        }

	        Booking booking = bookingOptional.get();
	        booking.setBookingStatus("CANCELLED");

	        Booking updatedBooking = bookingRepository.save(booking);

	        return response.send("Booking cancelled successfully", updatedBooking, HttpStatus.OK);
	    }
	    
	    public ResponseEntity<ResponseWrapper> hideBooking(Long bookingId) {
	        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);

	        if (bookingOptional.isEmpty()) {
	            return response.send("Booking not found with id " + bookingId, null, HttpStatus.NOT_FOUND);
	        }

	        Booking booking = bookingOptional.get();

	        if (!"CANCELLED".equals(booking.getBookingStatus())) {
	            return response.send("Only cancelled bookings can be removed", null, HttpStatus.BAD_REQUEST);
	        }

	        booking.setHiddenByUser(true);
	        bookingRepository.save(booking);

	        return response.send("Booking removed successfully", booking, HttpStatus.OK);
	    }
}

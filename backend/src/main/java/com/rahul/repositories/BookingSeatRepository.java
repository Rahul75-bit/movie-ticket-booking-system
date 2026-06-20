package com.rahul.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahul.entities.BookingSeat;


@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {


    List<BookingSeat> findByBookingBookingId(Long bookingId);
    boolean existsBySeatSeatIdAndBookingMovieShowShowIdAndBookingBookingStatus(
            Long seatId,
            Long showId,
            String bookingStatus
    );
}

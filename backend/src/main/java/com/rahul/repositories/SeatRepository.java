package com.rahul.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.rahul.entities.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

	List<Seat> findByScreenScreenId(Long screenId);
	
	boolean existsByScreenScreenIdAndSeatNumber(Long screenId, String seatNumber);
}

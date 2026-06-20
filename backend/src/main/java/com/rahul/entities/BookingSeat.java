package com.rahul.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class BookingSeat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookingSeatId;
	
	@ManyToOne
	@JoinColumn(name = "booking_id")
	private Booking booking;
	
	@ManyToOne
	@JoinColumn(name = "seat_id")
	private Seat seat;

}

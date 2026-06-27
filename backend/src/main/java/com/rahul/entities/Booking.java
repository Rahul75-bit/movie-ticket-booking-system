package com.rahul.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Booking {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookingId;
	
	private Integer numberOfTickets;
	
	private Double totalAmount;
	
	private LocalDateTime bookingTime;
	
	private String bookingStatus;
	
	private LocalDateTime bookingDate;
	
	private Boolean hiddenByUser = false;
	
	private String email;
	private String paymentStatus;
	
	
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "show_id")
	private MovieShow movieShow;

}

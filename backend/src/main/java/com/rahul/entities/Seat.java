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
public class Seat {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long seatId;
	
	private String seatNumber;
	
	private String seatType;   

    private Boolean isBooked = false;
    
	@ManyToOne
	@JoinColumn(name = "screen_id")
	private Screen screen;
	

}

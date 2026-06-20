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
public class Screen {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long screenId;
	
	private Integer screenNo;
	
	private Integer totalSeats;
	
	@ManyToOne
	@JoinColumn(name = "theater_id")
	private Theater theater;

}

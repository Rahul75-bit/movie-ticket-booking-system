package com.rahul.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "movie_shows")
public class MovieShow {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long showId;
	
	private LocalDate showDate;
	
	private LocalTime showTime;
	
	private Double ticketPrice;
	
	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;
	
	@ManyToOne
	@JoinColumn(name = "screen_id")
	private Screen screen;
	
	

}

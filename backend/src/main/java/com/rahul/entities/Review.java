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
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long reviewId;
	
	private Integer rating;
	
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;

}

package com.rahul.entities;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
@CrossOrigin("*")
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long movieId;
	
	private String movieImgUrl;
	
	
	private String title;
	
	
	private String genre;
	
	
	private String language;
	
	
	private Integer duration;
	
	@Column(length = 350)
	private String description;
	
	
	private LocalDate releaseDate;
	
	
	private Double averageRating = 0.0;
	
	
	

}

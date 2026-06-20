package com.rahul.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Theater {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long theaterId;
	
	private String name;
	
	private String city;
	
	@Column(length = 500)
	private String address;
	
	private String theaterImgUrl;

}

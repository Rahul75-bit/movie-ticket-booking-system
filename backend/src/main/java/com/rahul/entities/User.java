package com.rahul.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userId;
	
	private String name;
	
	private String profileImgUrl;
	
	@Column(unique = true)
	private String email;
	
	private String password;
	
	private String phone;
	
	@Enumerated(EnumType.STRING)
	private Role role;

}

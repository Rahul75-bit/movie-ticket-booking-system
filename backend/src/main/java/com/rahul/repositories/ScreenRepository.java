package com.rahul.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.rahul.entities.Screen;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long>{

	List<Screen> findByTheaterTheaterId(Long theaterId);
}

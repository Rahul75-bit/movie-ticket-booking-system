package com.rahul.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahul.entities.Theater;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long> {

	List<Theater> findByCityIgnoreCase(String city);
}

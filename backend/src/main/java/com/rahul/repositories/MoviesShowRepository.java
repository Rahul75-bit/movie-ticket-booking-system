package com.rahul.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahul.entities.MovieShow;

@Repository
public interface MoviesShowRepository extends JpaRepository<MovieShow, Long> {
	
	List<MovieShow> findByMovieMovieId(Long movieId);
	List<MovieShow> findByScreenTheaterTheaterId(Long theaterId);
}

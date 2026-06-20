package com.rahul.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.rahul.entities.Movie;
import com.rahul.repositories.MovieRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class MovieService {
	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	UniversalResponse response;
	
	
	

	public ResponseEntity<ResponseWrapper> addMovie(Movie movie)
	{
		Movie savedMovie=movieRepository.save(movie);
		return response.send("Movie Saved", savedMovie, HttpStatus.OK);
	}
	

//	public ResponseEntity<ResponseWrapper> getAllMovies()
//	{
//		Iterator<Movie>	allMovies=movieRepository.findAll().iterator();
//		return response.send("Following Movies are Founded", allMovies, HttpStatus.FOUND);
//	}
	
	public ResponseEntity<ResponseWrapper> getAllMovies()
	{
	    return response.send(
	            "Following Movies are Found",
	            movieRepository.findAll(),
	            HttpStatus.OK
	    );
	}


	public ResponseEntity<ResponseWrapper> updateMovieById(Movie movie, long id)
	{
		Optional<Movie>	existingMovie=movieRepository.findById(id);
		if(existingMovie.isPresent())
		{
			
			Movie updatedMovie = existingMovie.get();

	        updatedMovie.setTitle(movie.getTitle());
	        updatedMovie.setGenre(movie.getGenre());
	        updatedMovie.setLanguage(movie.getLanguage());
	        updatedMovie.setDuration(movie.getDuration());
	        updatedMovie.setDescription(movie.getDescription());
	        
	        updatedMovie.setReleaseDate(movie.getReleaseDate());
	        updatedMovie.setMovieImgUrl(movie.getMovieImgUrl());

	        Movie savedMovie = movieRepository.save(updatedMovie);

	        return response.send("Following movie with id " + id + " is updated",savedMovie,HttpStatus.OK);
	    }
	    else
	    {
	        return response.send("Following movie with id " + id + " does not exist",null,HttpStatus.NOT_FOUND);
	    }
		
	}
	
	public ResponseEntity<ResponseWrapper> deleteMovieById(Long id)
	{
		Optional<Movie> existingMovie = movieRepository.findById(id);

		if(existingMovie.isPresent())
		{
			Movie movie = existingMovie.get();

			movieRepository.deleteById(id);

			return response.send("Following movie with id " + id + " is deleted",movie,HttpStatus.OK);
		}
		else
		{
			return response.send("Following movie with id " + id + " does not exist",null,HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<ResponseWrapper> getMovieById(Long id)
	{
		Optional<Movie> existingMovie = movieRepository.findById(id);

		if(existingMovie.isPresent())
		{
			Movie movie = existingMovie.get();

			return response.send("Following movie with id " + id + " is founded",movie,HttpStatus.OK);
		}
		else
		{
			return response.send("Following movie with id " + id + " does not exist",null,HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	
	
	
	
	
	
	

}

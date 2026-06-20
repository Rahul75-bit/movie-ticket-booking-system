package com.rahul.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rahul.entities.Movie;
import com.rahul.entities.MovieShow;
import com.rahul.entities.Screen;
import com.rahul.repositories.MovieRepository;
import com.rahul.repositories.MoviesShowRepository;
import com.rahul.repositories.ScreenRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class MovieShowService {
	
	   @Autowired
	    private MoviesShowRepository movieShowRepository;

	    @Autowired
	    private MovieRepository movieRepository;

	    @Autowired
	    private ScreenRepository screenRepository;

	    @Autowired
	    private UniversalResponse response;

	    public ResponseEntity<ResponseWrapper> addShow(
	            Long movieId,
	            Long screenId,
	            MovieShow movieShow
	    ) {
	        Optional<Movie> movieOptional = movieRepository.findById(movieId);

	        if (movieOptional.isEmpty()) {
	            return response.send("Movie not found with id " + movieId, null, HttpStatus.NOT_FOUND);
	        }

	        Optional<Screen> screenOptional = screenRepository.findById(screenId);

	        if (screenOptional.isEmpty()) {
	            return response.send("Screen not found with id " + screenId, null, HttpStatus.NOT_FOUND);
	        }

	        movieShow.setMovie(movieOptional.get());
	        movieShow.setScreen(screenOptional.get());

	        MovieShow savedShow = movieShowRepository.save(movieShow);

	        return response.send("Show added successfully", savedShow, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getAllShows() {
	        return response.send(
	                "Shows found successfully",
	                movieShowRepository.findAll(),
	                HttpStatus.OK
	        );
	    }

	    public ResponseEntity<ResponseWrapper> getShowById(Long showId) {
	        Optional<MovieShow> existingShow = movieShowRepository.findById(showId);

	        if (existingShow.isPresent()) {
	            return response.send("Show found successfully", existingShow.get(), HttpStatus.OK);
	        }

	        return response.send("Show not found with id " + showId, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> updateShowById(
	            Long showId,
	            Long movieId,
	            Long screenId,
	            MovieShow movieShow
	    ) {
	        Optional<MovieShow> existingShowOptional = movieShowRepository.findById(showId);

	        if (existingShowOptional.isEmpty()) {
	            return response.send("Show not found with id " + showId, null, HttpStatus.NOT_FOUND);
	        }

	        Optional<Movie> movieOptional = movieRepository.findById(movieId);

	        if (movieOptional.isEmpty()) {
	            return response.send("Movie not found with id " + movieId, null, HttpStatus.NOT_FOUND);
	        }

	        Optional<Screen> screenOptional = screenRepository.findById(screenId);

	        if (screenOptional.isEmpty()) {
	            return response.send("Screen not found with id " + screenId, null, HttpStatus.NOT_FOUND);
	        }

	        MovieShow existingShow = existingShowOptional.get();

	        existingShow.setShowDate(movieShow.getShowDate());
	        existingShow.setShowTime(movieShow.getShowTime());
	        existingShow.setTicketPrice(movieShow.getTicketPrice());
	        existingShow.setMovie(movieOptional.get());
	        existingShow.setScreen(screenOptional.get());

	        MovieShow updatedShow = movieShowRepository.save(existingShow);

	        return response.send("Show updated successfully", updatedShow, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> deleteShowById(Long showId) {
	        Optional<MovieShow> existingShow = movieShowRepository.findById(showId);

	        if (existingShow.isPresent()) {
	            MovieShow show = existingShow.get();

	            movieShowRepository.deleteById(showId);

	            return response.send("Show deleted successfully", show, HttpStatus.OK);
	        }

	        return response.send("Show not found with id " + showId, null, HttpStatus.NOT_FOUND);
	    }
	    
	    public ResponseEntity<ResponseWrapper> getShowsByMovieId(Long movieId)
	    {
	        return response.send(
	                "Shows found successfully",
	                movieShowRepository.findByMovieMovieId(movieId),
	                HttpStatus.OK
	        );
	    }
	    
	    public ResponseEntity<ResponseWrapper> getShowsByTheaterId(Long theaterId) {
	        return response.send(
	                "Shows found successfully",
	                movieShowRepository.findByScreenTheaterTheaterId(theaterId),
	                HttpStatus.OK
	        );
	    }
}

package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.entities.MovieShow;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.MovieShowService;

@RestController
@RequestMapping("/api/v1/admin/shows")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieShowController {
	
	  @Autowired
	    private MovieShowService movieShowService;

	  @GetMapping
	  public ResponseEntity<ResponseWrapper> getAllShows() {
	      return movieShowService.getAllShows();
	  }

	  @GetMapping("/{showId}")
	  public ResponseEntity<ResponseWrapper> getShowById(@PathVariable Long showId) {
	      return movieShowService.getShowById(showId);
	  }
	  
	  @PostMapping("/movie/{movieId}/screen/{screenId}")
	    public ResponseEntity<ResponseWrapper> addShow(
	            @PathVariable Long movieId,
	            @PathVariable Long screenId,
	            @RequestBody MovieShow movieShow
	    ) {
	        return movieShowService.addShow(movieId, screenId, movieShow);
	    }

	  @PutMapping("/{showId}/movie/{movieId}/screen/{screenId}")
	  public ResponseEntity<ResponseWrapper> updateShowById(
	          @PathVariable Long showId,
	          @PathVariable Long movieId,
	          @PathVariable Long screenId,
	          @RequestBody MovieShow movieShow
	  ) {
	      return movieShowService.updateShowById(showId, movieId, screenId, movieShow);
	  }

	  @DeleteMapping("/{showId}")
	  public ResponseEntity<ResponseWrapper> deleteShowById(@PathVariable Long showId) {
	      return movieShowService.deleteShowById(showId);
	  }
	  
	  @GetMapping("/movie/{movieId}")
	  public ResponseEntity<ResponseWrapper> getShowsByMovieId(@PathVariable Long movieId) {
	      return movieShowService.getShowsByMovieId(movieId);
	  }
	  
	  @GetMapping("/theater/{theaterId}")
	  public ResponseEntity<ResponseWrapper> getShowsByTheaterId(
	          @PathVariable Long theaterId
	  ) {
	      return movieShowService.getShowsByTheaterId(theaterId);
	  }

}

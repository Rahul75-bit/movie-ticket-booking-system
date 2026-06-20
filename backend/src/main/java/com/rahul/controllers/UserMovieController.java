package com.rahul.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.MovieService;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class UserMovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<ResponseWrapper> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }
}
package com.rahul.controllers;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rahul.entities.Movie;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.MovieService;


import tools.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/v1/admin/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    private MovieService movieService;
    
   
    private final String uploadDir =
            System.getProperty("user.dir") + "/uploads/images/";

    @PostMapping
    public ResponseEntity<ResponseWrapper> addMovie(
            @RequestPart("movieObject") String movieObject,
            @RequestPart("movieImage") MultipartFile movieImage
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        Movie movie = mapper.readValue(movieObject, Movie.class);

        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + movieImage.getOriginalFilename();

        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, movieImage.getBytes());

        movie.setMovieImgUrl(fileName);

        return movieService.addMovie(movie);
    }

    @GetMapping
    public ResponseEntity<ResponseWrapper> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper> updateMovieById(
            @PathVariable Long id,
            @RequestPart("movieObject") String movieObject,
            @RequestPart(value = "movieImage", required = false) MultipartFile movieImage
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        Movie movie = mapper.readValue(movieObject, Movie.class);

        if (movieImage != null && !movieImage.isEmpty()) {
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + movieImage.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);
            Files.write(path, movieImage.getBytes());

            movie.setMovieImgUrl(fileName);
        }

        return movieService.updateMovieById(movie, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper> deleteMovieById(@PathVariable Long id) {
        return movieService.deleteMovieById(id);
    }
    
  
}
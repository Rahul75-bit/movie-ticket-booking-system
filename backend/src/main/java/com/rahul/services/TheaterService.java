package com.rahul.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rahul.entities.Theater;
import com.rahul.repositories.TheaterRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class TheaterService {

	  @Autowired
	    private TheaterRepository theaterRepository;

	    @Autowired
	    private UniversalResponse response;

	    public ResponseEntity<ResponseWrapper> addTheater(Theater theater) {
	        Theater savedTheater = theaterRepository.save(theater);
	        return response.send("Theater saved successfully", savedTheater, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getAllTheaters() {
	        return response.send("Theaters found successfully", theaterRepository.findAll(), HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getTheaterById(Long id) {
	        Optional<Theater> existingTheater = theaterRepository.findById(id);

	        if (existingTheater.isPresent()) {
	            return response.send("Theater found successfully", existingTheater.get(), HttpStatus.OK);
	        }

	        return response.send("Theater not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> updateTheaterById(Theater theater, Long id) {
	        Optional<Theater> existingTheater = theaterRepository.findById(id);

	        if (existingTheater.isPresent()) {
	            Theater updatedTheater = existingTheater.get();

	            updatedTheater.setName(theater.getName());
	            updatedTheater.setAddress(theater.getAddress());
	            updatedTheater.setTheaterImgUrl(theater.getTheaterImgUrl());

	            Theater savedTheater = theaterRepository.save(updatedTheater);

	            return response.send("Theater updated successfully", savedTheater, HttpStatus.OK);
	        }

	        return response.send("Theater not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> deleteTheaterById(Long id) {
	        Optional<Theater> existingTheater = theaterRepository.findById(id);

	        if (existingTheater.isPresent()) {
	            Theater theater = existingTheater.get();
	            theaterRepository.deleteById(id);

	            return response.send("Theater deleted successfully", theater, HttpStatus.OK);
	        }

	        return response.send("Theater not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }
	    
	    public ResponseEntity<ResponseWrapper> getAllTheatersForUser() {
	        return response.send(
	                "Theaters found successfully",
	                theaterRepository.findAll(),
	                HttpStatus.OK
	        );
	    }

	    public ResponseEntity<ResponseWrapper> getTheatersByCity(String city) {
	        return response.send(
	                "Theaters found successfully",
	                theaterRepository.findByCityIgnoreCase(city),
	                HttpStatus.OK
	        );
	    }
}

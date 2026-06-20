package com.rahul.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rahul.entities.Screen;
import com.rahul.entities.Theater;
import com.rahul.repositories.ScreenRepository;
import com.rahul.repositories.TheaterRepository;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.response_wrapper.UniversalResponse;

@Service
public class ScreenService {

	   @Autowired
	    private ScreenRepository screenRepository;

	    @Autowired
	    private TheaterRepository theaterRepository;

	    @Autowired
	    private UniversalResponse response;

	    public ResponseEntity<ResponseWrapper> addScreen(Screen screen, Long theaterId) {
	        Optional<Theater> theaterOptional = theaterRepository.findById(theaterId);

	        if (theaterOptional.isEmpty()) {
	            return response.send("Theater not found with id " + theaterId, null, HttpStatus.NOT_FOUND);
	        }

	        screen.setTheater(theaterOptional.get());

	        Screen savedScreen = screenRepository.save(screen);

	        return response.send("Screen saved successfully", savedScreen, HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getAllScreens() {
	        return response.send("Screens found successfully", screenRepository.findAll(), HttpStatus.OK);
	    }

	    public ResponseEntity<ResponseWrapper> getScreensByTheaterId(Long theaterId) {
	        return response.send(
	                "Screens found successfully",
	                screenRepository.findByTheaterTheaterId(theaterId),
	                HttpStatus.OK
	        );
	    }

	    public ResponseEntity<ResponseWrapper> getScreenById(Long id) {
	        Optional<Screen> existingScreen = screenRepository.findById(id);

	        if (existingScreen.isPresent()) {
	            return response.send("Screen found successfully", existingScreen.get(), HttpStatus.OK);
	        }

	        return response.send("Screen not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> updateScreenById(Screen screen, Long id) {
	        Optional<Screen> existingScreen = screenRepository.findById(id);

	        if (existingScreen.isPresent()) {
	            Screen updatedScreen = existingScreen.get();

	            updatedScreen.setScreenNo(screen.getScreenNo());
	            updatedScreen.setTotalSeats(screen.getTotalSeats());

	            Screen savedScreen = screenRepository.save(updatedScreen);

	            return response.send("Screen updated successfully", savedScreen, HttpStatus.OK);
	        }

	        return response.send("Screen not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }

	    public ResponseEntity<ResponseWrapper> deleteScreenById(Long id) {
	        Optional<Screen> existingScreen = screenRepository.findById(id);

	        if (existingScreen.isPresent()) {
	            Screen screen = existingScreen.get();
	            screenRepository.deleteById(id);

	            return response.send("Screen deleted successfully", screen, HttpStatus.OK);
	        }

	        return response.send("Screen not found with id " + id, null, HttpStatus.NOT_FOUND);
	    }
}

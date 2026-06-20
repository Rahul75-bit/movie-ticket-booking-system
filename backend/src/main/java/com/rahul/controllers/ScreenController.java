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

import com.rahul.entities.Screen;
import com.rahul.response_wrapper.ResponseWrapper;
import com.rahul.services.ScreenService;

@RestController
@RequestMapping("/api/v1/admin/screens")
@CrossOrigin(origins = "http://localhost:5173")
public class ScreenController {

	 @Autowired
	    private ScreenService screenService;

	    @PostMapping("/theater/{theaterId}")
	    public ResponseEntity<ResponseWrapper> addScreen(
	            @RequestBody Screen screen,
	            @PathVariable Long theaterId
	    ) {
	        return screenService.addScreen(screen, theaterId);
	    }

	    @GetMapping
	    public ResponseEntity<ResponseWrapper> getAllScreens() {
	        return screenService.getAllScreens();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> getScreenById(@PathVariable Long id) {
	        return screenService.getScreenById(id);
	    }

	    @GetMapping("/theater/{theaterId}")
	    public ResponseEntity<ResponseWrapper> getScreensByTheaterId(@PathVariable Long theaterId) {
	        return screenService.getScreensByTheaterId(theaterId);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> updateScreenById(
	            @RequestBody Screen screen,
	            @PathVariable Long id
	    ) {
	        return screenService.updateScreenById(screen, id);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<ResponseWrapper> deleteScreenById(@PathVariable Long id) {
	        return screenService.deleteScreenById(id);
	    }
}

package com.rahul.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.rahul.reviewResponseDTO.ReviewResponse;
import com.rahul.services.ReviewService;


import lombok.RequiredArgsConstructor;
import reviewRequest.ReviewRequest;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
	
	 private final ReviewService reviewService;

	    @PostMapping("/{movieId}")
	    public ResponseEntity<String> addReview(
	            @PathVariable Long movieId,
	            @RequestBody ReviewRequest request) {

	        return ResponseEntity.ok(
	                reviewService.addReview(movieId, request)
	        );
	    }
	    
	    @GetMapping("/{movieId}")
	    public ResponseEntity<List<ReviewResponse>> getReviewsByMovieId(
	            @PathVariable Long movieId) {

	        return ResponseEntity.ok(
	                reviewService.getReviewsByMovieId(movieId)
	        );
	    }

}

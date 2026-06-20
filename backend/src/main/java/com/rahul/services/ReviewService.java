package com.rahul.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rahul.entities.Movie;
import com.rahul.entities.Review;
import com.rahul.repositories.MovieRepository;
import com.rahul.repositories.ReviewRepository;
import com.rahul.reviewResponseDTO.ReviewResponse;

import lombok.RequiredArgsConstructor;
import reviewRequest.ReviewRequest;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	 private final ReviewRepository reviewRepository;
	    private final MovieRepository movieRepository;

	    public String addReview(Long movieId, ReviewRequest request) {

	        Movie movie = movieRepository.findById(movieId)
	                .orElseThrow(() -> new RuntimeException("Movie not found"));

	        Review review = new Review();
	        review.setRating(request.getRating());
	        review.setComment(request.getComment());
	        review.setMovie(movie);

	        reviewRepository.save(review);

	        List<Review> reviews = reviewRepository.findByMovieMovieId(movieId);

	        double avg = reviews.stream()
	                .mapToInt(Review::getRating)
	                .average()
	                .orElse(0.0);

	        movie.setAverageRating(avg);
	        movieRepository.save(movie);

	        return "Review Added Successfully";
	    }

	    public List<ReviewResponse> getReviewsByMovieId(Long movieId) {

	        List<Review> reviews = reviewRepository.findByMovieMovieId(movieId);

	        return reviews.stream().map(review -> {
	            ReviewResponse response = new ReviewResponse();
	            response.setReviewId(review.getReviewId());
	            response.setRating(review.getRating());
	            response.setComment(review.getComment());
	            return response;
	        }).toList();
	    }	    
	    
	    
	    
	    
	    

}

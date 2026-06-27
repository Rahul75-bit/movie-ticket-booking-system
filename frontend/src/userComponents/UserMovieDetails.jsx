import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserMovieDetails() {
  let { id } = useParams();
  let navigate = useNavigate();

  let [movie, setMovie] = useState(null);
  let [reviews, setReviews] = useState([]);
  let [shows, setShows] = useState([]);

  let [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });

  let getToken = () => localStorage.getItem("token");

  let authHeaders = () => {
    let token = getToken();

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    getMovieById();
    getReviewsByMovieId();
    getShowsByMovieId();
  }, [id]);

  async function getMovieById() {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/movies/${id}`, {
        headers: authHeaders(),
      });

      if (!response.ok) {
        console.log("Movie API Status:", response.status);
        return;
      }

      let data = await response.json();
      setMovie(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReviewsByMovieId() {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/reviews/${id}`, {
        headers: authHeaders(),
      });

      if (!response.ok) {
        console.log("Reviews API Status:", response.status);
        setReviews([]);
        return;
      }

      let data = await response.json();

      if (Array.isArray(data)) {
        setReviews(data);
      } else if (Array.isArray(data.data)) {
        setReviews(data.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setReviews([]);
    }
  }

  async function getShowsByMovieId() {
    try {
      let response = await fetch(
        `http://localhost:8080/api/v1/admin/shows/movie/${id}`,
        {
          headers: authHeaders(),
        }
      );

      if (!response.ok) {
        console.log("Shows API Status:", response.status);
        setShows([]);
        return;
      }

      let result = await response.json();
      setShows(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.log(error);
      setShows([]);
    }
  }

  function handleReviewChange(e) {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  }

  async function submitReview(e) {
    e.preventDefault();

    let token = getToken();

    if (!token) {
      alert("Please login to submit your review.");
      navigate("/login");
      return;
    }

    try {
      let response = await fetch(`http://localhost:8080/api/v1/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(reviewData.rating),
          comment: reviewData.comment,
        }),
      });

      if (!response.ok) {
        alert("Review submit failed.");
        return;
      }

      setReviewData({
        rating: "",
        comment: "",
      });

      getMovieById();
      getReviewsByMovieId();
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectShow(show) {
    let token = getToken();

    if (!token) {
      alert("Please login to book tickets.");
      navigate("/login", {
        state: {
          redirectTo: `/movie/${id}`,
        },
      });
      return;
    }

    navigate(`/seat-selection/${show.showId}`, {
      state: {
        show,
        movie,
      },
    });
  }

  if (!movie) {
    return (
      <h2 style={{ color: "white", background: "#111827", minHeight: "100vh" }}>
        Loading movie details...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #111827 100%)",
        color: "white",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <Link to="/user" className="back-btn text-decoration-none">
          <span>←</span> Back to Movies
        </Link>

        <div className="row g-5 align-items-center p-4 p-md-5 mt-4 movie-box">
          <div className="col-lg-4">
            <img
              src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
              alt={movie.title}
              className="img-fluid w-100"
              style={{
                height: "520px",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />
          </div>

          <div className="col-lg-8">
            <h1 className="fw-bold display-5 mb-3">{movie.title}</h1>

            <p className="fs-5 mb-4" style={{ color: "#d1d5db" }}>
              {movie.description}
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="detail-box">🎭 Genre: {movie.genre}</div>
              </div>

              <div className="col-md-6">
                <div className="detail-box">
                  ⏳ Duration: {Math.floor(movie.duration / 60)}h{" "}
                  {movie.duration % 60}m
                </div>
              </div>

              <div className="col-md-6">
                <div className="detail-box">🌐 Language: {movie.language}</div>
              </div>

              <div className="col-md-6">
                <div className="detail-box">
                  ⭐ Rating:{" "}
                  {movie.averageRating
                    ? movie.averageRating.toFixed(1)
                    : "No rating yet"}{" "}
                  / 5
                </div>
              </div>

              <div className="col-md-6">
                <div className="detail-box">
                  📅 Release Date: {movie.releaseDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="review-section mt-5">
          <h2 className="fw-bold mb-4">🎟 Available Shows</h2>

          {shows.length === 0 ? (
            <p>No shows available for this movie.</p>
          ) : (
            <div className="row g-3">
              {shows.map((show) => (
                <div className="col-md-4" key={show.showId}>
                  <div className="show-card">
                    <h5 className="fw-bold mb-2">
                      {show.showDate} - {show.showTime}
                    </h5>

                    <p className="mb-2">
                      🎬 Screen:{" "}
                      {show.screen?.screenNo
                        ? `Screen ${show.screen.screenNo}`
                        : "N/A"}
                    </p>

                    <p className="mb-3">💰 Price: ₹{show.ticketPrice}</p>

                    <button
                      className="btn w-100"
                      style={{
                        background:
                          "linear-gradient(135deg, #ec4899, #8b5cf6)",
                        color: "white",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                      }}
                      onClick={() => handleSelectShow(show)}
                    >
                      Select Show
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="review-section mt-5">
          <h2 className="fw-bold mb-4">⭐ Give Your Review</h2>

          <form onSubmit={submitReview} className="review-form mb-5">
            <select
              name="rating"
              value={reviewData.rating}
              onChange={handleReviewChange}
              className="form-select mb-3"
              required
            >
              <option value="">Select Rating</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>

            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={handleReviewChange}
              className="form-control mb-3"
              rows="4"
              placeholder="Write your review..."
              required
            ></textarea>

            <button
              className="btn btn-primary px-4"
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                color: "white",
                borderRadius: "12px",
                border: "none",
                fontWeight: "600",
              }}
            >
              Submit Review
            </button>
          </form>

          <h2 className="fw-bold mb-4">User Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div className="review-card mb-3" key={review.reviewId}>
                <h5>{"⭐".repeat(review.rating)}</h5>
                <p className="mb-0">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          .movie-box, .review-section {
            background: linear-gradient(135deg, rgba(124,58,237,0.28), rgba(37,99,235,0.18));
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 30px;
            box-shadow: 0 25px 70px rgba(0,0,0,0.38);
            backdrop-filter: blur(14px);
            padding: 35px;
          }

          .detail-box, .review-card, .review-form, .show-card {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 16px 18px;
            color: #f8fafc;
          }

          .show-card {
            transition: 0.3s ease;
          }

          .show-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 45px rgba(139,92,246,0.35);
          }

          .back-btn {
            color: white;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.08);
            padding: 12px 24px;
            border-radius: 14px;
            display: inline-flex;
            gap: 10px;
          }
        `}
      </style>
    </div>
  );
}
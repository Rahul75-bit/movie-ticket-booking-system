import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/MovieService";
import { toast } from "react-toastify";

export default function UpdateMovie() {
  let { id } = useParams();
  let navigate = useNavigate();

  let [movie, setMovie] = useState({
    title: "",
    genre: "",
    description: "",
    duration: "",
    language: "",
    movieImgUrl: "",

    releaseDate: "",
  });

  let [selectedImage, setSelectedImage] = useState(null);

  let [durationTime, setDurationTime] = useState({
    hours: "",
    minutes: "",
  });

  let fetchMovie = async () => {
    let data = await getMovieById(id);
    setMovie(data.data);

    setDurationTime({
      hours: Math.floor(data.data.duration / 60),
      minutes: data.data.duration % 60,
    });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  let handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let totalDuration =
      Number(durationTime.hours || 0) * 60 + Number(durationTime.minutes || 0);

    let finalMovie = {
      ...movie,
      duration: totalDuration,
    };

    let formData = new FormData();

    formData.append("movieObject", JSON.stringify(finalMovie));

    if (selectedImage) {
      formData.append("movieImage", selectedImage);
    }

    await updateMovie(movie.movieId, formData);

    toast.success("Movie Updated");
    navigate("/admin/movies");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #050816, #0f172a, #111827)",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "850px",
          borderRadius: "25px",
          background: "linear-gradient(145deg, #0f172a, #1e293b)",
          color: "white",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1
            className="fw-bold"
            style={{
              color: "#60a5fa",
              letterSpacing: "1px",
            }}
          >
            🎥 Update Movie
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Title */}
            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Movie Title</label>

              <input
                type="text"
                name="title"
                value={movie.title}
                placeholder="Enter movie title"
                className="form-control"
                onChange={handleChange}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Genre */}
            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Genre</label>

              <input
                type="text"
                name="genre"
                value={movie.genre}
                placeholder="Enter genre"
                className="form-control"
                onChange={handleChange}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Description */}
            <div className="col-12 mb-4">
              <label className="form-label text-light">Description</label>

              <textarea
                name="description"
                value={movie.description}
                placeholder="Enter description"
                className="form-control"
                rows="4"
                onChange={handleChange}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              ></textarea>
            </div>

            {/* Duration */}

            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Duration</label>

              <div className="row">
                <div className="col-6">
                  <input
                    type="number"
                    placeholder="Hours"
                    className="form-control"
                    value={durationTime.hours}
                    onChange={(e) =>
                      setDurationTime({
                        ...durationTime,
                        hours: e.target.value,
                      })
                    }
                    style={{
                      backgroundColor: "#111827",
                      border: "1px solid #334155",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                  />
                </div>

                <div className="col-6">
                  <input
                    type="number"
                    placeholder="Minutes"
                    className="form-control"
                    value={durationTime.minutes}
                    onChange={(e) =>
                      setDurationTime({
                        ...durationTime,
                        minutes: e.target.value,
                      })
                    }
                    style={{
                      backgroundColor: "#111827",
                      border: "1px solid #334155",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Language</label>

              <input
                type="text"
                name="language"
                value={movie.language}
                placeholder="Enter language"
                className="form-control"
                onChange={handleChange}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Upload Movie Poster */}

            <div className="col-md-6 mb-4">
              <label className="form-label text-light">
                Upload Movie Poster
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Release Date */}

            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Release Date</label>

              <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                className="form-control"
                onChange={handleChange}
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              />
            </div>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div className="text-center mb-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                style={{
                  width: "220px",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "3px solid #2563eb",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
                }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/movies")}
              className="btn px-4 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                borderRadius: "12px",
                border: "none",
                padding: "10px 24px",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn px-5 fw-semibold"
              style={{
                backgroundColor: "#111827",
                color: "#60a5fa",
                border: "1px solid #2563eb",
                borderRadius: "12px",
                padding: "10px 28px",
              }}
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

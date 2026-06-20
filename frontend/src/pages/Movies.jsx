import React, { useEffect, useState } from "react";
import { deleteMovie, getAllMovies } from "../services/MovieService";
import { Link } from "react-router-dom";
import AddMovie from "./AddMovie";

export default function Movies() {
  let [movies, setMovies] = useState([]);
  let [showModal, setShowModal] = useState(false);

  let fetchMovies = async () => {
    let data = await getAllMovies();
    setMovies(data.data);
  };

  let formatDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  let handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies();
  };

  return (
    <div
      className="container-fluid py-4 px-4"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #050816, #0b1120, #111827)",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1
            className="fw-bold"
            style={{
              color: "#60a5fa",
              letterSpacing: "1px",
            }}
          >
            {/* 🎬 Movie Management start here */}
            🎬 <span style={{ color: "#c084fc" }}>Movie</span>
            <span style={{ color: "#60a5fa" }}>Zone</span>
          </h1>
        </div>

        <button
          className="btn px-4 py-2 fw-semibold"
          onClick={() => setShowModal(true)}
          style={{
            background: "linear-gradient(135deg, #2563eb, #1e40af)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(37,99,235,0.4)",
          }}
        >
          + Add Movie
        </button>

        <button
          className="btn btn-danger ms-3"
          style={{
            background: "linear-gradient(135deg, #ef4444, #991b1b)",
            color: "white",
            borderRadius: "14px",
            border: "none",
            boxShadow: "0 10px 25px rgba(239,68,68,0.35)",
          }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(145deg, #111827, #1f2937)",
              color: "white",
            }}
          >
            <h6 className="text-secondary">Total Movies</h6>

            <h2 className="fw-bold" style={{ color: "#60a5fa" }}>
              {movies.length}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(145deg, #111827, #1f2937)",
              color: "white",
            }}
          >
            <h6 className="text-secondary">Languages</h6>

            <h2 className="fw-bold" style={{ color: "#38bdf8" }}>
              {[...new Set(movies.map((m) => m.language))].length}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(145deg, #111827, #1f2937)",
              color: "white",
            }}
          >
            <h6 className="text-secondary">Genres</h6>

            <h2 className="fw-bold" style={{ color: "#3b82f6" }}>
              {
                [
                  ...new Set(
                    movies.flatMap((m) =>
                      m.genre.split(",").map((g) => g.trim()),
                    ),
                  ),
                ].length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-6 col-lg-3 mb-4" key={movie.movieId}>
            <div
              className="card h-100 border-0 shadow-lg"
              style={{
                borderRadius: "22px",
                overflow: "hidden",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
                transition: "all 0.35s ease",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.02)";

                e.currentTarget.style.boxShadow =
                  "0 20px 45px rgba(37,99,235,0.45)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";

                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.35)";
              }}
            >
              {/* Movie Image */}

              <div
                style={{
                  height: "300px",
                  background: "linear-gradient(to bottom, #020617, #0f172a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    movie.movieImgUrl
                      ? `http://localhost:8080/uploads/images/${movie.movieImgUrl}`
                      : null
                  }
                  alt={movie.title}
                  className="w-100"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "18px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                    transition: "all 0.35s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.03)";

                    e.currentTarget.style.boxShadow =
                      "0 18px 40px rgba(37,99,235,0.55)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px) scale(1)";

                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0,0,0,0.45)";
                  }}
                />
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="fw-bold" style={{ color: "#60a5fa" }}>
                    {movie.title}
                  </h4>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#2563eb",
                      padding: "8px 12px",
                      fontSize: "13px",
                    }}
                  >
                    {/* ⭐ {movie.rating} */}⭐{" "}
                    {movie.averageRating
                      ? movie.averageRating.toFixed(1)
                      : "No Rating"}
                  </span>
                </div>

                <p className="text-secondary fw-semibold">{movie.genre}</p>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#cbd5e1",
                  }}
                >
                  {movie.description?.slice(0, 100)}...
                </p>

                {/* Badges */}
                <div className="mb-3">
                  <span
                    className="badge me-2"
                    style={{
                      backgroundColor: "#1d4ed8",
                      padding: "8px 12px",
                    }}
                  >
                    {movie.language}
                  </span>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#334155",
                      padding: "8px 12px",
                    }}
                  >
                    {formatDuration(movie.duration)}
                  </span>
                </div>

                <p className="small" style={{ color: "#94a3b8" }}>
                  Release Date: {movie.releaseDate}
                </p>
              </div>

              {/* Footer */}
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between pb-4">
                <Link
                  // to={`/update-movie/${movie.movieId}`}
                  to={`/admin/update-movie/${movie.movieId}`}
                  className="btn px-4 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "white",
                    borderRadius: "12px",
                    border: "none",
                  }}
                >
                  Update
                </Link>

                <button
                  className="btn px-4 fw-semibold"
                  onClick={() => handleDelete(movie.movieId)}
                  style={{
                    backgroundColor: "#111827",
                    color: "#60a5fa",
                    border: "1px solid #2563eb",
                    borderRadius: "12px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {movies.length === 0 && (
        <div className="text-center mt-5">
          <h3 style={{ color: "#60a5fa" }}>No Movies Found</h3>

          <p className="text-secondary">Start by adding your first movie.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div
              className="modal-content border-0"
              style={{
                borderRadius: "25px",
                background: "linear-gradient(145deg, #0f172a, #1e293b)",
                color: "white",
              }}
            >
              {/* Header */}
              <div className="modal-header border-secondary">
                <h4
                  className="modal-title fw-bold"
                  style={{ color: "#60a5fa" }}
                >
                  🎥 Add New Movie
                </h4>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <AddMovie
                  closeModal={() => {
                    setShowModal(false);
                    fetchMovies();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

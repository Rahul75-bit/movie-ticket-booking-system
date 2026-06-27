import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShinyText from "../Reactbits/ShinyText";

export default function UserHome() {
  let [movies, setMovies] = useState([]);
  let [searchText, setSearchText] = useState("");
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  async function getAllMovies() {
    try {
      let response = await fetch("http://localhost:8080/api/v1/movies");

      if (!response.ok) {
        console.log("Movies API Status:", response.status);
        return;
      }

      let data = await response.json();
      setMovies(data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  let formatDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #111827 100%)",
        color: "white",
      }}
    >
      {/* navbar section start here */}
      <nav
        className="navbar navbar-expand-lg sticky-top py-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(88,28,135,0.85))",
          borderBottom: "2px solid rgba(192,132,252,0.3)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          zIndex: 999,
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand fw-bold"
            to="/user"
            style={{
              fontSize: "1.8rem",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            🎬 <span style={{ color: "#c084fc" }}>Movie</span>
            <span style={{ color: "#60a5fa" }}>Zone</span>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative" style={{ width: "380px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search movies..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "2px solid rgba(192,132,252,0.4)",
                  borderRadius: "16px",
                  padding: "12px 18px",
                  boxShadow: "0 0 20px rgba(124,58,237,0.2)",
                }}
              />

              {searchText && filteredMovies.length > 0 && (
                <div
                  className="position-absolute w-100 mt-2"
                  style={{
                    background: "rgba(17,24,39,0.98)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "18px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                    zIndex: 1000,
                    overflow: "hidden",
                  }}
                >
                  {filteredMovies.map((movie) => (
                    <Link
                      key={movie.movieId}
                      to={`/movie/${movie.movieId}`}
                      className="d-flex align-items-center gap-3 text-decoration-none p-2"
                      style={{
                        color: "white",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onClick={() => setSearchText("")}
                    >
                      <img
                        src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
                        alt={movie.title}
                        style={{
                          width: "45px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      <div>
                        <div className="fw-semibold">{movie.title}</div>
                        <small style={{ color: "#cbd5e1" }}>
                          {movie.genre}
                        </small>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown">
            <button
              className="btn dropdown-toggle px-4 py-2 fw-semibold"
              type="button"
              data-bs-toggle="dropdown"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(192,132,252,0.4)",
                borderRadius: "14px",
              }}
            >
              📍 Location
            </button>

            <ul
              className="dropdown-menu dropdown-menu-dark"
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "14px",
              }}
            >
              <li>
                <Link className="dropdown-item" to="/theaters?city=Mumbai">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/theaters?city=Pune">
                  Pune
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/theaters?city=Delhi">
                  Delhi
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/my-bookings"
            className="btn btn-outline-light"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(192,132,252,0.4)",
              borderRadius: "14px",
            }}
          >
            🎟 My Bookings
          </Link>

          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "14px",
                padding: "10px 18px",
                fontWeight: "600",
              }}
            >
              👤 Account
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {!token ? (
                <>
                  <li>
                    <Link className="dropdown-item text-light" to="/login">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item text-light" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="dropdown-item text-light">
                      Welcome, {userName}
                    </span>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* navbar section ends here */}

      {/* HERO section start here*/}
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="row align-items-center p-4 p-md-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(37,99,235,0.25))",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "28px",
              boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="col-md-7">
              <span
                className="badge mb-3 px-3 py-2"
                style={{
                  backgroundColor: "rgba(192,132,252,0.15)",
                  color: "#d8b4fe",
                  border: "1px solid rgba(192,132,252,0.35)",
                  borderRadius: "20px",
                }}
              >
                🎬 Welcome to MovieZone
              </span>

              <ShinyText
                text="Discover, Book & Enjoy Blockbuster Movies"
                speed={3}
                delay={0}
                color="#c084fc"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="fw-bold display-4"
              />

              <p
                className="fs-5 mt-3"
                style={{
                  color: "#d1d5db",
                  maxWidth: "620px",
                  lineHeight: "1.7",
                }}
              >
                Book your favorite movies instantly with premium seats, exciting
                offers and a smooth cinema experience.
              </p>

              <a
                href="#movies"
                className="btn btn-lg mt-3 px-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
                }}
              >
                Explore Movies
              </a>
            </div>

            <div className="col-md-5 text-center mt-4 mt-md-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4221/4221484.png"
                alt="Cinema"
                style={{
                  width: "80%",
                  maxWidth: "330px",
                  filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.45))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* HERO section ends here*/}

      {/* OFFERS section start here */}

      <div className="container mt-4" id="offers">
        <div className="row g-4">
          {[
            ["🍿 50% OFF", "On your first movie booking", "#ef4444", "#b91c1c"],
            [
              "🎟 Free Popcorn",
              "On premium seat booking",
              "#2563eb",
              "#1e40af",
            ],
            [
              "💳 ₹100 Cashback",
              "Pay with UPI and save more",
              "#10b981",
              "#047857",
            ],
          ].map((offer, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="p-4 h-100"
                style={{
                  borderRadius: "22px",
                  background: `linear-gradient(145deg, ${offer[2]}, ${offer[3]})`,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
                }}
              >
                <h4 className="fw-bold">{offer[0]}</h4>
                <p className="mb-0" style={{ color: "#f3f4f6" }}>
                  {offer[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS section ends here */}

      {/* MOVIES section start here*/}
      <div className="container mt-5 pb-5" id="movies">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">🔥 Now Showing</h2>
            <p className="mb-0" style={{ color: "#cbd5e1" }}>
              Choose your movie and book tickets instantly
            </p>
          </div>
        </div>

        <div className="row g-4">
          {filteredMovies.length === 0 ? (
            <h4 className="text-center text-light mt-5">No movies available</h4>
          ) : (
            filteredMovies.map((movie) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={movie.movieId}>
                <div
                  className="card border-0 h-100 movie-card"
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
                    transition: "0.35s ease",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ overflow: "hidden", position: "relative" }}>
                    <img
                      src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
                      alt={movie.title}
                      height="350"
                      className="card-img-top"
                      style={{
                        height: "320px",
                        width: "100%",
                        objectFit: "contain",
                        backgroundColor: "#020617",
                        padding: "12px",
                        borderRadius: "18px",
                      }}
                    />

                    <span
                      className="badge position-absolute top-0 end-0 m-3"
                      style={{
                        backgroundColor: "#facc15",
                        color: "#111827",
                        fontSize: "14px",
                      }}
                    >
                      {/* ⭐ {movie.rating} */}⭐{" "}
                      {movie.averageRating
                        ? movie.averageRating.toFixed(1)
                        : "No Rating"}
                    </span>
                  </div>

                  <div className="card-body">
                    <h4 className="fw-bold mb-2">{movie.title}</h4>

                    <p className="mb-3" style={{ color: "#cbd5e1" }}>
                      {movie.genre}
                    </p>

                    <div className="d-flex justify-content-between">
                      <span
                        className="badge bg-primary px-3 py-2"
                        style={{
                          background:
                            "linear-gradient(135deg, #ec4899, #8b5cf6)",
                          color: "white",
                          borderRadius: "12px",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        {movie.language}
                      </span>

                      <span className="badge bg-light text-dark px-3 py-2">
                        {formatDuration(movie.duration)}
                      </span>
                    </div>

                    <Link
                      to={`/movie/${movie.movieId}`}
                      className="btn w-100 mt-4 py-2"
                      style={{
                        background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                        color: "white",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                      }}
                    >
                      🎟 View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MOVIES section ends here*/}

      <style>
        {`
          .movie-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 28px 70px rgba(139, 92, 246, 0.45) !important;
          }

          .movie-card:hover img {
            transform: scale(1.08);
          }
        `}
        {`
         .movie-search::placeholder {
         color: #d8b4fe;
         opacity: 1;
         font-weight: 500;
        }

        

.dropdown-menu {
  background: #111827 !important;
}

.dropdown-item {
  color: white !important;
}

.dropdown-item:hover {
  background: #7c3aed !important;
  color: white !important;
}

.dropdown-item:focus {
  background: #7c3aed !important;
  color: white !important;
}


     `}
      </style>
    </div>
  );
}

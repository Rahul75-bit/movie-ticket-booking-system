// import { useEffect, useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";

// export default function TheaterMovies() {
//   let { theaterId } = useParams();
//   let { state } = useLocation();
//   let theater = state?.theater;

//   let [shows, setShows] = useState([]);
//   let [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchMoviesByTheater();
//   }, [theaterId]);

//   let fetchMoviesByTheater = async () => {
//     let response = await fetch(
//       `http://localhost:8080/api/v1/admin/shows/theater/${theaterId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );

//     let data = await response.json();
//     let showList = data.data || [];

//     setShows(showList);

//     let uniqueMovies = Array.from(
//       new Map(
//         showList.map((show) => [show.movie.movieId, show.movie]),
//       ).values(),
//     );

//     setMovies(uniqueMovies);
//   };

//   return (
//     // <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: "50px" }}>

//     <div
//       style={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg, #020617 0%, #111827 45%, #1e1b4b 100%)",
//         color: "white",
//         padding: "50px",
//       }}
//     >
//       <Link to="/theaters" className="btn btn-outline-light mb-4">
//         ← Back to Theaters
//       </Link>

//       {/* <h1 className="fw-bold mb-2">{theater?.name || "Theater Movies"}</h1> */}

//       <h1
//         className="fw-bold mb-2"
//         style={{
//           fontSize: "3rem",
//           background: "linear-gradient(135deg,#c084fc,#60a5fa)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         🎭 {theater?.name}
//       </h1>
//       <p className="mb-5">{theater?.address}</p>

//       <div className="row g-4">
//         {movies.map((movie) => (
//           <div className="col-lg-3 col-md-4 col-sm-6" key={movie.movieId}>
//             {/* <div
//               className="card h-100"
//               style={{
//                 background: "#111827",
//                 color: "white",
//                 borderRadius: "22px",
//               }}
//             > */}

//             <div
//               className="movie-card h-100"
//               style={{
//                 background:
//                   "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.18))",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 borderRadius: "28px",
//                 overflow: "hidden",
//                 backdropFilter: "blur(14px)",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
//               }}
//             >
//               {/* <div
//                 style={{
//                   height: "340px",
//                   padding: "12px",
//                   background: "#020617",
//                 }}
//               >
//                 <img
//                   src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
//                   alt={movie.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                   }}
//                 />
//               </div> */}

//               <div
//                 style={{
//                   height: "380px",
//                   padding: "16px",
//                   background: "rgba(255,255,255,0.03)",
//                 }}
//               >
//                 <img
//                   src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
//                   alt={movie.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     borderRadius: "16px",
//                   }}
//                 />
//               </div>

//               {/* <div className="card-body">
//                 <h4>{movie.title}</h4>
//                 <p>{movie.genre}</p>

//                 <Link
//                   to={`/movie/${movie.movieId}`}
//                   className="btn btn-primary w-100"
//                 >
//                   View Details
//                 </Link>
//               </div> */}

//               <div className="card-body d-flex flex-column">
//                 <h4 className="fw-bold">{movie.title}</h4>

//                 <p style={{ color: "#cbd5e1" }}>🎭 {movie.genre}</p>

//                 <p style={{ color: "#cbd5e1" }}>🌐 {movie.language}</p>

//                 <p style={{ color: "#facc15" }}>
//                   ⭐ {movie.averageRating || 0}
//                 </p>

//                 <Link
//                   to={`/movie/${movie.movieId}`}
//                   className="btn mt-auto"
//                   style={{
//                     background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "14px",
//                     fontWeight: "600",
//                     padding: "12px",
//                   }}
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// <style>
//   {`
//     .movie-card:hover{
//       transform: translateY(-10px);
//       box-shadow: 0 25px 60px rgba(139,92,246,0.45);
//     }
//   `}
// </style>


import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function TheaterMovies() {
  let { theaterId } = useParams();
  let { state } = useLocation();
  let theater = state?.theater;

  let [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesByTheater();
  }, [theaterId]);

  let fetchMoviesByTheater = async () => {
    let response = await fetch(
      `http://localhost:8080/api/v1/admin/shows/theater/${theaterId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    let data = await response.json();
    let showList = data.data || [];

    let uniqueMovies = Array.from(
      new Map(showList.map((show) => [show.movie.movieId, show.movie])).values()
    );

    setMovies(uniqueMovies);
  };

  let formatDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

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
        <Link to="/theaters" className="btn btn-outline-light mb-4">
          ← Back to Theaters
        </Link>

        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            🎭 {theater?.name || "Theater Movies"}
          </h2>
          <p className="mb-0" style={{ color: "#cbd5e1" }}>
            {theater?.address}
          </p>
        </div>

        <div className="row g-4">
          {movies.length === 0 ? (
            <h4 className="text-center text-light mt-5">No movies available</h4>
          ) : (
            movies.map((movie) => (
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
                    <div
                      style={{
                        height: "350px",
                        background: "#020617",
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`http://localhost:8080/uploads/images/${movie.movieImgUrl}`}
                        alt={movie.title}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "0.35s ease",
                          borderRadius: "16px",
                        }}
                      />
                    </div>

                    <span
                      className="badge position-absolute top-0 end-0 m-3"
                      style={{
                        backgroundColor: "#facc15",
                        color: "#111827",
                        fontSize: "14px",
                      }}
                    >
                      ⭐{" "}
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

      <style>
        {`
          .movie-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 28px 70px rgba(139, 92, 246, 0.45) !important;
          }

          .movie-card:hover img {
            transform: scale(1.03);
          }
        `}
      </style>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function TheaterSelection() {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cityFromUrl = searchParams.get("city");
  const city = cityFromUrl || localStorage.getItem("city");

  const [selectedCity, setSelectedCity] = useState(
    city || "Select Location"
  );

  useEffect(() => {
    if (city) {
      fetchTheaters(city);
    } else {
      setTheaters([]);
    }
  }, [city]);

  const fetchTheaters = async (cityName) => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/theaters/city/${cityName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        localStorage.clear();
        setError("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (response.status === 403) {
        setError("You are not allowed to access theaters.");
        return;
      }

      if (!response.ok) {
        setError(`Something went wrong. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setTheaters(data.data || []);
    } catch (error) {
      console.log(error);
      setError("Unable to fetch theaters.");
    }
  };

  const handleCitySelect = (cityName) => {
    localStorage.setItem("city", cityName);
    setSelectedCity(cityName);
    navigate(`/theaters?city=${cityName}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        padding: "50px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #111827 100%)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold mb-0">🎭 Select Theater</h1>

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
            📍 {selectedCity}
          </button>

          <ul
            className="dropdown-menu dropdown-menu-dark"
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "14px",
            }}
          >
            {["Mumbai", "Pune", "Delhi", "Bangalore"].map((cityName) => (
              <li key={cityName}>
                <button
                  className="dropdown-item"
                  onClick={() => handleCitySelect(cityName)}
                >
                  {cityName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {!city && (
        <div className="text-center mt-5">
          <h3>Please select a location to view theaters.</h3>
        </div>
      )}

      {city && theaters.length === 0 && !error && (
        <div className="text-center mt-5">
          <h3>No theaters found in {city}.</h3>
        </div>
      )}

      <div className="row g-4">
        {theaters.map((theater) => (
          <div className="col-md-4" key={theater.theaterId}>
            <div
              className="card p-4 h-100"
              style={{
                background: "#111827",
                color: "white",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h4>{theater.name}</h4>
              <p>{theater.address}</p>
              <p>📍 {theater.city}</p>

              <button
                className="btn btn-primary mt-auto"
                onClick={() =>
                  navigate(`/theater/${theater.theaterId}/movies`, {
                    state: { theater },
                  })
                }
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  color: "white",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "600",
                }}
              >
                Explore Movies
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function TheaterSelection() {
  let [theaters, setTheaters] = useState([]);
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();

  let cityFromUrl = searchParams.get("city");

  let [selectedCity, setSelectedCity] = useState(
    cityFromUrl || localStorage.getItem("city") || "Select Location",
  );

  let city = cityFromUrl || localStorage.getItem("city");

  useEffect(() => {
    if (city) {
      fetchTheaters();
    } else {
      setTheaters([]);
    }
  }, [city]);

  const fetchTheaters = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/theaters/city/${city}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await response.json();
      setTheaters(data.data || []);
    } catch (error) {
      console.log(error);
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
        background: "#020617",
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

      {!city && (
        <div className="text-center mt-5">
          <h3>Please select a location to view theaters.</h3>
        </div>
      )}

      {city && theaters.length === 0 && (
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

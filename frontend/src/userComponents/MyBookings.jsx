import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyBookings() {
  let [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  let fetchBookingSeats = async (bookingId) => {
    let response = await fetch(
      `http://localhost:8080/api/v1/booking-seats/booking/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    let data = await response.json();
    return data || [];
  };

  let fetchMyBookings = async () => {
    let userId = localStorage.getItem("userId");

    let response = await fetch(
      `http://localhost:8080/api/v1/bookings/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    let data = await response.json();
    let bookingList = data.data || [];

    let bookingWithSeats = await Promise.all(
      bookingList.map(async (booking) => {
        let seats = await fetchBookingSeats(booking.bookingId);
        return {
          ...booking,
          seats,
        };
      }),
    );

    setBookings(bookingWithSeats);
  };

  let cancelBooking = async (bookingId) => {
    let response = await fetch(
      `http://localhost:8080/api/v1/bookings/cancel/${bookingId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.ok) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, bookingStatus: "CANCELLED" }
            : booking,
        ),
      );
    }
  };

 

  let removeCard = async (bookingId) => {
    let response = await fetch(
      `http://localhost:8080/api/v1/bookings/hide/${bookingId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.ok) {
      setBookings((prev) =>
        prev.filter((booking) => booking.bookingId !== bookingId),
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #1e1b4b)",
        color: "white",
        padding: "50px",
      }}
    >
      <Link to="/user" className="btn btn-outline-light mb-4">
        ← Back to Movies
      </Link>

      <h1 className="fw-bold mb-4">🎟 My Bookings</h1>

      {bookings.length === 0 ? (
        <h4>No bookings found.</h4>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div
              className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
              key={booking.bookingId}
            >
              <div
                className="p-4 booking-card"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "22px",
                  position: "relative",
                  opacity: booking.bookingStatus === "CANCELLED" ? "0.7" : "1",
                }}
              >
                {booking.bookingStatus === "CANCELLED" && (
                  <button
                    className="close-booking-btn"
                    onClick={() => removeCard(booking.bookingId)}
                  >
                    ✕
                  </button>
                )}

                <h4 className="fw-bold pe-4">
                  {booking.movieShow?.movie?.title}
                </h4>

                <p>Booking ID: {booking.bookingId}</p>
                <p>Status: {booking.bookingStatus}</p>

                <p>
                  Seats:{" "}
                  {booking.seats?.length > 0
                    ? booking.seats
                        .map((bookingSeat) => bookingSeat.seat?.seatNumber)
                        .join(", ")
                    : "N/A"}
                </p>

                <p>Total Amount: ₹{booking.totalAmount}</p>

                <p>
                  Show: {booking.movieShow?.showDate} -{" "}
                  {booking.movieShow?.showTime}
                </p>

                <p>
                  Theater: {booking.movieShow?.screen?.theater?.name || "N/A"}
                </p>

                <p>Screen: {booking.movieShow?.screen?.screenNo}</p>

                {booking.bookingStatus !== "CANCELLED" && (
                  <button
                    className="btn btn-danger mt-2 w-100"
                    onClick={() => cancelBooking(booking.bookingId)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          .close-booking-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 50%;
            background: rgba(239,68,68,0.18);
            color: #ef4444;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s ease;
            line-height: 1;
          }

          .close-booking-btn:hover {
            background: #ef4444;
            color: white;
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";

export default function BookingSuccess() {
  let { state } = useLocation();

  let booking = state?.booking;
  let movie = state?.movie;
  let show = state?.show;
  let selectedSeats = state?.selectedSeats || [];

  if (!booking) {
    return <h2>No booking details found.</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #1e1b4b)",
        color: "white",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <h1>🎉 Booking Confirmed!</h1>

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <h2>{movie?.title}</h2>
        <p>Booking ID: {booking.bookingId}</p>
        <p>Date: {show?.showDate}</p>
        <p>Time: {show?.showTime}</p>
        <p>Seats: {selectedSeats.map((s) => s.seatNumber).join(", ")}</p>
        <p>Total Amount: ₹{booking.totalAmount}</p>
        <p>Status: {booking.bookingStatus}</p>
      </div>

      <Link
        to="/user"
        className="btn btn-primary"
        style={{
          background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
          color: "white",
          borderRadius: "12px",
          border: "none",
          fontWeight: "600",
        }}
      >
        Back to Movies
      </Link>
    </div>
  );
}

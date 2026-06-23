import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SeatSelection() {
  let { showId } = useParams();
  let { state } = useLocation();
  let navigate = useNavigate();

  let show = state?.show;
  let movie = state?.movie;

  let [seats, setSeats] = useState([]);
  let [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (show?.screen?.screenId) {
      fetchSeats();
    }
  }, [show]);

  let fetchSeats = async () => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/v1/seats/show/${showId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        setSeats([]);
        return;
      }

      let data = await response.json();

      setSeats(data.data || []);
    } catch (error) {
      setSeats([]);
    }
  };

  let toggleSeat = (seat) => {
    if (seat.isBooked) return;

    let alreadySelected = selectedSeats.find((s) => s.seatId === seat.seatId);

    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.seatId !== seat.seatId));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  let handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    let totalAmount = selectedSeats.length * show.ticketPrice;

    let options = {
      key: "YOUR_KEY",
      amount: totalAmount * 100,
      currency: "INR",
      name: "MovieZone",
      description: `${movie.title} Ticket Booking`,

      handler: function (response) {
        bookTicket();
      },

      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        contact: "9876543210",
      },

      theme: {
        color: "#8b5cf6",
      },
    };

    let razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  let bookTicket = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    let userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    let seatIds = selectedSeats.map((seat) => seat.seatId);

    let response = await fetch(
      `http://localhost:8080/api/v1/bookings/user/${userId}/show/${showId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(seatIds),
      },
    );

    if (!response.ok) {
      alert("Booking failed. Please try again.");
      return;
    }

    let data = await response.json();

    navigate("/booking-success", {
      state: {
        booking: data.data,
        movie,
        show,
        selectedSeats,
      },
    });
  };

  if (!show || !movie) {
    return (
      <h2 style={{ color: "white", background: "#111827", minHeight: "100vh" }}>
        Show details not found. Please go back and select show again.
      </h2>
    );
  }

  const groupedSeats = seats.reduce((acc, seat) => {
    const row = seat.seatNumber.charAt(0);

    if (!acc[row]) {
      acc[row] = [];
    }

    acc[row].push(seat);
    return acc;
  }, {});

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #111827 45%, #1e1b4b 100%)",
        color: "white",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <button
          className="btn btn-outline-light mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="seat-box">
          <h1 className="fw-bold mb-2">{movie.title}</h1>
          <p className="mb-1">Date: {show.showDate}</p>
          <p className="mb-1">Time: {show.showTime}</p>
          <p className="mb-4">Ticket Price: ₹{show.ticketPrice}</p>

          <div className="screen mb-5">SCREEN</div>

          <div className="seat-layout">
            {Object.entries(groupedSeats).map(([row, rowSeats]) => (
              <div className="seat-row" key={row}>
                <div className="seat-type-label">{rowSeats[0].seatType}</div>

                <div className="seat-grid">
                  {rowSeats
                    .sort(
                      (a, b) =>
                        Number(a.seatNumber.substring(1)) -
                        Number(b.seatNumber.substring(1)),
                    )
                    .map((seat) => {
                      const isSelected = selectedSeats.some(
                        (s) => s.seatId === seat.seatId,
                      );

                      return (
                        <button
                          key={seat.seatId}
                          className={`seat ${
                            seat.isBooked
                              ? "booked"
                              : isSelected
                                ? "selected"
                                : ""
                          }`}
                          onClick={() => toggleSeat(seat)}
                          disabled={seat.isBooked}
                        >
                          {seat.seatNumber}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div className="legend mt-4">
            <span className="legend-item available"></span> Available
            <span className="legend-item selected"></span> Selected
            <span className="legend-item booked"></span> Booked
          </div>

          <div className="summary mt-5">
            <h4>Selected Seats</h4>
            <p>
              {selectedSeats.length === 0
                ? "No seats selected"
                : selectedSeats.map((s) => s.seatNumber).join(", ")}
            </p>

            <h4>Total Amount</h4>
            <p>₹{selectedSeats.length * show.ticketPrice}</p>

            <button className="btn book-btn mt-3" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .seat-box {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 28px;
            padding: 35px;
            box-shadow: 0 25px 70px rgba(0,0,0,0.4);
          }

          .screen {
            height: 45px;
            background: linear-gradient(135deg, #e5e7eb, #94a3b8);
            color: #020617;
            border-radius: 0 0 80px 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 800;
            letter-spacing: 3px;
          }

          .seat-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            max-width: 650px;
            margin: auto;
            justify-content: center;
          }

          .seat {
            width: 55px;
            height: 45px;
            border-radius: 12px;
            border: 1px solid #60a5fa;
            background: white;
            color: #111827;
            font-weight: 700;
          }

          .seat.selected {
            background: #22c55e;
            color: white;
            border-color: #22c55e;
          }

          .seat.booked {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
            cursor: not-allowed;
          }

          .legend {
            display: flex;
            justify-content: center;
            gap: 18px;
            align-items: center;
            flex-wrap: wrap;
          }

          .legend-item {
            width: 18px;
            height: 18px;
            border-radius: 5px;
            display: inline-block;
            margin-left: 12px;
            margin-right: 6px;
          }

          .legend-item.available {
            background: white;
          }

          .legend-item.selected {
            background: #22c55e;
          }

          .legend-item.booked {
            background: #ef4444;
          }

          .summary {
            text-align: center;
          }

          .book-btn {
            background: linear-gradient(135deg, #ec4899, #8b5cf6);
            color: white;
            border: none;
            border-radius: 14px;
            padding: 12px 35px;
            font-weight: 700;
          }

            .seat-layout {
        max-width: 850px;
        margin: auto;
      }

        .seat-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 16px;
        }

        .seat-type-label {
          width: 90px;
          font-size: 13px;
          font-weight: 800;
          color: #c084fc;
          text-align: right;
        }

        .seat-grid {
          display: grid;
          grid-template-columns: repeat(10, 55px);
          gap: 12px;
          justify-content: center;
        }
        `}
      </style>
    </div>
  );
}

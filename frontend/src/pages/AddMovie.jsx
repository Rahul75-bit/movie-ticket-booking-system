import React, { useState } from "react";
import { addMovie } from "../services/MovieService";
import { toast } from "react-toastify";

export default function AddMovie({ closeModal }) {
  let [movie, setMovie] = useState({
    title: "",
    genre: "",
    description: "",
    language: "",
    movieImgUrl: "",
    releaseDate: "",
  });

  let [selectedImage, setSelectedImage] = useState(null);

  let [durationTime, setDurationTime] = useState({
    hours: "",
    minutes: "",
  });

  let handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.error("Please upload movie poster");
      return;
    }

    let totalDuration =
      Number(durationTime.hours || 0) * 60 + Number(durationTime.minutes || 0);

    let finalMovie = {
      ...movie,
      duration: totalDuration,
    };

    let formData = new FormData();

    formData.append("movieObject", JSON.stringify(finalMovie));
    formData.append("movieImage", selectedImage);

    try {
      await addMovie(formData);
      toast.success("Movie added successfully!");
      closeModal();
    } catch (error) {
      console.log("Add movie error:", error);
      toast.error("Failed to add movie. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Movie Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter movie title"
              className="form-control form-control-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              placeholder="Action, Comedy..."
              className="form-control form-control-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Duration</label>
            <div className="row">
              <div className="col-6">
                <input
                  type="number"
                  placeholder="Hours"
                  className="form-control form-control-lg"
                  value={durationTime.hours}
                  onChange={(e) =>
                    setDurationTime({
                      ...durationTime,
                      hours: e.target.value,
                    })
                  }
                  min="0"
                  required
                />
              </div>

              <div className="col-6">
                <input
                  type="number"
                  placeholder="Minutes"
                  className="form-control form-control-lg"
                  value={durationTime.minutes}
                  onChange={(e) =>
                    setDurationTime({
                      ...durationTime,
                      minutes: e.target.value,
                    })
                  }
                  min="0"
                  max="59"
                  required
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Language</label>
            <input
              type="text"
              name="language"
              placeholder="Hindi / English"
              className="form-control form-control-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              className="form-control form-control-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">
              Upload Movie Poster
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control form-control-lg"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              required
            />
          </div>

          {selectedImage && (
            <div className="col-12 mb-4 text-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "250px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="col-12 mb-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Enter movie description..."
              className="form-control"
              rows="4"
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="btn px-4 fw-semibold"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              borderRadius: "12px",
              border: "none",
              padding: "10px 22px",
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
              padding: "10px 26px",
            }}
          >
            Save Movie
          </button>
        </div>
      </form>
    </div>
  );
}

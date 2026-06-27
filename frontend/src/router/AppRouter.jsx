import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Movies from "../pages/Movies";
import AddMovie from "../pages/AddMovie";
import UpdateMovie from "../pages/UpdateMovie";
import UserHome from "../userComponents/UserHome";
import UserMovieDetails from "../userComponents/UserMovieDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import SeatSelection from "../userComponents/SeatSelection";
import TheaterSelection from "../userComponents/TheaterSelection";
import TheaterMovies from "../userComponents/TheaterMovies";
import MyBookings from "../userComponents/MyBookings";
import BookingSuccess from "../userComponents/BookingSuccess";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-movie"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/update-movie/:id"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <UpdateMovie />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
      

        <Route path="/user" element={<UserHome />} />

      

        <Route path="/movie/:id" element={<UserMovieDetails />} />

      

        <Route
          path="/seat-selection/:showId"
          element={
            <ProtectedRoute allowedRole="USER">
              <SeatSelection />
            </ProtectedRoute>
          }
        />

        <Route path="/booking-success" element={<BookingSuccess />} />

        <Route path="/theaters" element={<TheaterSelection />} />
        <Route path="/theater/:theaterId/movies" element={<TheaterMovies />} />

       

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRole="USER">
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

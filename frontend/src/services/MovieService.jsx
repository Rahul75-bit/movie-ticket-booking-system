let adminBaseUrl = "http://localhost:8080/api/v1/admin/movies";
let userBaseUrl = "http://localhost:8080/api/v1/movies";

let getToken = () => localStorage.getItem("token");

export let getAllMovies = async () => {
  let response = await fetch(adminBaseUrl, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let data = await response.json();
  return data;
};

export let addMovie = async (formData) => {
  let response = await fetch(adminBaseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to add movie");
  }

  return response.json();
};

export let deleteMovie = async (id) => {
  let response = await fetch(`${adminBaseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }

  return response.json();
};

export let getMovieById = async (id) => {
  let response = await fetch(`${adminBaseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};

export let updateMovie = async (id, formData) => {
  let response = await fetch(`${adminBaseUrl}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.log("Update Status:", response.status);
    let errorText = await response.text();
    console.log("Update Error:", errorText);
    throw new Error(errorText || "Failed to update movie");
  }

  return response.json();
};

export let getAllMoviesForUser = async () => {
  let response = await fetch(userBaseUrl, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user movies");
  }

  return response.json();
};

export let getMovieByIdForUser = async (id) => {
  let response = await fetch(`${userBaseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

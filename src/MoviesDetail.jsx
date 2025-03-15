import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MoviesDetail.css"; // Import CSS for styling

const MovieDetails = () => {
  const { id } = useParams(); // ✅ Extract movie ID from URL
  const [movie, setMovie] = useState(null);

  const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjYzMzJhMTU4NzVlZTM1OGZmMWQyNDYwYzU5YjQyNCIsIm5iZiI6MTc0MjAxOTg0Mi4wNTIsInN1YiI6IjY3ZDUxZDAyOTE2NWYzNzExODAxMTdiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aRssjCxJb9XMHzAjxawigyAUbPDpjBR_EVkXs4o2HYI"; // Replace with your actual TMDB API token

  useEffect(() => {
    if (!id) return; // ✅ Prevent fetching if ID is missing

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`, // ✅ Ensure Bearer token is correct
              Accept: "application/json",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, API_TOKEN]); // ✅ Use id in the dependency array

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-details-container">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;

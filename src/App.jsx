import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const API_URL = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjYzMzJhMTU4NzVlZTM1OGZmMWQyNDYwYzU5YjQyNCIsIm5iZiI6MTc0MjAxOTg0Mi4wNTIsInN1YiI6IjY3ZDUxZDAyOTE2NWYzNzExODAxMTdiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aRssjCxJb9XMHzAjxawigyAUbPDpjBR_EVkXs4o2HYI"; // Use your actual token

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="trending-container">
      <h1>Trending Movies & Shows</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MovieDetails
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title || movie.name}
            />
            <h3>{movie.title || movie.name}</h3>
            <p>{movie.media_type.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;

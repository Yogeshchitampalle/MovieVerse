import "./App.css";
import React, { useState, useEffect } from "react";
import MovieCard from "./Components/MovieCard";
import SearchIcon from "./SearchIcon.svg";

const API_URL = "http://www.omdbapi.com?apikey= XXXXXX";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <h1>MovieVorse</h1>
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search For Movies"
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard.jsx";

const url = "http://www.omdbapi.com?apikey=201efc33";

const movie1 = {
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
  Title: "Superman Returns",
  Type: "movie",
  Year: "2006",
  imdbID: "tt0348150",
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchterm, setSearchterm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>AllMov</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchterm}
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchterm);
          }}
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
}

export default App;

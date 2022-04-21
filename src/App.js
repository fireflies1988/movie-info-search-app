import React, { useEffect, useState } from "react";
import Movie from "./components/movie";

const DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getMovies(api) {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
  };

  useEffect(() => {
    getMovies(DISCOVER);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      getMovies(SEARCH + searchTerm);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header>
        <span className="logo">FAKE</span>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search movie"
            className="search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="search">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;

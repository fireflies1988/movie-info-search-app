import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
      border: 0,
    },
  },
}));

const axios = require("axios");

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    fetchMoviesAsync(page, searchTerm);
  }, [page]);

  async function fetchMoviesAsync(page, searchTerm) {
    let response;
    if (!searchTerm) {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/discover?page=${page}`);
    } else {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?page=${page}&query=${searchTerm}`);
    }
    
    setMovies(response.data.results);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      fetchMoviesAsync(page, searchTerm);
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
            <i className="bi bi-search"></i>
          </button>
        </form>

        <Pagination
          style={{ marginLeft: "auto" }}
          count={100}
          variant="outlined"
          color="secondary"
          classes={{ ul: classes.ul }}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </header>

      <div className="movie-container">
        {movies?.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;

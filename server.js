const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page={page}`;
const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page={page}&query={query}`;

const app = express();

app.use(cors());

app.get("/api/discover", async (req, res) => {
  const response = await axios.get(DISCOVER.replace("{page}", req.query.page || 1));
  res.json(response.data);
});

app.get("/api/search", async (req, res) => {
    const response = await axios.get(SEARCH.replace("{page}", req.query.page || 1).replace("{query}", req.query.query));
    res.json(response.data);
});

app.listen(process.env.REACT_APP_SERVER_PORT, () => console.log(`Server is running on port ${process.env.REACT_APP_SERVER_PORT}`));

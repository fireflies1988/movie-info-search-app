const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const ALT_IMG =
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2056&q=80";

function setVoteClass(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "yellow";
  } else {
    return "red";
  }
}

function Movie({ title, poster_path, overview, vote_average }) {
  return (
    <div className="movie">
      <div className="movie-poster">
        <img
          src={poster_path ? IMG_PATH + poster_path : ALT_IMG}
          alt={title}
          style={poster_path ? {} : {height: "450px", objectFit: "cover"}}
        />
        <div className="movie-hidden-overview">
          <h2>Overview</h2>
          <p>{overview}</p>
        </div>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
      </div>
    </div>
  );
}

export default Movie;

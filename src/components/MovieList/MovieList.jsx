import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(location);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`} state={location}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h2>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;

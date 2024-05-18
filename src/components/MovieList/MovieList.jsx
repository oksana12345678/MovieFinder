import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(location);
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.listItem} key={movie.id}>
          <Link to={`/movie/${movie.id}`} state={location}>
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className={css.title}>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;

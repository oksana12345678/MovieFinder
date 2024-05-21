import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchCast from "../fetchCast/fetchCast";
import css from "./MovieCast.module.css";
import Error from "../Error/Error";
const MovieCast = () => {
  const [allCast, setAllCast] = useState([]);
  const [error, setError] = useState(false);
  const { movie_id } = useParams();

  useEffect(() => {
    const loadCast = async () => {
      try {
        setError(false);

        const cast = await fetchCast(movie_id);
        setAllCast(cast.data.cast);
      } catch (error) {
        setError(true);
      }
    };
    loadCast();
  }, [movie_id, setError]);
  return (
    <div>
      {error && <Error />}
      <ul className={css.list}>
        {allCast.map((cast) => (
          <li className={css.listItem} key={cast.id}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
            />

            <h2 className={css.title}>{cast.name}</h2>
            <p className={css.character}>Character: {cast.character}</p>
            <p className={css.popularity}>Popularity: {cast.popularity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieCast;

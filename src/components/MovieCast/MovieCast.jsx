import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchCast from "../fetchCast/fetchCast";
import css from "./MovieCast.module.css";
import Alert from "@mui/material/Alert";

const MovieCast = () => {
  const [allCast, setAllCast] = useState([]);
  const { movie_id } = useParams();
  useEffect(() => {
    try {
      const loadCast = async () => {
        const cast = await fetchCast(movie_id);
        setAllCast(cast.data.cast);
      };
      loadCast();
    } catch (e) {
      <Alert variant="filled" severity="error">
        Sorry, something went wrong{e}
      </Alert>;
    }
  }, [movie_id]);
  return (
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
  );
};
export default MovieCast;

import { lazy } from "react";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import { useState, useEffect } from "react";
import fetchTrendingMovie from "../../components/fetchTrendingMovie/fetchTrendingMovie";
import Error from "../../components/Error/Error";
const HomePage = ({ onLoad }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        onLoad(true);

        const initMovie = await fetchTrendingMovie();
        setError(false);
        setMovies(initMovie);
      } catch (error) {
        setError(true);
      } finally {
        onLoad(false);
      }
    };
    loadTrendingMovie();
  }, [onLoad, setMovies, error]);
  return (
    <div>
      {error && <Error />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default HomePage;

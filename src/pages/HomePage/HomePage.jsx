import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import fetchTrendingMovie from "../../components/fetchTrendingMovie/fetchTrendingMovie";
import Alert from "@mui/material/Alert";

const HomePage = ({ onLoad }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        onLoad(true);
        const initMovie = await fetchTrendingMovie();
        setMovies(initMovie);
      } catch (error) {
        <Alert variant="filled" severity="error">
          Sorry, something went wrong{error}
        </Alert>;
      } finally {
        onLoad(false);
      }
    };
    loadTrendingMovie();
  }, [onLoad, setMovies]);

  return <div>{movies.length > 0 && <MovieList movies={movies} />}</div>;
};
export default HomePage;

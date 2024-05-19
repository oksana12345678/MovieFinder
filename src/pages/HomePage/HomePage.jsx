import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import fetchTrendingMovie from "../../components/fetchTrendingMovie/fetchTrendingMovie";

const HomePage = ({ onLoad }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        onLoad(true);
        const initMovie = await fetchTrendingMovie();
        setMovies(initMovie);
      } catch (error) {
        console.log(error);
      } finally {
        onLoad(false);
      }
    };
    loadTrendingMovie();
  }, []);

  return <div>{movies.length > 0 && <MovieList movies={movies} />}</div>;
};
export default HomePage;

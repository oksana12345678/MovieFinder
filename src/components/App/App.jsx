import { useEffect, useState } from "react";
import HomePage from "/src/pages/HomePage/HomePage";
import fetchMovie from "../fetchMovie/fetchMovie";
import Navigation from "../Navigation/Navigation";
import MoviePage from "../../pages/MoviePage/MoviePage";
import { Routes, Route } from "react-router-dom";
import NoteFoundPage from "../../pages/NoteFoundPage/NoteFoundPage";
import fetchTrendingMovie from "../fetchTrendingMovie/fetchTrendingMovie";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState();

  const handleMovie = async (searchTerm) => {
    try {
      setPage(1);
      const data = await fetchMovie(searchTerm);
      setSearchTerm(searchTerm);
      setFilmSearch(data.results);
      setMovieId(data.results.id);

      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextPage = async () => {
    try {
      const nextPageData = await fetchMovie(searchTerm, page + 1);
      setPage((prevPage) => prevPage + 1);
      setFilmSearch((prevPage) => [...prevPage, ...nextPageData.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTrendingMovie = async () => {
      const initMovie = await fetchTrendingMovie();
      setMovies(initMovie);
      setMovieId(initMovie.id);
      console.log(initMovie.id);
    };
    loadTrendingMovie();
  }, []);
  return (
    <>
      <header>
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route
            path="/movie"
            element={
              <MoviePage
                movies={filmSearch}
                onSubmit={handleMovie}
                onChang={handleNextPage}
              />
            }
          />
          <Route
            path="/movie/:movie_id"
            element={<MovieDetailsPage movieId={movieId} />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NoteFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

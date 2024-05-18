import { useEffect, useState, lazy, Suspense } from "react";
import Alert from "@mui/material/Alert";
import fetchTrendingMovie from "../fetchTrendingMovie/fetchTrendingMovie";
import fetchMovie from "../fetchMovie/fetchMovie";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
const HomePage = lazy(() => import("/src/pages/HomePage/HomePage"));
const MoviePage = lazy(() => import("../../pages/MoviePage/MoviePage"));
import { Routes, Route } from "react-router-dom";
const NoteFoundPage = lazy(() =>
  import("../../pages/NoteFoundPage/NoteFoundPage")
);
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMovie = async (searchTerm) => {
    try {
      setMovies([]);
      setPage(1);
      setLoading(true);
      const data = await fetchMovie(searchTerm);
      setSearchTerm(searchTerm);
      setFilmSearch(data.results);
    } catch (error) {
      <Alert variant="filled" severity="error">
        Sorry, something went wrong{error}
      </Alert>;
    } finally {
      setLoading(false);
    }
  };
  const handleNextPage = async () => {
    try {
      setLoading(true);
      const nextPageData = await fetchMovie(searchTerm, page + 1);
      setPage((prevPage) => prevPage + 1);
      setFilmSearch((prevPage) => [...prevPage, ...nextPageData.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        setLoading(true);
        const initMovie = await fetchTrendingMovie();
        setMovies(initMovie);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
        {loading && <Loader />}
        <Suspense fallback={<Loader />}>
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
            <Route path="/movie/:movie_id" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            <Route path="*" element={<NoteFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

import { useState, lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
const HomePage = lazy(() => import("/src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
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
  const [loading, setLoading] = useState(false);

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
            <Route path="/" element={<HomePage onLoad={setLoading} />} />
            <Route
              path="/movies"
              element={<MoviesPage onLoad={setLoading} />}
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

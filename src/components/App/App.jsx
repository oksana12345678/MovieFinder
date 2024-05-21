import { useState, lazy, Suspense, useRef } from "react";
import Navigation from "../Navigation/Navigation";
const Loader = lazy(() => import("../Loader/Loader"));
const HomePage = lazy(() => import("/src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
import { Routes, Route, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const backLinkRef = location.state ?? "/";

  return (
    <>
      <header>
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          {loading && <Loader />}
          <Routes>
            <Route path="/" element={<HomePage onLoad={setLoading} />} />
            <Route
              path="/movies"
              element={<MoviesPage onLoad={setLoading} />}
            />
            <Route
              path="/movies/:movie_id"
              element={
                <MovieDetailsPage onLoad={setLoading} backPath={backLinkRef} />
              }
            >
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

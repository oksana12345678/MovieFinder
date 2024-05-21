import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import BackLink from "../../components/BackLink/BackLink";
import fetchDetails from "../../components/fetchDetails/fetchDetails";
import { useEffect, useState, useRef, lazy } from "react";
import css from "./MovieDetailsPage.module.css";
import { GiCharacter } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import Error from "../../components/Error/Error";
const Loader = lazy(() => import("../../components/Loader/Loader"));

const MovieDetailsPage = ({ onLoad }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const scrollRef = useRef();
  const { movie_id } = useParams();
  const location = useLocation();

  const backLink = location.state ?? "/";

  const handleScrollToCast = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        onLoad(true);
        const details = await fetchDetails(movie_id);
        setMovie(details);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        onLoad(false);
      }
    };
    loadMovieDetails();
  }, [movie_id, error, onLoad]);

  if (!movie) {
    return <Loader />;
  }

  const { id, poster_path, title, vote_average, release_date, overview } =
    movie;
  return (
    <section className={css.details}>
      {error && <Error />}
      <BackLink to={backLink}>Back to products</BackLink>
      <div>
        <div className={css.mainContainer} key={id}>
          <img
            className={css.paster}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
          <div className={css.container}>
            <h1 className={css.title}>{title}</h1>
            <p className={css.vote}>Vote Average: {vote_average}</p>
            <div className={css.genreContainer}>
              <p className={css.genre}>
                Genre:
                {movie.genres.map((genre) => (
                  <span key={genre.id}>
                    <span>{genre.name},</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className={css.containerDesc}>
            <p className={css.release}>Release Date: {release_date}</p>
            <p className={css.overview}>
              <span className={css.text}>Overview:</span> {overview}
            </p>
          </div>
        </div>
        <ul className={css.list}>
          <li className={css.listItem}>
            <Link
              className={css.listItem}
              to="cast"
              state={backLink}
              onClick={handleScrollToCast}
              ref={scrollRef}
            >
              <GiCharacter className={css.icon} />
              Cast
            </Link>
          </li>
          <li className={css.listItem}>
            <Link
              className={css.listItem}
              to="reviews"
              onClick={handleScrollToCast}
              ref={scrollRef}
              state={backLink}
            >
              <MdOutlineRateReview className={css.icon} />
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </section>
  );
};
export default MovieDetailsPage;

import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import BackLink from "../../components/BackLink/BackLink";
import fetchDetails from "../../components/fetchDetails/fetchDetails";
import { useEffect, useState, useRef } from "react";
import css from "./MovieDetailsPage.module.css";
import { GiCharacter } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const scrollRef = useRef();

  const handleScrollToCast = () => {
    scrollRef.current.scrollIntoView({ top: 500, behavior: "smooth" });
  };

  const location = useLocation();
  console.log(location);
  const { movie_id } = useParams();

  useEffect(() => {
    const loadMovieDetails = async () => {
      const details = await fetchDetails(movie_id);
      setMovie(details);
    };
    loadMovieDetails();
  }, [movie_id]);

  const backLinkHref = location.state ?? "/movie";
  if (!movie) {
    return <div>Loading...</div>;
  }
  const { poster_path, title, vote_average, release_date, overview } = movie;
  return (
    <section className={css.details}>
      <BackLink to={backLinkHref}>Back to products</BackLink>
      <div className={css.mainContainer} key={movie.id}>
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
          >
            <MdOutlineRateReview className={css.icon} />
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </section>
  );
};
export default MovieDetailsPage;

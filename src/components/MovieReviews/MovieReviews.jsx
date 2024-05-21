import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchReviews from "../fetchReviews/fetchReviews";
import css from "./MovieReviews.module.css";
import Error from "../Error//Error";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  const { movie_id } = useParams();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setError(false);

        const reviews = await fetchReviews(movie_id);
        setReviews(reviews.data.results);
      } catch (error) {
        setError(true);
      }
    };
    loadReviews();
  }, [movie_id]);

  return (
    <div className={css.container}>
      {error && <Error />}
      <ul className={css.list}>
        {reviews.map((review) => (
          <li className={css.listItem} key={review.id}>
            <div className={css.reviewsContainer}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                alt={review.author_details.name}
              />
              <div className={css.author}>
                <h2 className={css.title}>{review.author_details.name}</h2>
                <p className={css.rating}>
                  Rating:{review.author_details.rating}
                </p>
              </div>
            </div>
            <p className={css.data}>{review.created_at}</p>
            <p className={css.review}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieReviews;

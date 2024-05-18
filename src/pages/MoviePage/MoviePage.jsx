import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import { useRef } from "react";

const MoviePage = ({ onSubmit, movies, onChang }) => {

  return (
    <div>
      <SearchForm onSearch={onSubmit} />
      {movies.length > 0 && <MovieList movies={movies}  />}
      {movies.length > 0 && <NextPage onChang={onChang} />}
    </div>
  );
};
export default MoviePage;

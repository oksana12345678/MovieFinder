import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ movies }) => {
  return <div>{movies.length > 0 && <MovieList movies={movies} />}</div>;
};
export default HomePage;

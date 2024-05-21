import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import { useEffect, useState } from "react";
import fetchMovie from "../../components/fetchMovie/fetchMovie";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";

const MoviesPage = ({ onLoad }) => {
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("searchTerm");

    if (query) {
      setSearchTerm(query);
      const fetchInitialMovies = async () => {
        try {
          setError(false);

          onLoad(true);
          const data = await fetchMovie(query);

          setFilmSearch(data.results);
        } catch (error) {
          setError(true);
        } finally {
          onLoad(false);
        }
      };
      fetchInitialMovies();
    }
  }, [searchParams, onLoad]);

  const handleMovie = async (searchTerm) => {
    try {
      setPage(1);
      setError(false);

      onLoad(true);
      const data = await fetchMovie(searchTerm);
      setSearchTerm(searchTerm);
      setFilmSearch(data.results);

      setSearchParams({ query: searchTerm, page: 1 });

      console.log(data.results);
    } catch (error) {
      setError(true);
    } finally {
      onLoad(false);
    }
  };

  const handleNextPage = async () => {
    const pageParam = searchParams.get("page");
    setPage(pageParam);
    try {
      onLoad(true);
      const nextPageData = await fetchMovie(searchTerm, page + 1);
      setPage((prevPage) => prevPage + 1);
      setFilmSearch((prevPage) => [...prevPage, ...nextPageData.results]);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      onLoad(false);
    }
  };

  return (
    <div>
      {error && <Error />}
      <SearchForm onSearch={handleMovie} />
      {filmSearch.length > 0 && <MovieList movies={filmSearch} />}
      {filmSearch.length > 0 && <NextPage onChang={handleNextPage} />}
    </div>
  );
};
export default MoviesPage;

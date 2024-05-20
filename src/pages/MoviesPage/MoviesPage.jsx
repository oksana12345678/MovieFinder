import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import { useEffect, useState } from "react";
import fetchMovie from "../../components/fetchMovie/fetchMovie";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "react-router-dom";

const MoviesPage = ({ onLoad }) => {
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("searchTerm");

    if (query) {
      setSearchTerm(query);
      const fetchInitialMovies = async () => {
        try {
          onLoad(true);
          const data = await fetchMovie(query);
          setFilmSearch(data.results);
        } catch (error) {
          <Alert variant="filled" severity="error">
            Sorry, something went wrong{error}
          </Alert>;
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
      onLoad(true);
      const data = await fetchMovie(searchTerm);
      setSearchTerm(searchTerm);
      setFilmSearch(data.results);
      setSearchParams({ query: searchTerm, page: 1 });

      console.log(data.results);
    } catch (error) {
      <Alert variant="filled" severity="error">
        Sorry, something went wrong{error}
      </Alert>;
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
    } catch (error) {
      console.log(error);
    } finally {
      onLoad(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleMovie} />
      {filmSearch.length > 0 && <MovieList movies={filmSearch} />}
      {filmSearch.length > 0 && <NextPage onChang={handleNextPage} />}
    </div>
  );
};
export default MoviesPage;

import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import { useState } from "react";
import fetchMovie from "../../components/fetchMovie/fetchMovie";
import Alert from "@mui/material/Alert";

const MoviePage = ({ onLoad }) => {
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const handleMovie = async (searchTerm) => {
    try {
      setFilmSearch([]);
      setPage(1);
      onLoad(true);
      const data = await fetchMovie(searchTerm);
      setSearchTerm(searchTerm);
      setFilmSearch(data.results);
    } catch (error) {
      <Alert variant="filled" severity="error">
        Sorry, something went wrong{error}
      </Alert>;
    } finally {
      onLoad(false);
    }
  };
  const handleNextPage = async () => {
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
export default MoviePage;

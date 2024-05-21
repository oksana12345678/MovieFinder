import axios from "axios";
import { TOKEN_KEY } from "../fetchMovie/fetchMovie";

const fetchTrendingMovie = async () => {
  const data = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return data.data.results;
};
export default fetchTrendingMovie;

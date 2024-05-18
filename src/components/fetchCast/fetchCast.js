import axios from "axios";
import { TOKEN_KEY } from "../fetchMovie/fetchMovie";

export default async function fetchCast(movie_id) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return data;
}

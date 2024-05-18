import axios from "axios";
import { TOKEN_KEY } from "../fetchMovie/fetchMovie";
export default async function fetchDetails(movie_id) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  console.log(data.data);
  return data.data;
}

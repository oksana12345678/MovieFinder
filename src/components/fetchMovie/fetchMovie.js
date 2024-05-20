import axios from "axios";

export const TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzUzODU3MzJiNzZjZTc1MjY4YmFjN2U5YTYyYjhhNCIsInN1YiI6IjY2NDY0OWRhZTY4YjdjNjhjYjc4MzVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X3Q9FdQn4-EWxq6InoWwB8xEmTXeKCjGfD3BgN6qMXo";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function fetchMovie(searchQuery, page) {
  const data = await axios.get(`/3/search/movie`, {
    params: {
      query: searchQuery,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN_KEY}`,
    },
  });
  return data.data;
}

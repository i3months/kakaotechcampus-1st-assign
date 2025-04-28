const API_KEY = "174fbf45e0b90ad7e62c1841d5783bef";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
      query
    )}&page=1`
  );
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetail(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  return data;
}

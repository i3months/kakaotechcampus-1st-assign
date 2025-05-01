import { API_KEY, BASE_URL } from "./constants.js";

async function handleFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP 에러 - ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`에러 발생 위치 - ${url}:`, error);
    return null;
  }
}

export async function fetchPopularMovies() {
  const data = await handleFetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  return data?.results ?? [];
}

export async function searchMovies(query) {
  const data = await handleFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}&page=1`
  );
  return data?.results ?? [];
}

export async function fetchMovieDetail(movieId) {
  return await handleFetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );
}

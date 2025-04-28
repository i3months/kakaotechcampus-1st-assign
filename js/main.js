import { fetchPopularMovies, searchMovies, fetchMovieDetail } from "./api.js";
import { renderMovies, showMovieDetail } from "./view.js";
import { toggleBookmark, getBookmarkedMovies } from "./bookmark.js";

const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const bookmarkButton = document.getElementById("bookmark-button");
const modalClose = document.getElementById("modal-close");
const modal = document.getElementById("modal");

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

async function loadPopular() {
  const movies = await fetchPopularMovies();
  renderMovies(movies);
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (query !== "") {
    const movies = await searchMovies(query);
    renderMovies(movies);
  }
}

async function handleBookmarkView() {
  const bookmarked = getBookmarkedMovies();
  if (bookmarked.length === 0) {
    movieList.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">북마크한 영화가 없습니다.</p>`;
    return;
  }

  const movieDetailsPromises = bookmarked.map((id) => fetchMovieDetail(id));
  const movies = await Promise.all(movieDetailsPromises);
  renderMovies(movies);
}

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

movieList.addEventListener("click", async (event) => {
  const card = event.target.closest(".movie-card");
  if (!card) return;

  const bookmarkButton = event.target.closest(".bookmark-btn");
  if (bookmarkButton) {
    event.stopPropagation();
    const movieId = parseInt(card.dataset.movieId);
    toggleBookmark(movieId, bookmarkButton);
    return;
  }

  const movieId = card.dataset.movieId;
  if (!movieId) return;

  const movie = await fetchMovieDetail(movieId);
  showMovieDetail(movie);
});

searchButton.addEventListener("click", handleSearch);

const debouncedSearch = debounce(async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    const movies = await searchMovies(query);
    renderMovies(movies);
  }
}, 500);

searchInput.addEventListener("input", debouncedSearch);
bookmarkButton.addEventListener("click", handleBookmarkView);

loadPopular();

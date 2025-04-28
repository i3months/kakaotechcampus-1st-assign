import { getBookmarkedMovies } from "./bookmark.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const movieList = document.getElementById("movie-list");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

export function renderMovies(movies) {
  movieList.innerHTML = "";

  if (movies.length === 0) {
    movieList.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">검색 결과가 없습니다.</p>`;
    return;
  }

  const bookmarkedMovies = getBookmarkedMovies();

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.movieId = movie.id;

    const isBookmarked = bookmarkedMovies.includes(movie.id);

    movieCard.innerHTML = `
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="card-content">
        <div class="title">${movie.title}</div>
        <div class="rating">⭐ ${movie.vote_average}</div>
        <button class="bookmark-btn">${isBookmarked ? "❤️" : "🤍"}</button>
      </div>
    `;

    movieList.appendChild(movieCard);
  });
}

export function showMovieDetail(movie) {
  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>개봉일:</strong> ${movie.release_date}</p>
    <p><strong>평점:</strong> ⭐ ${movie.vote_average}</p>
    <p><strong>줄거리:</strong> ${
      movie.overview || "줄거리 정보가 없습니다."
    }</p>
  `;
  modal.classList.remove("hidden");
}

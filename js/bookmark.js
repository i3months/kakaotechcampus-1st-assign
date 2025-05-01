import { BOOKMARK_KEY } from "./constants.js";

export function getBookmarkedMovies() {
  const stored = localStorage.getItem(BOOKMARK_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveBookmarkedMovies(ids) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
}

export function toggleBookmark(movieId, button) {
  const bookmarked = getBookmarkedMovies();
  const index = bookmarked.indexOf(movieId);

  if (index == -1) {
    bookmarked.push(movieId);
    button.textContent = "❤️";
  } else {
    bookmarked.splice(index, 1);
    button.textContent = "🤍";
  }

  saveBookmarkedMovies(bookmarked);
}

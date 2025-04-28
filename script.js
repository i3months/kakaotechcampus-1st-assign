const API_KEY = '174fbf45e0b90ad7e62c1841d5783bef';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieList = document.getElementById('movie-list');

async function fetchPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
    const data = await response.json();
    console.log('인기 영화 데이터:', data.results);

    renderMovies(data.results);
  } catch (error) {
    console.error('영화 데이터를 가져오는 중 오류 발생:', error);
  }
}

function renderMovies(movies) {
  movieList.innerHTML = ''; 

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="card-content">
        <div class="title">${movie.title}</div>
        <div class="rating">⭐ ${movie.vote_average}</div>
      </div>
    `;

    movieList.appendChild(movieCard);
  });
}

fetchPopularMovies();


const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}&page=1`);
    const data = await response.json();
    console.log('검색 결과:', data.results);

    renderMovies(data.results);
  } catch (error) {
    console.error('영화 검색 중 오류 발생:', error);
  }
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== '') {
    searchMovies(query);
  }
});

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
  
    if (movies.length === 0) {
      movieList.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">검색 결과가 없습니다.</p>`;
      return;
    }
  
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.dataset.movieId = movie.id;
  
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

const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

movieList.addEventListener('click', async (event) => {
  const card = event.target.closest('.movie-card');
  if (!card) return; 

  const movieId = card.dataset.movieId;
  if (!movieId) return;

  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);
    const movie = await response.json();
    console.log('영화 상세정보:', movie);

    showMovieDetail(movie);
  } catch (error) {
    console.error('영화 상세 정보 가져오기 실패:', error);
  }
});

function showMovieDetail(movie) {
  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>개봉일:</strong> ${movie.release_date}</p>
    <p><strong>평점:</strong> ⭐ ${movie.vote_average}</p>
    <p><strong>줄거리:</strong> ${movie.overview || '줄거리 정보가 없습니다.'}</p>
  `;
  modal.classList.remove('hidden');
}

function renderMovies(movies) {
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.dataset.movieId = movie.id;

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

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query !== '') {
        searchMovies(query);
      }
    }
  });
  
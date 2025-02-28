const apiKey = 'http://img.omdbapi.com/?apikey=[a577e581]&'; 

document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-bar').value;
    fetchMovies(searchTerm);
});

async function fetchMovies(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
    const data = await response.json();
    displayMovies(data.Search);
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = ''; 

    if (movies) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            `;
            movieElement.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
            resultsContainer.appendChild(movieElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

async function fetchMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
    const movie = await response.json();
    displayMovieDetails(movie);
}

function displayMovieDetails(movie) {
    const detailContainer = document.getElementById('movie-detail');
    detailContainer.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
    `;
    detailContainer.style.display = 'block';
}

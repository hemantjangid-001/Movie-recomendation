document.addEventListener('DOMContentLoaded', function() {
    fetchRandomMovies();
});

document.getElementById('get-recommendations').addEventListener('click', function() {
    const movieName = document.getElementById('movie-input').value;
    if (movieName) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c738b6210628e374e95a9a71ecf42df&query=${movieName}`)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                displayMovies(movies, 'movie-list');
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

function fetchRandomMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=4c738b6210628e374e95a9a71ecf42df`)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            displayMovies(movies, 'movie-list');
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies, elementId) {
    const movieList = document.getElementById(elementId);
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        `;
        movieList.appendChild(movieElement);
    });
}

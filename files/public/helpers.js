// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
    const likeDislikeLists = document.getElementById('likeOrDisklikeFilmTitles');
    likeDislikeLists.style.display= 'flex';
    createFilmList('likedList', getFilmTitles('likedFilms'));
    createFilmList('dislikedList', getFilmTitles('dislikedFilms'));
    //const likeDislikeLists = document.getElementById('likeOrDisklikeFilmTitles');
    //likeDislikeLists.style.display= 'flex';
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    const movieEl = document.getElementById('movieTitle');
    const movieTitleArr = [];
    movieTitleArr.push(movieEl.innerText);
    storeFilmTitles('likedFilms', movieTitleArr);
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    const movieEl = document.getElementById('movieTitle');
    const movieTitleArr = [];
    movieTitleArr.push(movieEl.innerText);
    storeFilmTitles('dislikedFilms', movieTitleArr);
    clearCurrentMovie();
    showRandomMovie();
};

// store film list to the sessionStorage
const storeFilmTitles = (reaction, filmsArr) => {
    if(!sessionStorage.getItem(reaction)) {
        sessionStorage.setItem(reaction, JSON.stringify(filmsArr));
    } else {
        const tempArr = JSON.parse(sessionStorage.getItem(reaction));
        sessionStorage.setItem(reaction, JSON.stringify(tempArr.concat(filmsArr)));
    }
}

// get film list from the sessionStorage
const getFilmTitles = (reaction) => {
    if(sessionStorage.getItem(reaction)) {
        const jsonData = sessionStorage.getItem(reaction);
        const filmsArr = JSON.parse(jsonData);
        return filmsArr;
    } else {
        return '';
    }
}

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;

    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;

    return overviewParagraph;
};

// step 28, create HTML for release date
const createReleaseDate = (releaseDate) => {
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.setAttribute('id', 'releaseDate');
    releaseDateParagraph.innerHTML = 'Year Released: ' + releaseDate;
    return releaseDateParagraph;
};

const createFilmList = (elementId, filmList ) => {
    const el = document.getElementById(elementId);
    el.innerHTML = "";
    if(filmList.length > 0) {
        filmList.forEach(film => {
            let li = document.createElement('li');
            li.innerHTML = film;
            el.appendChild(li);
        });
    }
}

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    // step 28
    const releaseDate = createReleaseDate(movieInfo.release_date);

    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    // step 28
    movieTextDiv.appendChild(releaseDate);

    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};
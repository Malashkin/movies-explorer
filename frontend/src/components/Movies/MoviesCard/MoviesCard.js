import { useLocation } from "react-router-dom";
import { useState } from "react";

const MoviesCard = ({
  movie,
  savedMovies,
  onHandleBookmark,
  onDeleteMovie,
}) => {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const isBookmarked = savedMovies.some((item) => item.nameRU === movie.nameRU);
  const movieBtnClassName = `movie__button ${
    isBookmarked || isLiked ? "movie__button_active" : ""
  }`;

  function handleMovieBookmark() {
    if (isBookmarked) {
      setIsLiked(false);
    } else {
      setIsLiked(!isLiked);
    }
    onHandleBookmark(movie);
  }

  function handleMovieDelete() {
    onDeleteMovie(movie._id);
  }

  function durationConvertation(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <li className="movie">
      {location.pathname === "/movies" ? (
        <>
          <div className="movie__info">
            <div className="movie__description">
              <p className="movie__title">{movie.nameRU}</p>
              <p className="movie__duration">
                {durationConvertation(movie.duration)}
              </p>
            </div>
            <button
              className={movieBtnClassName}
              type="button"
              onClick={handleMovieBookmark}
            ></button>
          </div>
          <a
            className="movie__trailer"
            href={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="movie__cover"
              src={`https://api.nomoreparties.co${movie.image.url}`}
              alt={movie.nameRU}
            ></img>
          </a>
        </>
      ) : (
        <>
          <div className="movie__info">
            <div className="movie__description">
              <p className="movie__title">{movie.nameRU}</p>
              <p className="movie__duration">
                {durationConvertation(movie.duration)}
              </p>
            </div>
            <button
              className="movie__button movie__button-delete"
              type="button"
              onClick={handleMovieDelete}
            ></button>
          </div>
          <a
            className="movie__trailer"
            href={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="movie__cover"
              src={movie.image}
              alt={movie.nameRU}
            ></img>
          </a>
        </>
      )}
    </li>
  );
};

export default MoviesCard;

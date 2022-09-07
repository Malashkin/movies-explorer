import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router";

const MoviesCardList = ({
  movies,
  visible,
  loadMore,
  isSubmitting,
  onDeleteMovie,
  onHandleBookmark,
  savedMovies,
  isThereSortetMovies,
  isThereSortedSavedMovies,
}) => {
  const location = useLocation();

  function renderMovies() {
    if (isSubmitting) {
      return <Preloader />;
    } else if (movies.length !== 0) {
      return (
        <>
          <ul className="movies-list">
            {movies.slice(0, visible).map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                movies={movies}
                onHandleBookmark={onHandleBookmark}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
          {visible < movies.length && (
            <button
              type="button"
              className="movies-list__button"
              onClick={loadMore}
            >
              Ещё
            </button>
          )}
        </>
      );
    } else if (isThereSortetMovies) {
      return <></>;
    } else {
      return <p className="movies-list__error-text">Ничего не найдено</p>;
    }
  }

  function renderSavedMovies() {
    if (isSubmitting) {
      return <Preloader />;
    } else if (movies.length !== 0) {
      return (
        <>
          <ul className="movies-list">
            {movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                id={movie.id}
                movie={movie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
          {visible < movies.length && (
            <button
              type="button"
              className="movies-list__button"
              onClick={loadMore}
            >
              Ещё
            </button>
          )}
        </>
      );
    } else if (isThereSortedSavedMovies) {
      return <></>;
    } else {
      return <p className="movies-list__error-text">Ничего не найдено</p>;
    }
  }

  return (
    <>
      {location.pathname === "/movies" ? renderMovies() : renderSavedMovies()}
    </>
  );
};

export default MoviesCardList;

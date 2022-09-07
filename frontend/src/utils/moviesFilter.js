import { ShortFilmDuration } from "./constants";

export function filterMovies(movies, searchQuery) {
  const filteredMovies = movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return filteredMovies;
}

export function filterCheckedMovies(movies, searchQuery) {
  const filteredMovies = movies.filter((movie) => {
    if (
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) &&
      movie.duration <= ShortFilmDuration
    ) {
      return true;
    } else {
      return false;
    }
  });
  return filteredMovies;
}

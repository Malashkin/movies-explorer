import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { filterMovies, filterCheckedMovies } from "../../utils/moviesFilter";
import { useEffect, useState } from "react";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import useWindowSize from "../../utils/useWindowSize";
import {
  SmallDisplay,
  MediumDisplay,
  LargeDisplay,
} from "../../utils/constants";

const token = localStorage.getItem("token");

const getSortedMovies = (movies, query, isShort) => {
  const savedMoviesKey = "savedMovies";
  const savedMoviesInLocalStorage = localStorage.getItem(savedMoviesKey);
  const savedMovies = savedMoviesInLocalStorage
    ? JSON.parse(savedMoviesInLocalStorage)
    : [];

  const savedByQuery = savedMovies.find(
    (item) => item.query === query && item.isShort === isShort
  );

  if (savedByQuery && savedByQuery.list.length !== 0) {
    return savedByQuery.list;
  }

  const moviesFormAPI = isShort
    ? filterCheckedMovies(movies, query)
    : filterMovies(movies, query);

  localStorage.setItem(
    savedMoviesKey,
    JSON.stringify([{ query, isShort, list: moviesFormAPI }])
  );

  return moviesFormAPI;
};

const Movies = ({ onLoading, isSubmitting, loggedIn }) => {
  const [movies, setMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isShort") === "true"
  );
  const [isThereSortetMovies, setIsThereSortedMovies] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("query") || ""
  );
  const [visible, setVisible] = useState(0);
  const [windowWidth] = useWindowSize();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getSavedMovies(token), moviesApi.getAllMovies()])
        .then((data) => {
          const [savedMovies, allMovies] = data;
          setIsThereSortedMovies(true);
          setSavedMovies(savedMovies.movies);
          setMovies(allMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const sortedMoviesByQuery = getSortedMovies(movies, searchText, isChecked);

    if (sortedMoviesByQuery.length !== 0) {
      setSortedMovies(sortedMoviesByQuery);
    } else {
      setSortedMovies(sortedMoviesByQuery);
      setIsThereSortedMovies(false);
    }

    localStorage.setItem("query", searchText);
    localStorage.setItem("isShort", isChecked);
  }, [isChecked, searchText, movies]);

  function handleCheckboxBtnClicked() {
    setIsChecked(!isChecked);
  }

  function handleBookmarkMovieStatus(movie) {
    const isBookmark = savedMovies.some((item) => item.nameRU === movie.nameRU);
    if (!isBookmark) {
      mainApi
        .createMovie(movie, token)
        .then((movie) => {
          setSavedMovies([movie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const currentSavedMovie = savedMovies.filter(
        (item) => item.nameRU === movie.nameRU
      );
      mainApi
        .deleteMovie(currentSavedMovie[0]._id, token)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((k) => k._id !== currentSavedMovie[0]._id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (windowWidth > 768) {
      return setVisible(LargeDisplay);
    } else if (windowWidth <= 768 && windowWidth > 321) {
      return setVisible(MediumDisplay);
    } else if (windowWidth <= 320) {
      return setVisible(SmallDisplay);
    }
  }, [windowWidth]);

  function handleAddMoreBtnClick() {
    if (windowWidth > 768) {
      setVisible(visible + 3);
    } else if (windowWidth <= 768) {
      setVisible(visible + 2);
    }
  }

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        searchText={searchText}
        onSearchText={setSearchText}
        onChecked={handleCheckboxBtnClicked}
        onLoading={onLoading}
        isChecked={isChecked}
      />
      <MoviesCardList
        movies={sortedMovies}
        visible={visible}
        loadMore={handleAddMoreBtnClick}
        isSubmitting={isSubmitting}
        onHandleBookmark={handleBookmarkMovieStatus}
        savedMovies={savedMovies}
        isThereSortetMovies={isThereSortetMovies}
      />
      <Footer />
    </div>
  );
};

export default Movies;

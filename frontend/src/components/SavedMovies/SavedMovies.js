import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";
import { filterMovies, filterCheckedMovies } from "../../utils/moviesFilter";

const token = localStorage.getItem("token");

const SavedMovies = ({ onLoading, isSubmitting, loggedIn }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [sortedSavedMovies, setSortedSavedMovies] = useState([]);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [isThereSortedSavedMovies, setIsThereSortedSavedMovies] =
    useState(true);
  const [savedMoviesSearchText, setSavedMoviesSearchText] = useState("");
  const location = useLocation();

     useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getSavedMovies(token)])
        .then((data) => {
          const [savedMovies] = data;
          setIsThereSortedSavedMovies(true);
          setSavedMovies(savedMovies.movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isCheckedSavedMovies) {
      const filteredCheckedSavedMovies = filterCheckedMovies(
        savedMovies,
        savedMoviesSearchText
      );
      if (filteredCheckedSavedMovies.length !== 0) {
        setSortedSavedMovies(filteredCheckedSavedMovies);
      } else {
        setSortedSavedMovies(filteredCheckedSavedMovies);
        setIsThereSortedSavedMovies(false);
      }
    } else {
      const filteredSavedMovies = filterMovies(
        savedMovies,
        savedMoviesSearchText
      );
      if (filteredSavedMovies.length !== 0) {
        setSortedSavedMovies(filteredSavedMovies);
      } else {
        setSortedSavedMovies(filteredSavedMovies);
        setIsThereSortedSavedMovies(false);
      }
    }
  }, [isCheckedSavedMovies, savedMovies, savedMoviesSearchText]);

  useEffect(() => {
    setSortedSavedMovies(savedMovies);
    setIsCheckedSavedMovies(false);
    setSavedMoviesSearchText('');
  }, [location.pathname, savedMovies]);

  function handleCheckboxBtnClicked() {
    setIsCheckedSavedMovies(!isCheckedSavedMovies);
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId, token).then(() => {
      setSavedMovies((state) => state.filter((movie) => movie._id !== movieId));
    });
  }

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
    setSavedMoviesSearchText={setSavedMoviesSearchText}
          onLoading={onLoading}
          onChecked={setSavedMoviesSearchText}
          onCheckedSavedMovies={handleCheckboxBtnClicked}
          isCheckedSavedMovies={isCheckedSavedMovies}
      />
      <MoviesCardList
        movies={sortedSavedMovies}
        onDeleteMovie={handleDeleteMovie}
        savedMovies={savedMovies}
        isThereSortedSavedMovies={isThereSortedSavedMovies}
        isSubmitting={isSubmitting}
      />
      <Footer />
    </div>
  );
};

export default SavedMovies;

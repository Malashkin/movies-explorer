import { useState } from "react";
import { useLocation } from "react-router";
import searchIcon from "./../../../images/search__icon.svg";
import searchButton from "./../../../images/find.svg";

const SearchForm = ({
  onChecked,
  searchText,
  onSearchText,
  onLoading,
  onCheckedSavedMovies,
  isChecked,
  isCheckedSavedMovies,
  setSavedMoviesSearchText,
}) => {
  const [text, setText] = useState(searchText);
  const [errorClassName, setErrorClassName] = useState("searchform__error");
  let location = useLocation();

  function handleTextChange(evt) {
    setText(evt.target.value);
  }

  function handleSubmit(searchTextFnc) {
    onLoading(true);
     setTimeout(() => {
        onLoading(false);
      }, 50);
    if (!text) {
      setErrorClassName(errorClassName + " searchform__error_active");
    } else {
      searchTextFnc(text);
      setTimeout(() => {
        onLoading(false);
      }, 50);
      setErrorClassName("searchform__error")
    }
  }

  function handleMoviesSubmit(evt) {
    evt.preventDefault();
    handleSubmit(onSearchText);
  }

  function handleSavedMoviesSubmit(evt) {
    evt.preventDefault();
    handleSubmit(setSavedMoviesSearchText);
  }

  return (
    <>
      {location.pathname === "/movies" ? (
        <form className="searchform" onSubmit={handleMoviesSubmit} noValidate>
          <div className="searchform__container">
            <div className="searchform__content">
              <div className="searchform__line">
                <img
                  className="searchform__icon"
                  src={searchIcon}
                  alt="Поиск"
                ></img>
                <input
                  className="searchform__input"
                  type="search"
                  name="searchText"
                  value={text || ""}
                  placeholder="Фильм"
                  onChange={handleTextChange}
                  required
                ></input>
              </div>
              <button className="searchform__button" type="submit">
                <img
                  className="searchform__button-image"
                  src={searchButton}
                  alt=""
                ></img>
              </button>
            </div>
            <div className="filter">
              <input
                className="filter__checkbox"
                type="checkbox"
                onClick={onChecked}
                defaultChecked={isChecked ? true : false}
              ></input>
              <p className="filter__text">Короткометражки</p>
            </div>
          </div>
          <span className={errorClassName}>Введите ключевое слово</span>
        </form>
      ) : (
        <>
          <form
            className="searchform"
            onSubmit={handleSavedMoviesSubmit}
            noValidate
          >
            <div className="searchform__container">
              <div className="searchform__content">
                <div className="searchform__line">
                  <img
                    className="searchform__icon"
                    src={searchIcon}
                    alt="Поиск"
                  ></img>
                  <input
                    className="searchform__input"
                    type="search"
                    name="searchText"
                    value={text || ""}
                    placeholder="Фильм"
                    onChange={handleTextChange}
                    required
                  ></input>
                </div>
                <button className="searchform__button" type="submit">
                  <img
                    className="searchform__button-image"
                    src={searchButton}
                    alt=""
                  ></img>
                </button>
              </div>
              <div className="filter">
                <input
                  className="filter__checkbox"
                  name="searchText"
                  type="checkbox"
                  onClick={onCheckedSavedMovies}
                  defaultChecked={isCheckedSavedMovies ? true : false}
                ></input>
                <p className="filter__text">Короткометражки</p>
              </div>
            </div>
            <span className={errorClassName}>Введите ключевое слово</span>
          </form>
        </>
      )}
    </>
  );
};

export default SearchForm;

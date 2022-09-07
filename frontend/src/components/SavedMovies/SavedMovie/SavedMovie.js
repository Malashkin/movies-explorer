import FilmsCover from "../../../images/pic__COLOR_pic.jpg";

const SavedMovie = () => {
  return (
    <ul className="movies-list">
      <li className="movie">
        <p className="movie__title">33 слова о дизайне</p>
        <p className="movie__duration">1ч 47м</p>
        <button
          className="movie__button movie__button-delete"
          type="button"
        ></button>
        <img className="movie__cover" src={FilmsCover} alt="Обложка"></img>
      </li>
      <li className="movie">
        <p className="movie__title">33 слова о дизайне</p>
        <p className="movie__duration">1ч 47м</p>
        <button
          className="movie__button movie__button-delete"
          type="button"
        ></button>
        <img className="movie__cover" src={FilmsCover} alt="Обложка"></img>
      </li>
      <li className="movie">
        <p className="movie__title">33 слова о дизайне</p>
        <p className="movie__duration">1ч 47м</p>
        <button
          className="movie__button movie__button-delete"
          type="button"
        ></button>
        <img className="movie__cover" src={FilmsCover} alt="Обложка"></img>
      </li>
    </ul>
  );
};

export default SavedMovie;

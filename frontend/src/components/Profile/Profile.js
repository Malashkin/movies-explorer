import Header from "../Header/Header";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Profile = ({
  loggedIn,
  onSignOut,
  onProfileSubmit,
  errorStatus,
  setErrorStatus,
  errorText,
  successStatus,
  setSuccessStatus,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPushed, setIsPushed] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const [nameValidation, setNameValidation] = useState({
    nameValidationMessage: "",
    isNameValid: false,
  });
  const [emailValidation, setEmailValidation] = useState({
    emailValidationMessage: "",
    isEmailValid: false,
  });

  const handelNameChange = (e) => {
    setName(e.target.value);

    const { validationMessage } = e.target;

    setNameValidation({
      nameValidationMessage: validationMessage,
      isNameValid: e.target.validity.valid,
    });
    setErrorStatus(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const { validationMessage } = e.target;

    setEmailValidation({
      emailValidationMessage: validationMessage,
      isEmailValid: e.target.validity.valid,
    });
    setErrorStatus(false);
  };

  function editButtonHandleClick() {
    setIsPushed(!isPushed);
    setSuccessStatus(false);
  }

  function handelFormSubmit(e) {
    e.preventDefault();
    onProfileSubmit(name, email);
  }

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <form
        className="profile__form"
        name="profile"
        onSubmit={handelFormSubmit}
        noValidate
      >
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__info">
          <p className="profile__info-text">Имя</p>
          <div className="profile__info-input">
            <input
              className="signform__field-input profile__info-input-text"
              type="text"
              value={name || currentUser.name}
              name="profileName"
              id="profile-name-input"
              pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
              onChange={handelNameChange}
              autoComplete="off"
              noValidate
              required
            />
            <span
              className={`signform__field-error profile-email-input-error ${
                !nameValidation.isNameValid
                  ? "signform__input-error_active"
                  : ""
              }`}
            >
              {nameValidation.nameValidationMessage}
            </span>
          </div>
        </div>
        <div className="profile__info">
          <p className="profile__info-text">E-mail</p>
          <div className="profile__info-input">
            <input
              className="signform__field-input profile__info-input-text"
              type="email"
              value={email || currentUser.email}
              name="profileEmail"
              id="profile-email-input"
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
              onChange={handleEmailChange}
              autoComplete="off"
              noValidate
              required
            />
            <span
              className={`signform__field-error profile-email-input-error ${
                !emailValidation.isEmailValid
                  ? "signform__input-error_active"
                  : ""
              }`}
            >
              {emailValidation.emailValidationMessage}
            </span>
          </div>
        </div>
        {successStatus ? (
          <span className="signform__server-success">
            Профиль успешно обновлён.
          </span>
        ) : (
          <></>
        )}
        {errorStatus ? (
          <span className="signform__server-error">{errorText}</span>
        ) : (
          <></>
        )}
        <button
          onClick={editButtonHandleClick}
          type="submit"
          className={`"profile__btn profile__btn-edit ${
            !nameValidation.isNameValid || !emailValidation.isEmailValid
              ? "profile__btn-disabled"
              : ""
          }`}
          disabled={
            !nameValidation.isNameValid || !emailValidation.isEmailValid
          }
        >
          Редактировать
        </button>
        <NavLink
          type="button"
          onClick={onSignOut}
          className="profile__btn profile__btn-out"
          to="/sign-up"
        >
          Выйти из аккаунта
        </NavLink>
      </form>
    </div>
  );
};

export default Profile;

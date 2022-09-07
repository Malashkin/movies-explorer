import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ errorStatus, setErrorStatus, errorText, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameValidation, setNameValidation] = useState({
    nameValidationMessage: "",
    isNameValid: false,
  });
  const [emailValidation, setEmailValidation] = useState({
    emailValidationMessage: "",
    isEmailValid: false,
  });
  const [passwordValidation, setPasswordValidation] = useState({
    passwordValidationMessage: "",
    isPasswordValid: false,
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const { validationMessage } = e.target;

    setPasswordValidation({
      passwordValidationMessage: validationMessage,
      isPasswordValid: e.target.validity.valid,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, email, password);
  };

  return (
    <form className="signform" onSubmit={handleSubmit}>
      <Link to="/" className="signform__logo" />
      <h2 className="signform__title">Добро пожаловать!</h2>
      <div className="signform__field">
        <h5 className="signform__field-subtitle">Имя</h5>
        <input
          className="signform__field-input"
          type="text"
          value={name || ""}
          name="registerName"
          id="register-name-input"
          pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
          onChange={handelNameChange}
          autoComplete="off"
          noValidate
          required
        />
        <span
          className={`signform__field-error login-email-input-error ${
            !nameValidation.isNameValid ? "signform__input-error_active" : ""
          }`}
        >
          {nameValidation.nameValidationMessage}
        </span>
      </div>
      <div className="signform__field">
        <h5 className="signform__field-subtitle">E-mail</h5>
        <input
          className="signform__field-input"
          type="email"
          value={email || ""}
          name="registerEmail"
          id="register-email-input"
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          onChange={handleEmailChange}
          autoComplete="off"
          noValidate
          required
        />
        <span
          className={`signform__field-error login-email-input-error ${
            !emailValidation.isEmailValid ? "signform__input-error_active" : ""
          }`}
        >
          {emailValidation.emailValidationMessage}
        </span>
      </div>
      <div className="signform__field">
        <h5 className="signform__field-subtitle">Пароль</h5>
        <input
          className="signform__field-input"
          type="password"
          value={password}
          id="register-password-input"
          name="register-password"
          onChange={handlePasswordChange}
          minLength="8"
          maxLength="20"
          autoComplete="off"
          noValidate
          required
        />
        <span
          className={`signform__field-error password-email-input-error ${
            !passwordValidation.isPasswordValid
              ? "signform__input-error_active"
              : ""
          }`}
        >
          {passwordValidation.passwordValidationMessage}
        </span>
      </div>
      {errorStatus ? (
        <span className="signform__server-error signform__server-error-register">
          {errorText}
        </span>
      ) : (
        <></>
      )}
      <button
        className={`signform__button ${
          !passwordValidation.isPasswordValid ||
          !emailValidation.isEmailValid ||
          !nameValidation.isNameValid
            ? " signform__button-disabled"
            : ""
        }`}
        disabled={
          !passwordValidation.isPasswordValid || !emailValidation.isEmailValid
            ? true
            : false
        }
        type="submit"
      >
        Зарегистрироваться
      </button>
      <Link className="signform__span" to="/sign-in">
        <p className="signform__span-text">Уже зарегистрированы?</p>
        <p className="signform__span-text signform__span-bluetext">Войти</p>
      </Link>
    </form>
  );
};

export default Register;

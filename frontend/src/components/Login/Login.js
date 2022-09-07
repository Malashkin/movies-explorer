import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ errorStatus, setErrorStatus, errorText, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState({
    emailValidationMessage: "",
    isEmailValid: false,
  });
  const [passwordValidation, setPasswordValidation] = useState({
    passwordValidationMessage: "",
    isPasswordValid: false,
  });
  const [password, setPassword] = useState("");

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
    onSubmit(email, password);
  };

  return (
    <form className="signform" onSubmit={handleSubmit} noValidate>
      <Link to="/" className="signform__logo" />
      <h2 className="signform__title">Рады видеть!</h2>
      <div className="signform__field">
        <h5 className="signform__field-subtitle">E-mail</h5>
        <input
          className="signform__field-input"
          type="email"
          value={email}
          name="loginEmail"
          id="login-email-input"
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
          id="login-password-input"
          name="login-password"
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
        <span className="signform__server-error signform__server-error-login">
          {errorText}
        </span>
      ) : (
        <></>
      )}
      <button
        className={`signform__button signform__button-signin ${
          !passwordValidation.isPasswordValid || !emailValidation.isEmailValid
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
        Войти
      </button>
      <Link className="signform__span" to="/sign-up">
        <p className="signform__span-text">Ещё не зарегистрированы?</p>
        <p className="signform__span-text signform__span-bluetext">
          Зарегистрироваться
        </p>
      </Link>
    </form>
  );
};

export default Login;

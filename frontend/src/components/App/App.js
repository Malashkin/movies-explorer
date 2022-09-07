/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SaveMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CONFLICT_ERROR, UNAUTHORIZED_ERROR } from "../../utils/constants";
import { useLocation } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    function tokenCheck() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        if (token) {
          setLoggedIn(true);
          history.push(location.pathname);
          setToken(localStorage.getItem("token"));
          mainApi.getUserInfo(token).then((data) => {
            setCurrentUser(data);
          });
        }
      }
    }
    tokenCheck();
  }, [history, token]);

  function makeLogin(email, password) {
    mainApi
      .makeSignIn(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setToken(localStorage.getItem("token"));
      })
      .then(() => {
        mainApi.getUserInfo(token).then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          history.push("/movies");
        });
      })
      .catch((err) => {
        if (err.status === UNAUTHORIZED_ERROR) {
          setErrorStatus(true);
          setErrorText("Вы ввели неправильный логин или пароль.");
        }
      });
  }

  function makeRegister(name, email, password) {
    mainApi
      .makeSignUp(name, email, password)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        makeLogin(email, password);
      })
      .catch((err) => {
        if (err.status === CONFLICT_ERROR) {
          setErrorStatus(true);
          setErrorText("Пользователь с таким email уже зарегистрирован");
        } else {
          setErrorStatus(true);
          setErrorText("При регистрации произошла ошибка");
        }
      });
  }

  function handleProfileSubmit(name, email) {
    mainApi
      .updateUserInfo(name, email, token)
      .then((data) => {
        setCurrentUser(data.data);
        setSuccessStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorStatus(true);
        setErrorText("При обновлении профиля произошла ошибка.");
      });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("query");
    localStorage.removeItem("isShort");
    history.push("/");
  }

  function renderLoading(isLoading) {
    setIsSubmitting(isLoading);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-up">
            <Register
              errorStatus={errorStatus}
              setErrorStatus={setErrorStatus}
              errorText={errorText}
              onSubmit={makeRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              errorStatus={errorStatus}
              setErrorStatus={setErrorStatus}
              errorText={errorText}
              onSubmit={makeLogin}
            />
          </Route>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute loggedIn={loggedIn} path="/movies">
            <Movies
              loggedIn={loggedIn}
              isSubmitting={isSubmitting}
              onLoading={renderLoading}
            />
          </ProtectedRoute>
          <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
            <SaveMovies
              loggedIn={loggedIn}
              isSubmitting={isSubmitting}
              onLoading={renderLoading}
            />
          </ProtectedRoute>
          <ProtectedRoute loggedIn={loggedIn} path="/profile">
            <Profile
              loggedIn={loggedIn}
              onProfileSubmit={handleProfileSubmit}
              onSignOut={handleSignOut}
              errorStatus={errorStatus}
              setErrorStatus={setErrorStatus}
              errorText={errorText}
              successStatus={successStatus}
              setSuccessStatus={setSuccessStatus}
            />
          </ProtectedRoute>
          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

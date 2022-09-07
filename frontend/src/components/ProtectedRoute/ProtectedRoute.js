import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

function ProtectedRoute({ path, loggedIn, children }) {
  const currentUser = useContext(CurrentUserContext);
  let history = useHistory();

  if (!currentUser)
    return (
      <div className="protectedRoute">
        <h3 className="protectedRoute__unauthorizated">
          Для посещения этой страници необходима авторизация
        </h3>
        <button onClick={history.goBack} className="protectedRoute__button">
          Назад
        </button>
      </div>
    );

  return (
    <Route exact path={path}>
      {() => (loggedIn ? <>{children}</> : <Redirect to="/" />)}
    </Route>
  );
}

export default ProtectedRoute;

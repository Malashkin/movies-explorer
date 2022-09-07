import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ loggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const HandleClickOpen = () => {
    setIsOpen(true);
  };

  const HandleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!loggedIn ? (
        <div className="navbar navbar__nouser">
          <NavLink className="navbar__link navbar__link-signin" to="/sign-in">
            Регистрация
          </NavLink>
          <NavLink className="navbar__link navbar__link-signup" to="/sign-up">
            Войти
          </NavLink>
        </div>
      ) : (
        <div className="navigation">
          <div className="navbar navbar_withuser">
            <div className="navbar__links">
              <NavLink
                className="navbar__link navbar__link-signin"
                activeClassName="navbar__link-active"
                to="/movies"
              >
                Фильмы
              </NavLink>
              <NavLink
                className="navbar__link navbar__link-signin"
                activeClassName="navbar__link-active"
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>
            </div>
            <NavLink className="navbar__profile" to="/profile">
              Аккаунт
            </NavLink>
          </div>
          <div>
            <button className="popup__open" onClick={HandleClickOpen} />
            <div className={`popup ${isOpen && "popup_type_opened"}`}>
              <div className="popup__content">
                <button
                  onClick={HandleClickClose}
                  className="popup__close"
                  type="button"
                ></button>
                <NavLink
                  className="popup__link"
                  onClick={HandleClickClose}
                  to="/"
                >
                  Главная
                </NavLink>
                <NavLink
                  className="popup__link"
                  activeClassName="popup__link-active"
                  onClick={HandleClickClose}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
                <NavLink
                  className="popup__link"
                  activeClassName="popup__link-active"
                  onClick={HandleClickClose}
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </NavLink>
                <NavLink
                  className="popup__profile"
                  onClick={HandleClickClose}
                  to="/profile"
                >
                  Аккаунт
                </NavLink>
              </div>
              <div onClick={HandleClickClose} className="popup__overlay" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

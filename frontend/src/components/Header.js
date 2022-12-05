import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";


function Header(props) {

  return (
    <Switch>
      <Route exact path="/">
        <header
          className={
            props.headerIsOpen ? `header header__open` : `header header__close`
          }
        >
          <img src={logo} alt="логотип" className="header__logo" />

          
            <div className="header__info">
              <p className="header__accaunt">{props.userEmail}</p>
              <Link className="header__link" to="/sign-in" onClick={props.signOut}>
                Выйти
              </Link>
            </div>
            {props.headerIsOpen ? (
              <button
                className="header__button header__button-close"
                onClick={props.onClose}
              ></button>
            ) : (
              <button
                className="header__button header__button-open "
                onClick={props.headerOpen}
              ></button>
            )}
        

        </header>

      </Route>

      <Route exact path="/sign-in">
        <header className="header">
          <img src={logo} alt="логотип" className="header__logo" />
          <div className="header__info header__info_registration">
            <Link
              className="header__link header__link_registration"
              to="/sign-up"
            >
              Регистрация
            </Link>
          </div>
        </header>
      </Route>

      <Route exact path="/sign-up">
        <header className="header">
        <img src={logo} alt="логотип" className="header__logo" />
          <div className="header__info header__info_registration">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </div>
        </header>
      </Route>

    </Switch>
  );
}

export default Header;

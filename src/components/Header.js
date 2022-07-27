import React from 'react';
import headerLogoPath from "../images/logo/logo-mesto.svg";
import {Link, Route, useHistory} from "react-router-dom";

const Header = (props) => {

    const history = useHistory();

    function handleSignOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }

    return (
        <header className="header">
            <a href="/">
                <img
                    className="header__logo"
                    src={headerLogoPath}
                    alt="Mesto логотип"
                />
            </a>
            <Route exact path="/">
                <div className="header__authorized-user-wrapper">
                    <p className="header__user-email">{`${props.email}`}</p>
                    <button
                        onClick={handleSignOut}
                        className="header__button"
                    >
                        Выйти
                    </button>
                </div>
            </Route>
            <Route path="/sign-up">
                <Link
                    to={'/sign-in'}
                    className="header__button"
                >
                    Войти
                </Link>
            </Route>
            <Route path="/sign-in">
                <Link
                    to={'/sign-up'}
                    className="header__button"
                >
                    Регистрация
                </Link>
            </Route>
        </header>
    );
};

export default Header;

import { memo } from 'react';
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

import './Header.css';

function Header(props) {
  const { pathname } = useLocation();

  return (
    <header className={`page__section header${pathname === '/' ? ' header_color' : ''}`}>
      <Logo />
      {pathname !== '/'
        ? <>
            <Navigation />
            <button className="header__burger" onClick={props.onOpen} />
          </>
        : <nav>
            <Link to="/signup" className="header__register">Регистрация</Link>
            <Link to="/signin" className="header__login">Войти</Link>
          </nav>
      }
    </header>
  )
}

export default memo(Header)
